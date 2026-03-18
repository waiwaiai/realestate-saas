"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [priceType, setPriceType] = useState(searchParams.get("type") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (priceType) params.set("type", priceType);
    if (propertyType) params.set("propertyType", propertyType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  }, [keyword, priceType, propertyType, minPrice, maxPrice, router]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="エリア・駅名・物件名で検索..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
          >
            <option value="">売買/賃貸</option>
            <option value="sale">売買</option>
            <option value="rent">賃貸</option>
          </select>

          <select
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">物件タイプ</option>
            <option value="mansion">マンション</option>
            <option value="house">一戸建て</option>
            <option value="apartment">アパート</option>
            <option value="land">土地</option>
            <option value="office">オフィス</option>
          </select>

          <select
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            <option value="">下限なし</option>
            <option value="10000000">1,000万円〜</option>
            <option value="30000000">3,000万円〜</option>
            <option value="50000000">5,000万円〜</option>
            <option value="100000000">1億円〜</option>
          </select>

          <select
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">上限なし</option>
            <option value="30000000">〜3,000万円</option>
            <option value="50000000">〜5,000万円</option>
            <option value="100000000">〜1億円</option>
            <option value="200000000">〜2億円</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          className="w-full sm:w-auto sm:self-end px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          検索する
        </button>
      </div>
    </div>
  );
}
