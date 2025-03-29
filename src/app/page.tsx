import { AssetCard } from "@/components/asset-card";
import { AssetList } from "@/components/asset-list";
import { SearchBar } from "@/components/search-bar";
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
        <div className="flex flex-row-reverse">
          <p>
            Found <span className="font-semibold">{data.length}</span> assets
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {view === "grid" &&
          data.map((asset) => <AssetCard key={asset.id} asset={asset} />)}
      </div>

      {view === "list" && <AssetList assets={data} />}

      {!data.length && (
        <div className="flex flex-row justify-center">
          <p>No assets found</p>
        </div>
      )}
    </main>
  );
}
