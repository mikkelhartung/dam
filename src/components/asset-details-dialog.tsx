"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatFileSize, getFileIcon } from "@/lib/utils";
import { DialogProps } from "@radix-ui/react-dialog";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useAsset } from "@/hooks/use-asset";

export const AssetDetailsDialog: FC<DialogProps> = ({ ...dialogProps }) => {
  const { asset, setAsset } = useAsset();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (asset) {
      setIsOpen(true);
    }
  }, [asset]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setAsset(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} {...dialogProps}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex gap-1">
            {getFileIcon(asset?.mimeType ?? "")}
            {asset?.fileName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden rounded-md">
            <Image
              src={asset?.preview || "/placeholder.svg"}
              alt={asset?.fileName ?? ""}
              className="max-h-full max-w-full object-contain"
              width={500}
              height={500}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                File Information
              </h3>
              <dl className="grid grid-cols-3 gap-1 text-sm">
                <dt className="font-medium">Type:</dt>
                <dd className="col-span-2">{asset?.mimeType}</dd>

                <dt className="font-medium">Size:</dt>
                <dd className="col-span-2">
                  {formatFileSize(asset?.fileSize ?? 0)}
                </dd>

                <dt className="font-medium">Created:</dt>
                <dd className="col-span-2">
                  {formatDate(asset?.createdAt ?? "")}
                </dd>

                <dt className="font-medium">Modified:</dt>
                <dd className="col-span-2">
                  {formatDate(asset?.modifiedAt ?? "")}
                </dd>

                <dt className="font-medium">URL:</dt>
                <dd className="col-span-2 truncate">
                  <a
                    href={asset?.url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {asset?.url}
                  </a>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
