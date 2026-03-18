import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize, Train } from "lucide-react";
import {
  type Property,
  formatPrice,
  getPropertyTypeLabel,
  getStatusLabel,
} from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const statusColors: Record<Property["status"], string> = {
    available: "bg-green-100 text-green-800",
    under_contract: "bg-yellow-100 text-yellow-800",
    sold: "bg-gray-100 text-gray-600",
  };

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md">
              {property.priceType === "sale" ? "売買" : "賃貸"}
            </span>
            <span className="px-2 py-1 text-xs font-semibold bg-white/90 text-gray-700 rounded-md">
              {getPropertyTypeLabel(property.propertyType)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-md ${statusColors[property.status]}`}
            >
              {getStatusLabel(property.status)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-xl font-bold text-blue-600">
              {formatPrice(property.price, property.priceType)}
            </p>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>
              {property.prefecture}
              {property.city}
              {property.address}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                <span>{property.bedrooms}部屋</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area}m&sup2;</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 pt-3 border-t border-gray-100">
            <Train className="h-3.5 w-3.5" />
            <span>
              {property.nearestStation}駅 徒歩{property.walkMinutes}分
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
