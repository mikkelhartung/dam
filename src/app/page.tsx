import { AssetCardList } from "@/components/asset-card-list";
import { AssetDetailsDialog } from "@/components/asset-details-dialog";
import { AssetList } from "@/components/asset-list";
import { SearchBar } from "@/components/search-bar";
import { AssetProvider } from "@/contexts/asset";
import { getBaseUrl } from "@/lib/utils";
import { Asset } from "@/types";

type SearchParams = Promise<{
  query: string;
  fileType: string;
  view: "grid" | "list";
}>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const view = searchParams.view ?? "grid";

  const params = new URLSearchParams({
    query: searchParams.query ?? "",
    fileType: searchParams.fileType ?? [],
  });

  const API_BASE_URL = getBaseUrl();
  const url = `${API_BASE_URL}/api/assets?${params}`;

  const response = await fetch(url);
  const data = (await response.json()) as Asset[];

  return (
    <main className="flex flex-col gap-6 p-4 md:px-16 md:py-8">
      <SearchBar />

      {data.length > 0 && (
        <div className="flex">
          <p>
            Found <span className="font-semibold">{data.length}</span> assets
          </p>
        </div>
      )}

      <AssetProvider>
        {view === "grid" && <AssetCardList assets={data} />}
        {view === "list" && <AssetList assets={data} />}
        <AssetDetailsDialog />
      </AssetProvider>

      {!data.length && (
        <div className="flex flex-row justify-center">
          <p>No assets found</p>
        </div>
      )}
    </main>
  );
}
