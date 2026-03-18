import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const marketData = {
  averagePrices: [
    { area: "港区", mansion: 12500, house: 18000, change: 2.3 },
    { area: "渋谷区", mansion: 10800, house: 15200, change: 1.8 },
    { area: "世田谷区", mansion: 7200, house: 9800, change: 0.5 },
    { area: "目黒区", mansion: 8500, house: 11000, change: 1.2 },
    { area: "新宿区", mansion: 8900, house: 12500, change: -0.3 },
    { area: "江東区", mansion: 6800, house: 8200, change: 3.1 },
    { area: "武蔵野市", mansion: 5900, house: 7600, change: 0.8 },
    { area: "鎌倉市", mansion: 4200, house: 5800, change: 1.5 },
  ],
  recentTransactions: [
    { property: "南青山タワー 15F", price: "1.15億", date: "2026/03/12", type: "売買" },
    { property: "代官山メゾン 2F", price: "42万/月", date: "2026/03/10", type: "賃貸" },
    { property: "世田谷 新築戸建", price: "8,200万", date: "2026/03/08", type: "売買" },
    { property: "豊洲タワー 32F", price: "1.82億", date: "2026/03/05", type: "売買" },
    { property: "中目黒 リノベ 3F", price: "6,500万", date: "2026/03/01", type: "売買" },
  ],
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          マーケットダッシュボード
        </h1>
        <p className="text-gray-500">不動産市場のリアルタイムデータ</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "平均成約価格",
            value: "8,420万円",
            change: "+2.1%",
            up: true,
            icon: TrendingUp,
            color: "blue",
          },
          {
            label: "新規掲載数",
            value: "342件",
            change: "+15.3%",
            up: true,
            icon: Building2,
            color: "green",
          },
          {
            label: "問い合わせ数",
            value: "1,284件",
            change: "+8.7%",
            up: true,
            icon: Users,
            color: "purple",
          },
          {
            label: "平均掲載日数",
            value: "23日",
            change: "-3.2%",
            up: false,
            icon: Eye,
            color: "orange",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{kpi.label}</span>
              <kpi.icon
                className={`h-5 w-5 text-${kpi.color}-500`}
                style={{
                  color:
                    kpi.color === "blue"
                      ? "#3b82f6"
                      : kpi.color === "green"
                        ? "#22c55e"
                        : kpi.color === "purple"
                          ? "#a855f7"
                          : "#f97316",
                }}
              />
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.up ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  kpi.label === "平均掲載日数"
                    ? "text-green-600"
                    : kpi.up
                      ? "text-green-600"
                      : "text-red-600"
                }`}
              >
                {kpi.change}
              </span>
              <span className="text-xs text-gray-400">前月比</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Area Price Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">
              エリア別平均坪単価（万円/坪）
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">エリア</th>
                  <th className="px-6 py-3 font-medium">マンション</th>
                  <th className="px-6 py-3 font-medium">戸建</th>
                  <th className="px-6 py-3 font-medium">前年比</th>
                </tr>
              </thead>
              <tbody>
                {marketData.averagePrices.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      {row.area}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {row.mansion.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {row.house.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-sm font-medium ${
                          row.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {row.change >= 0 ? "+" : ""}
                        {row.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">直近の成約情報</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {marketData.recentTransactions.map((tx, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {tx.property}
                  </p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{tx.price}</p>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    {tx.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insight Bar Chart (CSS-based) */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-6">
          エリア別マンション坪単価
        </h2>
        <div className="space-y-4">
          {marketData.averagePrices.map((row) => (
            <div key={row.area} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-24 shrink-0">
                {row.area}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-2"
                  style={{
                    width: `${(row.mansion / 13000) * 100}%`,
                  }}
                >
                  <span className="text-xs font-medium text-white">
                    {row.mansion.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
