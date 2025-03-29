import { NextRequest, NextResponse } from "next/server";
import { data } from "./data";
import { Asset } from "@/types";

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<Asset[]>> => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const rawFileTypes = searchParams.get("fileType");
  const fileTypes = rawFileTypes ? rawFileTypes.split(",") : [];

  const filteredAssets = data.filter((asset) => {
    const matchesSearch = asset.fileName
      .toLowerCase()
      .includes(query!.toLowerCase());

    const fileType = asset.mimeType.split("/")[0];
    const fileSubType = asset.mimeType.split("/")[1];

    const isImage = fileType === "image" && fileTypes.includes("images");
    const isVideo = fileType === "video" && fileTypes.includes("videos");
    const isDocument =
      fileType === "application" &&
      (fileSubType === "pdf" || fileSubType === "msword") &&
      fileTypes.includes("documents");
    const isSpreadsheet =
      fileType === "application" &&
      fileSubType === "vnd.ms-excel" &&
      fileTypes.includes("spreadsheets");
    const isPresentation =
      fileType === "application" &&
      fileSubType === "powerpoint" &&
      fileTypes.includes("presentations");

    if (!fileTypes.length) return matchesSearch;

    return (
      matchesSearch &&
      (isImage || isVideo || isDocument || isSpreadsheet || isPresentation)
    );
  });

  return NextResponse.json(filteredAssets);
};
