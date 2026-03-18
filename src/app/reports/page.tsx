import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Building2,
  Users,
  CalendarCheck,
  FileText,
  Download,
} from "lucide-react";

const areaData = [
  { area: "港区", listings: 32, inquiries: 145, viewings: 28, contracts: 3, revenue: 4820000 },
  { area: "渋谷区", listings: 24, inquiries: 98, viewings: 19, contracts: 2, revenue: 2400000 },
  { area: "世田谷区", listings: 18, inquiries: 76, viewings: 14, contracts: 1, revenue: 1280000 },
  { area: "目黒区", listings: 15, inquiries: 62, viewings: 11, contracts: 1, revenue: 980000 },
  { area: "新宿区", listings: 12, inquiries: 54, viewings: 8, contracts: 0, revenue: 0 },
  { area: "江東区", listings: 10, inquiries: 48, viewings: 7, contracts: 1, revenue: 1500000 },
  { area: "武蔵野市", listings: 8, inquiries: 32, viewings: 5, contracts: 0, revenue: 0 },
  { area: "その他", listings: 9, inquiries: 27, viewings: 4, contracts: 1, revenue: 720000 },
];

const monthlyTrend = [
  { month: "2025/10", revenue: 5200000, contracts: 4 },
  { month: "2025/11", revenue: 6800000, contracts: 5 },
  { month: "2025/12", revenue: 4100000, contracts: 3 },
  { month: "2026/01", revenue: 7200000, contracts: 6 },
  { month: "2026/02", revenue: 5900000, contracts: 4 },
  { month: "2026/03", revenue: 6700000, contracts: 6 },
];

const maxRevenue = Math.max(...monthlyTrend.map((m) => m.revenue));

export default function ReportsPage() {
  const totalRevenue = areaData.reduce((sum, a) => sum + a.revenue, 0);
  const totalContracts = areaData.reduce((sum, a) => sum + a.contracts, 0);
  const totalViewings = areaData.reduce((sum, a) => sum + a.viewings, 0);
  const totalInquiries = areaData.reduce((sum, a) => sum + a.inquiries, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">レポート</h1>
          <p className="text-sm text-gray-500">業績データと分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700">
            <option>2026年3月</option>
            <option>2026年2月</option>
            <option>2026年1月</option>
          </select>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            エクスポート
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "月間売上", value: `¥${(totalRevenue / 10000).toLocaleString()}万`, change: "+12.3%", up: true, icon: TrendingUp, color: "blue" },
          { label: "成約数", value: `${totalContracts}件`, change: "+50%", up: true, icon: FileText, color: "green" },
          { label: "内見数", value: `${totalViewings}件`, change: "+8.7%", up: true, icon: CalendarCheck, color: "purple" },
          { label: "問い合わせ数", value: `${totalInquiries}件`, change: "+15.2%", up: true, icon: Users, color: "orange" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className={`h-3.5 w-3.5 ${kpi.up ? "text-green-500" : "text-red-500"}`} />
              <span className={`text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-600"}`}>{kpi.change}</span>
              <span className="text-xs text-gray-400">前月比</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">月別売上推移</h2>
          <div className="space-y-3">
            {monthlyTrend.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16 shrink-0 font-mono">{m.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(m.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-[10px] font-medium text-white whitespace-nowrap">
                      ¥{(m.revenue / 10000).toLocaleString()}万
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-10 text-right">{m.contracts}件</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">コンバージョンファネル</h2>
          <div className="space-y-4">
            {[
              { label: "問い合わせ", value: totalInquiries, pct: 100 },
              { label: "内見実施", value: totalViewings, pct: Math.round((totalViewings / totalInquiries) * 100) },
              { label: "商談", value: 15, pct: Math.round((15 / totalInquiries) * 100) },
              { label: "成約", value: totalContracts, pct: Math.round((totalContracts / totalInquiries) * 100) },
            ].map((step, i) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{step.label}</span>
                  <span className="text-sm">
                    <span className="font-semibold text-gray-900">{step.value}</span>
                    <span className="text-gray-400 ml-1">({step.pct}%)</span>
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      i === 0 ? "bg-blue-400" : i === 1 ? "bg-blue-500" : i === 2 ? "bg-blue-600" : "bg-blue-700"
                    }`}
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area Breakdown Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">エリア別実績</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-5 py-3 font-medium">エリア</th>
                <th className="px-5 py-3 font-medium text-right">掲載物件</th>
                <th className="px-5 py-3 font-medium text-right">問い合わせ</th>
                <th className="px-5 py-3 font-medium text-right">内見</th>
                <th className="px-5 py-3 font-medium text-right">成約</th>
                <th className="px-5 py-3 font-medium text-right">売上</th>
                <th className="px-5 py-3 font-medium text-right">CVR</th>
              </tr>
            </thead>
            <tbody>
              {areaData.map((row) => (
                <tr key={row.area} className="border-b border-gray-50 hover:bg-blue-50/30">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{row.area}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 text-right">{row.listings}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 text-right">{row.inquiries}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 text-right">{row.viewings}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900 text-right">{row.contracts}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900 text-right">
                    {row.revenue > 0 ? `¥${(row.revenue / 10000).toLocaleString()}万` : "-"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-xs font-medium ${row.contracts > 0 ? "text-green-600" : "text-gray-400"}`}>
                      {row.inquiries > 0 ? `${((row.contracts / row.inquiries) * 100).toFixed(1)}%` : "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold text-sm">
                <td className="px-5 py-3 text-gray-900">合計</td>
                <td className="px-5 py-3 text-gray-900 text-right">{areaData.reduce((s, r) => s + r.listings, 0)}</td>
                <td className="px-5 py-3 text-gray-900 text-right">{totalInquiries}</td>
                <td className="px-5 py-3 text-gray-900 text-right">{totalViewings}</td>
                <td className="px-5 py-3 text-gray-900 text-right">{totalContracts}</td>
                <td className="px-5 py-3 text-blue-600 text-right">¥{(totalRevenue / 10000).toLocaleString()}万</td>
                <td className="px-5 py-3 text-gray-900 text-right">{((totalContracts / totalInquiries) * 100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
