"use client";

import { Asset } from "@/types";
import { FC } from "react";
import { AssetCard } from "./asset-card";
import { useAsset } from "@/hooks/use-asset";

interface AssetCardListProps {
  assets: Asset[];
}

export const AssetCardList: FC<AssetCardListProps> = ({ assets }) => {
  const { setAsset } = useAsset();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onSelect={() => setAsset(asset)}
        />
      ))}
    </div>
  );
};
