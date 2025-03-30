"use client";
import { formatDate, formatFileSize, getFileIcon } from "@/lib/utils";
import { Asset } from "@/types";
import { FC, useState } from "react";
import { AssetDetailsDialog } from "./asset-details-dialog";

interface AssetListProps {
  assets: Asset[];
}

export const AssetList: FC<AssetListProps> = ({ assets }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailDialogOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <div className="bg-muted grid grid-cols-12 px-4 py-2 text-sm font-medium">
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Last modified</div>
        </div>
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="hover:bg-muted/50 grid cursor-pointer grid-cols-12 border-t px-4 py-3"
            onClick={() => handleAssetClick(asset)}
          >
            <div className="col-span-5 flex items-center gap-2">
              {getFileIcon(asset.mimeType, "")}
              <span className="truncate">{asset.fileName}</span>
            </div>
            <div className="text-muted-foreground col-span-2 text-sm uppercase">
              {asset.mimeType.split("/")[1]}
            </div>
            <div className="text-muted-foreground col-span-2 text-sm">
              {formatFileSize(asset.fileSize)}
            </div>
            <div className="text-muted-foreground col-span-3 text-sm">
              {formatDate(asset.modifiedAt)}
            </div>
          </div>
        ))}
      </div>
      <AssetDetailsDialog
        asset={selectedAsset}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </>
  );
};
