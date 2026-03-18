import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Train,
  Calendar,
  Building,
  Phone,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import {
  properties,
  formatPrice,
  getPropertyTypeLabel,
  getStatusLabel,
} from "@/data/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          物件一覧に戻る
        </Link>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {property.images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-xl overflow-hidden ${
              i === 0 ? "h-72 md:h-96" : "h-72 md:h-96"
            }`}
          >
            <Image
              src={img}
              alt={`${property.title} - ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md">
                {property.priceType === "sale" ? "売買" : "賃貸"}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-md">
                {getPropertyTypeLabel(property.propertyType)}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-md">
                {getStatusLabel(property.status)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>
                〒{property.zipCode} {property.prefecture}
                {property.city}
                {property.address}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(property.price, property.priceType)}
            </span>
            {property.priceType === "rent" && (
              <span className="text-sm text-gray-500">（管理費込み）</span>
            )}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: BedDouble,
                label: "間取り",
                value: property.bedrooms > 0 ? `${property.bedrooms}LDK` : "-",
              },
              {
                icon: Bath,
                label: "バスルーム",
                value: property.bathrooms > 0 ? `${property.bathrooms}室` : "-",
              },
              {
                icon: Maximize,
                label: "専有面積",
                value: `${property.area}m²`,
              },
              {
                icon: Calendar,
                label: "築年",
                value: property.buildYear > 0 ? `${property.buildYear}年` : "-",
              },
            ].map((spec) => (
              <div
                key={spec.label}
                className="bg-gray-50 rounded-lg p-4 text-center"
              >
                <spec.icon className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                <p className="font-semibold text-gray-900">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">物件概要</h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">設備・特徴</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Access */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">交通アクセス</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Train className="h-5 w-5 text-gray-400" />
              <span>
                {property.nearestStation}駅 徒歩{property.walkMinutes}分
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">お問い合わせ</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">取扱会社</p>
                  <p className="font-medium text-gray-900">
                    {property.agent.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">担当</p>
                  <p className="font-medium text-gray-900">
                    {property.agent.name}
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mb-3">
              内見を予約する
            </button>
            <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors mb-4">
              資料を請求する
            </button>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors rounded-lg border border-gray-200">
                <Heart className="h-4 w-4" />
                保存
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-gray-500 hover:text-blue-500 transition-colors rounded-lg border border-gray-200">
                <Share2 className="h-4 w-4" />
                共有
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
