import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Eye,
  Edit,
} from "lucide-react";
import {
  properties,
  formatPrice,
  getPropertyTypeLabel,
  getStatusLabel,
} from "@/data/properties";

export default function PropertiesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">物件管理</h1>
          <p className="text-sm text-gray-500">登録物件の一覧・管理</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          新規物件登録
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="物件名・住所・駅名で検索..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none">
            <option value="">すべてのステータス</option>
            <option value="available">公開中</option>
            <option value="under_contract">商談中</option>
            <option value="sold">成約済</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none">
            <option value="">すべてのタイプ</option>
            <option value="mansion">マンション</option>
            <option value="house">一戸建て</option>
            <option value="apartment">アパート</option>
            <option value="land">土地</option>
            <option value="office">オフィス</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 focus:border-blue-500 outline-none">
            <option value="">売買/賃貸</option>
            <option value="sale">売買</option>
            <option value="rent">賃貸</option>
          </select>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            詳細条件
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-gray-500">
          全 <span className="font-semibold text-gray-900">{properties.length}</span> 件
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-green-600">
          公開中 {properties.filter((p) => p.status === "available").length}
        </span>
        <span className="text-yellow-600">
          商談中 {properties.filter((p) => p.status === "under_contract").length}
        </span>
        <span className="text-gray-500">
          成約済 {properties.filter((p) => p.status === "sold").length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 font-medium">物件</th>
                <th className="px-4 py-3 font-medium">タイプ</th>
                <th className="px-4 py-3 font-medium">価格</th>
                <th className="px-4 py-3 font-medium">エリア</th>
                <th className="px-4 py-3 font-medium">面積</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">掲載日</th>
                <th className="px-4 py-3 font-medium w-20"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => {
                const statusStyles = {
                  available: "bg-green-50 text-green-700 border-green-200",
                  under_contract: "bg-yellow-50 text-yellow-700 border-yellow-200",
                  sold: "bg-gray-50 text-gray-600 border-gray-200",
                };
                return (
                  <tr
                    key={property.id}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/properties/${property.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                          >
                            {property.title}
                          </Link>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {property.city}{property.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {getPropertyTypeLabel(property.propertyType)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(property.price, property.priceType)}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {property.priceType === "sale" ? "売買" : "賃貸"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {property.prefecture}{property.city}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {property.area}m&sup2;
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[property.status]}`}
                      >
                        {getStatusLabel(property.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {property.listedAt}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/properties/${property.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="詳細"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="編集"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="その他"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            1-{properties.length} / {properties.length}件
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50" disabled>
              前へ
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50" disabled>
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
