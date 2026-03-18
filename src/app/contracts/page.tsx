import {
  Plus,
  Search,
  FileText,
  Download,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const contracts = [
  {
    id: "C-2026-001",
    property: "世田谷 新築一戸建て",
    customer: "鈴木 一郎",
    type: "売買契約",
    amount: "89,800,000",
    status: "signing",
    createdAt: "2026-03-15",
    deadline: "2026-03-25",
  },
  {
    id: "C-2026-002",
    property: "代官山メゾネットハウス",
    customer: "佐藤 花子",
    type: "賃貸借契約",
    amount: "450,000/月",
    status: "draft",
    createdAt: "2026-03-16",
    deadline: "2026-03-30",
  },
  {
    id: "C-2025-048",
    property: "吉祥寺 駅近ワンルーム",
    customer: "投資法人ABC",
    type: "売買契約",
    amount: "32,000,000",
    status: "completed",
    createdAt: "2026-02-20",
    deadline: "2026-03-05",
  },
  {
    id: "C-2025-047",
    property: "新宿御苑前 オフィス物件",
    customer: "株式会社テック",
    type: "賃貸借契約",
    amount: "280,000/月",
    status: "completed",
    createdAt: "2026-02-15",
    deadline: "2026-03-01",
  },
  {
    id: "C-2026-003",
    property: "白金台 低層レジデンス",
    customer: "伊藤 恵理",
    type: "売買契約",
    amount: "98,000,000",
    status: "negotiation",
    createdAt: "2026-03-17",
    deadline: "2026-04-15",
  },
];

export default function ContractsPage() {
  const statusConfig: Record<string, { label: string; style: string }> = {
    draft: { label: "下書き", style: "bg-gray-50 text-gray-600 border-gray-200" },
    signing: { label: "署名待ち", style: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    negotiation: { label: "交渉中", style: "bg-blue-50 text-blue-700 border-blue-200" },
    completed: { label: "締結済", style: "bg-green-50 text-green-700 border-green-200" },
    cancelled: { label: "キャンセル", style: "bg-red-50 text-red-600 border-red-200" },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">契約管理</h1>
          <p className="text-sm text-gray-500">契約書の作成・管理・署名追跡</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          新規契約書作成
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "下書き", count: contracts.filter((c) => c.status === "draft").length, color: "text-gray-600" },
          { label: "署名待ち", count: contracts.filter((c) => c.status === "signing").length, color: "text-yellow-600" },
          { label: "交渉中", count: contracts.filter((c) => c.status === "negotiation").length, color: "text-blue-600" },
          { label: "締結済", count: contracts.filter((c) => c.status === "completed").length, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="契約番号・物件名・顧客名で検索..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:border-blue-500 outline-none"
            />
          </div>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700">
            <option value="">すべてのステータス</option>
            <option value="draft">下書き</option>
            <option value="signing">署名待ち</option>
            <option value="negotiation">交渉中</option>
            <option value="completed">締結済</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700">
            <option value="">すべてのタイプ</option>
            <option value="sale">売買契約</option>
            <option value="rent">賃貸借契約</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium">契約番号</th>
                <th className="px-4 py-3 font-medium">物件</th>
                <th className="px-4 py-3 font-medium">顧客</th>
                <th className="px-4 py-3 font-medium">契約タイプ</th>
                <th className="px-4 py-3 font-medium">金額</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">作成日</th>
                <th className="px-4 py-3 font-medium">期限</th>
                <th className="px-4 py-3 font-medium w-24"></th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => {
                const config = statusConfig[c.status];
                return (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-mono font-medium text-gray-900">{c.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">{c.property}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.customer}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{c.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">¥{c.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${config.style}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{c.createdAt}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{c.deadline}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="表示">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="ダウンロード">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
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
      </div>
    </div>
  );
}
