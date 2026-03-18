import {
  Plus,
  Search,
  MoreHorizontal,
  Phone,
  Mail,
  Eye,
  Star,
} from "lucide-react";

const customers = [
  {
    id: "1",
    name: "山田 太郎",
    email: "yamada@example.com",
    phone: "090-1234-5678",
    type: "購入検討",
    status: "active",
    budget: "8,000万〜1.2億",
    area: "港区・渋谷区",
    lastContact: "2026-03-18",
    viewings: 3,
    rank: "A",
  },
  {
    id: "2",
    name: "佐藤 花子",
    email: "sato@example.com",
    phone: "080-2345-6789",
    type: "賃貸検討",
    status: "active",
    budget: "30万〜50万/月",
    area: "渋谷区・目黒区",
    lastContact: "2026-03-15",
    viewings: 2,
    rank: "B",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    email: "suzuki@example.com",
    phone: "070-3456-7890",
    type: "購入検討",
    status: "active",
    budget: "5,000万〜8,000万",
    area: "世田谷区",
    lastContact: "2026-03-12",
    viewings: 5,
    rank: "A",
  },
  {
    id: "4",
    name: "高橋 美咲",
    email: "takahashi@example.com",
    phone: "090-4567-8901",
    type: "購入検討",
    status: "follow_up",
    budget: "1.5億〜2億",
    area: "江東区（湾岸）",
    lastContact: "2026-03-08",
    viewings: 1,
    rank: "S",
  },
  {
    id: "5",
    name: "中村 裕介",
    email: "nakamura@example.com",
    phone: "080-5678-9012",
    type: "売却検討",
    status: "active",
    budget: "-",
    area: "鎌倉市",
    lastContact: "2026-03-10",
    viewings: 0,
    rank: "B",
  },
  {
    id: "6",
    name: "田中 直樹",
    email: "tanaka.n@example.com",
    phone: "070-6789-0123",
    type: "賃貸検討",
    status: "inactive",
    budget: "15万〜25万/月",
    area: "武蔵野市",
    lastContact: "2026-02-20",
    viewings: 1,
    rank: "C",
  },
  {
    id: "7",
    name: "伊藤 恵理",
    email: "ito@example.com",
    phone: "090-7890-1234",
    type: "購入検討",
    status: "active",
    budget: "4,000万〜6,000万",
    area: "目黒区・世田谷区",
    lastContact: "2026-03-16",
    viewings: 4,
    rank: "A",
  },
];

export default function CustomersPage() {
  const rankColors: Record<string, string> = {
    S: "bg-amber-100 text-amber-800 border-amber-200",
    A: "bg-blue-50 text-blue-700 border-blue-200",
    B: "bg-gray-50 text-gray-600 border-gray-200",
    C: "bg-gray-50 text-gray-400 border-gray-100",
  };

  const statusLabels: Record<string, { label: string; style: string }> = {
    active: { label: "対応中", style: "bg-green-50 text-green-700" },
    follow_up: { label: "フォロー", style: "bg-yellow-50 text-yellow-700" },
    inactive: { label: "休止", style: "bg-gray-50 text-gray-500" },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">顧客管理</h1>
          <p className="text-sm text-gray-500">顧客情報の一覧・管理</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          新規顧客登録
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="顧客名・電話番号・メールで検索..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700">
            <option value="">すべてのステータス</option>
            <option value="active">対応中</option>
            <option value="follow_up">フォロー</option>
            <option value="inactive">休止</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700">
            <option value="">すべてのランク</option>
            <option value="S">Sランク</option>
            <option value="A">Aランク</option>
            <option value="B">Bランク</option>
            <option value="C">Cランク</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 font-medium">ランク</th>
                <th className="px-4 py-3 font-medium">顧客名</th>
                <th className="px-4 py-3 font-medium">連絡先</th>
                <th className="px-4 py-3 font-medium">検討タイプ</th>
                <th className="px-4 py-3 font-medium">予算</th>
                <th className="px-4 py-3 font-medium">希望エリア</th>
                <th className="px-4 py-3 font-medium">内見数</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">最終対応</th>
                <th className="px-4 py-3 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border ${rankColors[c.rank]}`}>
                      {c.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />{c.phone}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="h-3 w-3 text-gray-400" />{c.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {c.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.budget}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.area}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium text-center">{c.viewings}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusLabels[c.status].style}`}>
                      {statusLabels[c.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{c.lastContact}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">1-{customers.length} / {customers.length}件</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded" disabled>前へ</button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded" disabled>次へ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
