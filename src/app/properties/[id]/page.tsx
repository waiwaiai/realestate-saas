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
  Edit,
  Trash2,
  Copy,
  ExternalLink,
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

  const statusStyles = {
    available: "bg-green-50 text-green-700 border-green-200",
    under_contract: "bg-yellow-50 text-yellow-700 border-yellow-200",
    sold: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/properties" className="text-gray-500 hover:text-blue-600 transition-colors">
            物件管理
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{property.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Copy className="h-3.5 w-3.5" />
            複製
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ExternalLink className="h-3.5 w-3.5" />
            公開ページ
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Edit className="h-3.5 w-3.5" />
            編集
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="grid grid-cols-2 gap-3">
            {property.images.map((img, i) => (
              <div key={i} className="relative h-56 rounded-lg overflow-hidden">
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

          {/* Title & Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">
                    {property.priceType === "sale" ? "売買" : "賃貸"}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                    {getPropertyTypeLabel(property.propertyType)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusStyles[property.status]}`}>
                    {getStatusLabel(property.status)}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">{property.title}</h1>
              </div>
              <p className="text-2xl font-bold text-blue-600 shrink-0">
                {formatPrice(property.price, property.priceType)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              〒{property.zipCode} {property.prefecture}{property.city}{property.address}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">物件情報</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: BedDouble, label: "間取り", value: property.bedrooms > 0 ? `${property.bedrooms}LDK` : "-" },
                { icon: Bath, label: "バスルーム", value: property.bathrooms > 0 ? `${property.bathrooms}室` : "-" },
                { icon: Maximize, label: "専有面積", value: `${property.area}m²` },
                { icon: Calendar, label: "築年", value: property.buildYear > 0 ? `${property.buildYear}年` : "-" },
                { icon: Train, label: "最寄駅", value: `${property.nearestStation}駅` },
                { icon: MapPin, label: "徒歩", value: `${property.walkMinutes}分` },
              ].map((spec) => (
                <div key={spec.label} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <spec.icon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">{spec.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">物件概要</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">設備・特徴</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((f) => (
                <span key={f} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Agent Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">担当者</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{property.agent.name}</p>
                  <p className="text-xs text-gray-500">{property.agent.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                {property.agent.phone}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">対応履歴</h3>
            <div className="space-y-3">
              {[
                { date: "03/18", action: "内見実施", person: "山田様" },
                { date: "03/15", action: "問い合わせ", person: "佐藤様" },
                { date: "03/12", action: "写真更新", person: "システム" },
                { date: "03/10", action: "価格変更", person: "田中" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs text-gray-400 w-10 shrink-0 pt-0.5 font-mono">{log.date}</span>
                  <div>
                    <p className="text-sm text-gray-700">{log.action}</p>
                    <p className="text-xs text-gray-500">{log.person}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Inquiries */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">問い合わせ状況</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500">総問い合わせ</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">内見済み</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
