"use client";

import { AssetContext } from "@/contexts/asset";
import { useContext } from "react";

export const useAsset = () => {
  const { asset, setAsset } = useContext(AssetContext);

  return { asset, setAsset };
};
