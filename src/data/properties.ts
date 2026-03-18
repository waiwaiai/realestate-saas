export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "sale" | "rent";
  address: string;
  city: string;
  prefecture: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqm
  buildYear: number;
  propertyType: "mansion" | "house" | "apartment" | "land" | "office";
  images: string[];
  features: string[];
  nearestStation: string;
  walkMinutes: number;
  status: "available" | "under_contract" | "sold";
  listedAt: string;
  agent: {
    name: string;
    company: string;
    phone: string;
  };
}

export const properties: Property[] = [
  {
    id: "1",
    title: "南青山タワーレジデンス 23F",
    description:
      "表参道駅徒歩5分の高層マンション。南向きで日当たり良好。最新設備完備のラグジュアリーレジデンス。コンシェルジュサービス、フィットネスジム、ラウンジ付き。",
    price: 128000000,
    priceType: "sale",
    address: "南青山3-15-8",
    city: "港区",
    prefecture: "東京都",
    zipCode: "107-0062",
    bedrooms: 3,
    bathrooms: 2,
    area: 95.4,
    buildYear: 2021,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    features: ["オートロック", "宅配ボックス", "床暖房", "食洗機", "ジム"],
    nearestStation: "表参道",
    walkMinutes: 5,
    status: "available",
    listedAt: "2026-03-01",
    agent: {
      name: "田中 太郎",
      company: "東京不動産パートナーズ",
      phone: "03-1234-5678",
    },
  },
  {
    id: "2",
    title: "代官山メゾネットハウス",
    description:
      "閑静な住宅街に佇むデザイナーズメゾネット。吹き抜けリビングと専用庭付き。ペット飼育可。代官山・中目黒エリアの人気物件。",
    price: 450000,
    priceType: "rent",
    address: "代官山町18-3",
    city: "渋谷区",
    prefecture: "東京都",
    zipCode: "150-0034",
    bedrooms: 2,
    bathrooms: 1,
    area: 78.2,
    buildYear: 2019,
    propertyType: "apartment",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    features: ["ペット可", "専用庭", "メゾネット", "デザイナーズ", "駐車場"],
    nearestStation: "代官山",
    walkMinutes: 7,
    status: "available",
    listedAt: "2026-02-15",
    agent: {
      name: "佐藤 花子",
      company: "渋谷ホームズ",
      phone: "03-2345-6789",
    },
  },
  {
    id: "3",
    title: "世田谷 新築一戸建て",
    description:
      "4LDK+書斎の新築一戸建て。太陽光発電・蓄電池完備のZEH住宅。広々としたリビングと充実の収納。カーポート2台分。",
    price: 89800000,
    priceType: "sale",
    address: "成城6-22-1",
    city: "世田谷区",
    prefecture: "東京都",
    zipCode: "157-0066",
    bedrooms: 4,
    bathrooms: 2,
    area: 142.8,
    buildYear: 2026,
    propertyType: "house",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    features: ["新築", "太陽光発電", "ZEH", "カーポート2台", "床暖房"],
    nearestStation: "成城学園前",
    walkMinutes: 10,
    status: "available",
    listedAt: "2026-03-10",
    agent: {
      name: "鈴木 一郎",
      company: "世田谷住宅販売",
      phone: "03-3456-7890",
    },
  },
  {
    id: "4",
    title: "六本木ヒルズビュー 1LDK",
    description:
      "六本木ヒルズを望むハイグレードマンション。24時間コンシェルジュ、スパ、ラウンジ完備。単身〜DINKS向けの洗練された空間。",
    price: 320000,
    priceType: "rent",
    address: "六本木5-10-33",
    city: "港区",
    prefecture: "東京都",
    zipCode: "106-0032",
    bedrooms: 1,
    bathrooms: 1,
    area: 52.3,
    buildYear: 2020,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    ],
    features: ["コンシェルジュ", "スパ", "ラウンジ", "ジム", "24時間管理"],
    nearestStation: "六本木",
    walkMinutes: 3,
    status: "available",
    listedAt: "2026-03-05",
    agent: {
      name: "田中 太郎",
      company: "東京不動産パートナーズ",
      phone: "03-1234-5678",
    },
  },
  {
    id: "5",
    title: "鎌倉 海が見える古民家リノベ",
    description:
      "築80年の古民家をフルリノベーション。オーシャンビューのリビングと日本庭園。趣ある梁を活かしたモダン和風デザイン。サーファーにも人気のエリア。",
    price: 56000000,
    priceType: "sale",
    address: "稲村ガ崎2-8-15",
    city: "鎌倉市",
    prefecture: "神奈川県",
    zipCode: "248-0024",
    bedrooms: 3,
    bathrooms: 1,
    area: 118.5,
    buildYear: 1945,
    propertyType: "house",
    images: [
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    ],
    features: ["リノベーション", "オーシャンビュー", "日本庭園", "駐車場", "古民家"],
    nearestStation: "稲村ヶ崎",
    walkMinutes: 8,
    status: "available",
    listedAt: "2026-02-20",
    agent: {
      name: "山田 美咲",
      company: "湘南不動産",
      phone: "0467-12-3456",
    },
  },
  {
    id: "6",
    title: "新宿御苑前 オフィス物件",
    description:
      "新宿御苑前駅直結のオフィスビル。採光良好な角部屋。OAフロア、個別空調完備。スタートアップ・士業に最適。",
    price: 280000,
    priceType: "rent",
    address: "新宿1-5-12",
    city: "新宿区",
    prefecture: "東京都",
    zipCode: "160-0022",
    bedrooms: 0,
    bathrooms: 1,
    area: 45.0,
    buildYear: 2018,
    propertyType: "office",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    features: ["駅直結", "OAフロア", "個別空調", "24時間利用可", "会議室"],
    nearestStation: "新宿御苑前",
    walkMinutes: 1,
    status: "available",
    listedAt: "2026-03-12",
    agent: {
      name: "高橋 健太",
      company: "新宿オフィスナビ",
      phone: "03-4567-8901",
    },
  },
  {
    id: "7",
    title: "目黒川沿い ヴィンテージマンション",
    description:
      "桜の名所・目黒川沿いのリノベーション済みヴィンテージマンション。無垢フローリング、造作キッチン。カフェのような暮らしを。",
    price: 68000000,
    priceType: "sale",
    address: "中目黒1-10-23",
    city: "目黒区",
    prefecture: "東京都",
    zipCode: "153-0061",
    bedrooms: 2,
    bathrooms: 1,
    area: 68.9,
    buildYear: 1985,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
    features: ["リノベ済", "無垢フローリング", "造作キッチン", "川沿い", "ペット可"],
    nearestStation: "中目黒",
    walkMinutes: 4,
    status: "under_contract",
    listedAt: "2026-01-28",
    agent: {
      name: "佐藤 花子",
      company: "渋谷ホームズ",
      phone: "03-2345-6789",
    },
  },
  {
    id: "8",
    title: "湾岸タワー 40F パノラマビュー",
    description:
      "東京湾を一望する40階の角部屋。レインボーブリッジの夜景が圧巻。共用施設にはプール、ゲストルーム、パーティールームも。",
    price: 195000000,
    priceType: "sale",
    address: "豊洲3-2-20",
    city: "江東区",
    prefecture: "東京都",
    zipCode: "135-0061",
    bedrooms: 4,
    bathrooms: 3,
    area: 135.2,
    buildYear: 2023,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
    ],
    features: ["パノラマビュー", "プール", "ゲストルーム", "ジム", "コンシェルジュ"],
    nearestStation: "豊洲",
    walkMinutes: 6,
    status: "available",
    listedAt: "2026-03-15",
    agent: {
      name: "田中 太郎",
      company: "東京不動産パートナーズ",
      phone: "03-1234-5678",
    },
  },
  {
    id: "9",
    title: "軽井沢 森の中のログハウス",
    description:
      "浅間山を望む約500坪の敷地に建つ本格ログハウス。薪ストーブ、ウッドデッキ、露天風呂付き。週末住居・別荘に最適。",
    price: 42000000,
    priceType: "sale",
    address: "長倉4230-15",
    city: "軽井沢町",
    prefecture: "長野県",
    zipCode: "389-0111",
    bedrooms: 3,
    bathrooms: 2,
    area: 128.0,
    buildYear: 2015,
    propertyType: "house",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    ],
    features: ["薪ストーブ", "ウッドデッキ", "露天風呂", "500坪", "別荘"],
    nearestStation: "軽井沢",
    walkMinutes: 25,
    status: "available",
    listedAt: "2026-02-01",
    agent: {
      name: "中村 裕子",
      company: "軽井沢リゾート不動産",
      phone: "0267-42-1234",
    },
  },
  {
    id: "10",
    title: "渋谷 開発用地 120坪",
    description:
      "渋谷駅徒歩8分の開発用地。建蔽率80%、容積率400%。マンション・商業施設の開発に最適な立地。",
    price: 580000000,
    priceType: "sale",
    address: "神南1-20",
    city: "渋谷区",
    prefecture: "東京都",
    zipCode: "150-0041",
    bedrooms: 0,
    bathrooms: 0,
    area: 396.7,
    buildYear: 0,
    propertyType: "land",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    features: ["建蔽率80%", "容積率400%", "商業地域", "角地", "更地"],
    nearestStation: "渋谷",
    walkMinutes: 8,
    status: "available",
    listedAt: "2026-03-08",
    agent: {
      name: "高橋 健太",
      company: "新宿オフィスナビ",
      phone: "03-4567-8901",
    },
  },
  {
    id: "11",
    title: "白金台 低層レジデンス",
    description:
      "閑静な白金台の低層マンション。全戸南向き、専用庭付き1階住戸。プラチナ通り至近の落ち着いた暮らし。",
    price: 98000000,
    priceType: "sale",
    address: "白金台4-6-1",
    city: "港区",
    prefecture: "東京都",
    zipCode: "108-0071",
    bedrooms: 2,
    bathrooms: 1,
    area: 82.1,
    buildYear: 2022,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
    ],
    features: ["低層", "専用庭", "南向き", "内廊下", "24時間管理"],
    nearestStation: "白金台",
    walkMinutes: 4,
    status: "available",
    listedAt: "2026-03-14",
    agent: {
      name: "田中 太郎",
      company: "東京不動産パートナーズ",
      phone: "03-1234-5678",
    },
  },
  {
    id: "12",
    title: "吉祥寺 駅近ワンルーム投資物件",
    description:
      "吉祥寺駅徒歩3分の投資向けワンルームマンション。現在賃貸中、利回り4.8%。管理状態良好。",
    price: 32000000,
    priceType: "sale",
    address: "吉祥寺南町1-5-10",
    city: "武蔵野市",
    prefecture: "東京都",
    zipCode: "180-0003",
    bedrooms: 1,
    bathrooms: 1,
    area: 25.8,
    buildYear: 2010,
    propertyType: "mansion",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
    ],
    features: ["投資向け", "賃貸中", "利回り4.8%", "管理良好", "駅近"],
    nearestStation: "吉祥寺",
    walkMinutes: 3,
    status: "available",
    listedAt: "2026-02-28",
    agent: {
      name: "鈴木 一郎",
      company: "世田谷住宅販売",
      phone: "03-3456-7890",
    },
  },
];

export function formatPrice(price: number, type: "sale" | "rent"): string {
  if (type === "rent") {
    return `${(price / 10000).toFixed(1)}万円/月`;
  }
  if (price >= 100000000) {
    return `${(price / 100000000).toFixed(1)}億円`;
  }
  return `${(price / 10000).toFixed(0)}万円`;
}

export function getPropertyTypeLabel(type: Property["propertyType"]): string {
  const labels: Record<Property["propertyType"], string> = {
    mansion: "マンション",
    house: "一戸建て",
    apartment: "アパート",
    land: "土地",
    office: "オフィス",
  };
  return labels[type];
}

export function getStatusLabel(status: Property["status"]): string {
  const labels: Record<Property["status"], string> = {
    available: "募集中",
    under_contract: "商談中",
    sold: "成約済",
  };
  return labels[status];
}
