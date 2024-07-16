import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:NextRequest) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file') as File;

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    // uso la libreria que me crea un ID random 
    const randomId = uuidv4();
    const ext = file.name.split('.').pop();
    const newFilename = randomId + '.' + ext;
    const bucketName = process.env.BUCKET_NAME;

    const chunks: Uint8Array[] = [];
      const stream = file.stream();
      const reader = stream.getReader();
      let done: boolean | undefined;
      let value: Uint8Array | undefined;

      while ({ done, value } = await reader.read(), !done) {
        if (value) {
          chunks.push(value);
        }
      }

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      ACL: 'public-read',
      Body: Buffer.concat(chunks),
      ContentType: file.type,
    }));

    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return NextResponse.json(link);

  }

  return NextResponse.json({ message: 'File not found' }, { status: 400 });
}