import { clsx, type ClassValue } from "clsx";
import {
  FileImage,
  FileSpreadsheet,
  FileText,
  Film,
  FileIcon,
  File,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const updateQueryParams = (
  updatedParams: Record<string, string | undefined>,
  currentParams: URLSearchParams,
) => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  });

  return newParams;
};

export const formatFileSize = (sizeInKB: number) => {
  if (sizeInKB < 1000) {
    return `${sizeInKB.toFixed(2)} KB`;
  } else {
    return `${(sizeInKB / 1000).toFixed(2)} MB`;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("da-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getFileIcon = (mimeType: string, className?: string) => {
  const fileType = mimeType.split("/")[0];
  const fileSubType = mimeType.split("/")[1];

  const classNames = cn("h-4 w-4 ", className);

  if (fileType === "image") {
    return <FileImage className={classNames} />;
  } else if (fileType === "video") {
    return <Film className={classNames} />;
  } else if (fileType === "application") {
    if (fileSubType === "pdf" || fileSubType === "msword") {
      return <FileText className={classNames} />;
    } else if (fileSubType === "vnd.ms-excel") {
      return <FileSpreadsheet className={classNames} />;
    } else if (fileSubType === "powerpoint") {
      return <FileIcon className={classNames} />;
    }
  }

  return <File className={classNames} />;
};

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000`;
  }

  const domain = "dam-mikkelhartungs-projects.vercel.app";

  return `https://${domain}`;
};
