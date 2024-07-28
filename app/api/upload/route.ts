import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const s3ClientConfig: S3ClientConfig = {
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
};

const bucketName = process.env.BUCKET_NAME;


export async function POST(req: NextRequest) {
  const formData = await req.formData();

  if (formData.has("file")) {
    const file = formData.get("file") as File;

    const s3Client = new S3Client(s3ClientConfig);

    // uso la libreria que me crea un ID random
    const randomId = uuidv4();
    const ext = file.name.split(".").pop();
    const newFilename = randomId + "." + ext;

    const chunks: Uint8Array[] = [];
    const stream = file.stream();
    const reader = stream.getReader();
    let done: boolean | undefined;
    let value: Uint8Array | undefined;

    while ((({ done, value } = await reader.read()), !done)) {
      if (value) {
        chunks.push(value);
      }
    }

    console.log('newFilename', newFilename, bucketName, '<--------------------------------------');

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        ACL: "public-read",
        Body: Buffer.concat(chunks),
        ContentType: file.type,
      }),
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return NextResponse.json(link);
  }

  return NextResponse.json({ message: "File not found" }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("fileUrl");

  console.log("fileUrl", fileUrl);

  if (fileUrl) {
    try {
      const url = new URL(fileUrl);
      const filename = url.pathname.split("/").pop();

      console.log(filename, bucketName, 
        '<--------------------------------------'
      );
      if (!filename) {
        return NextResponse.json(
          { message: "Invalid file URL" },
          { status: 400 },
        );
      }

      const s3Client = new S3Client(s3ClientConfig);


      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: filename,
        }),
      );

      return NextResponse.json({ message: "File deleted" });
    } catch (error) {
      console.error("Error deleting file:", error);
      return NextResponse.json(
        { message: "Error deleting file" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: "File not found" }, { status: 400 });
}
