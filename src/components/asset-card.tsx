"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Asset } from "@/types";
import { FC } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { formatDate, formatFileSize, getFileIcon } from "@/lib/utils";

interface AssetCardProps {
  asset: Asset;
  onSelect: () => void;
}

export const AssetCard: FC<AssetCardProps> = ({ asset, onSelect }) => {
  return (
    <>
      <Card
        className="hover:border-accent-foreground cursor-pointer gap-4 rounded-none pt-0 transition"
        onClick={onSelect}
      >
        <CardHeader className="px-0">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={asset.preview}
              alt={asset.fileName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <CardTitle className="flex break-normal md:break-all">
            {asset.fileName}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex justify-between text-neutral-500">
          <p className="flex items-center gap-1 text-sm">
            {getFileIcon(asset.mimeType)}
            {formatFileSize(asset.fileSize)}
          </p>
          <p className="text-sm">{formatDate(asset.modifiedAt)}</p>
        </CardFooter>
      </Card>
    </>
  );
};
