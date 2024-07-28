import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { deleteFile } from "@/lib/upload";


const ImageWithButton = ({
  file,
  handleValue,
}: {
  file?: string;
  handleValue: (value: string) => void;
}) => {
  const handleDelete = async () => {
    if (!file) return;
    await deleteFile(file);
    handleValue("");
  };
  return (
    file && (
        <div className="relative w-48 h-60">
        <Image
          width={100}
          height={100}
          src={file}
          alt="profile pic preview"
          priority
          className="object-cover w-full h-full"
        />
        <button
          className="absolute top-1 right-1 bg-primary_b text-white p-2 rounded-full"
          onClick={handleDelete}
        >
          <FaTimes />
        </button>
      </div>
    )
  );
};

export default ImageWithButton;
