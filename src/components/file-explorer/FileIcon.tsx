// components/FileIconUI.js
import {
  FaFileAlt,
  FaFileArchive,
  FaFileCode,
  FaFileCsv,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFolder,
} from "react-icons/fa";

type Props = {
  item: any;
  isSelected: boolean;
};

const getFileIcon = (fileName: string, isDirectory: boolean) => {
  if (isDirectory) return FaFolder;

  const ext = (fileName.split(".").pop() || "").toLowerCase();

  switch (ext) {
    case "pdf":
      return FaFilePdf;
    case "jpg":
    case "png":
    case "gif":
      return FaFileImage;
    case "zip":
    case "tar":
      return FaFileArchive;
    case "js":
    case "sh":
      return FaFileCode;
    case "xlsx":
    case "csv":
      return FaFileCsv;
    case "docx":
      return FaFileWord;
    default:
      return FaFileAlt;
  }
};

const FileIconUI = ({ item, isSelected }: Props) => {
  const Icon = getFileIcon(item.name, item.type === "folder");
  // Styling to mimic a dark-blue folder icon and a light file icon
  const color = item.type === "folder" ? "#729fcf" : "#ccc";

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-lg w-28 h-28 cursor-pointer 
                   ${isSelected ? "bg-blue-300 ring-2 ring-blue-500" : "hover:bg-gray-100"}`}
    >
      <Icon size={40} color={color} />
      <span
        className="text-xs mt-2 text-center truncate w-full"
        title={item.name}
      >
        {item.name}
      </span>
    </div>
  );
};

export default FileIconUI;
