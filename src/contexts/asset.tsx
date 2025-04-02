"use client";

import { Asset } from "@/types";
import { createContext, useState } from "react";

export const AssetContext = createContext<{
  asset: Asset | null;
  setAsset: (asset: Asset | null) => void;
}>({
  asset: null,
  setAsset: () => {},
});

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [asset, setAsset] = useState<Asset | null>(null);

  return (
    <AssetContext.Provider value={{ asset, setAsset }}>
      {children}
    </AssetContext.Provider>
  );
};
