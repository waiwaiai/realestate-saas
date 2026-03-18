import { Suspense } from "react";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { properties, type Property } from "@/data/properties";

function PropertyResults({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const q = searchParams.q?.toLowerCase();
  const type = searchParams.type as "sale" | "rent" | undefined;
  const propertyType = searchParams.propertyType as Property["propertyType"] | undefined;
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;

  const filtered = properties.filter((p) => {
    if (q) {
      const searchable = `${p.title} ${p.prefecture} ${p.city} ${p.address} ${p.nearestStation} ${p.features.join(" ")}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (type && p.priceType !== type) return false;
    if (propertyType && p.propertyType !== propertyType) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    return true;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{filtered.length}</span> 件の物件が見つかりました
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">条件に合う物件が見つかりませんでした</p>
          <p className="text-gray-400 text-sm mt-2">検索条件を変更してお試しください</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          物件検索
        </h1>
        <p className="text-gray-500">
          条件を指定して理想の物件を見つけましょう
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-40 bg-gray-100 rounded-xl animate-pulse" />}>
          <SearchFilters />
        </Suspense>
      </div>

      <PropertyResults searchParams={params} />
    </div>
  );
}
