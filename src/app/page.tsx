import {
  Building2,
  Users,
  CalendarCheck,
  FileText,
  TrendingDown,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const recentActivities = [
  { time: "14:30", action: "内見完了", detail: "南青山タワー 23F - 山田様", type: "viewing" },
  { time: "13:15", action: "新規問い合わせ", detail: "代官山メゾネット - 佐藤様", type: "inquiry" },
  { time: "11:00", action: "契約書送付", detail: "世田谷新築戸建 - 鈴木様", type: "contract" },
  { time: "10:30", action: "物件登録", detail: "白金台低層レジデンス 2LDK", type: "property" },
  { time: "09:45", action: "内見予約", detail: "豊洲タワー 40F - 高橋様", type: "viewing" },
  { time: "09:00", action: "価格変更", detail: "鎌倉古民家リノベ → 5,400万円", type: "property" },
];

const todayTasks = [
  { time: "10:00", task: "南青山タワー 内見（山田様）", status: "done" },
  { time: "13:00", task: "代官山メゾネット 写真撮影", status: "done" },
  { time: "15:00", task: "世田谷戸建 重要事項説明", status: "upcoming" },
  { time: "16:30", task: "新規物件 現地調査", status: "upcoming" },
];

const alerts = [
  { message: "掲載期限: 中目黒ヴィンテージ（3月25日まで）", level: "warning" },
  { message: "顧客フォロー: 佐藤様 3日間未対応", level: "error" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-sm text-gray-500">2026年3月18日（火）</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                alert.level === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "管理物件数",
            value: "128",
            change: "+5",
            up: true,
            icon: Building2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
          },
          {
            label: "顧客数",
            value: "342",
            change: "+12",
            up: true,
            icon: Users,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
          },
          {
            label: "今月の内見数",
            value: "47",
            change: "+8",
            up: true,
            icon: CalendarCheck,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
          },
          {
            label: "今月の成約数",
            value: "6",
            change: "-2",
            up: false,
            icon: FileText,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {kpi.label}
              </span>
              <div className={`w-8 h-8 ${kpi.iconBg} rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`h-4 w-4 ${kpi.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.up ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  kpi.up ? "text-green-600" : "text-red-600"
                }`}
              >
                {kpi.change} 先月比
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">今日の予定</h2>
            <Link href="/viewings" className="text-xs text-blue-600 hover:text-blue-700">
              すべて見る
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {todayTasks.map((task, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <span className="text-xs text-gray-400 w-10 shrink-0 font-mono">
                  {task.time}
                </span>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    task.status === "done" ? "bg-green-400" : "bg-blue-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    task.status === "done"
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {task.task}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">最近のアクティビティ</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivities.map((activity, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <span className="text-xs text-gray-400 w-10 shrink-0 font-mono">
                  {activity.time}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium w-24 text-center shrink-0 ${
                    activity.type === "viewing"
                      ? "bg-purple-50 text-purple-700"
                      : activity.type === "inquiry"
                        ? "bg-blue-50 text-blue-700"
                        : activity.type === "contract"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {activity.action}
                </span>
                <span className="text-sm text-gray-700">{activity.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-4">今月の売上推移</h2>
          <div className="space-y-3">
            {[
              { label: "仲介手数料", value: "¥4,820,000", pct: 72 },
              { label: "管理委託料", value: "¥1,280,000", pct: 19 },
              { label: "コンサルティング", value: "¥600,000", pct: 9 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {row.value}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">合計</span>
              <span className="text-lg font-bold text-blue-600">¥6,700,000</span>
            </div>
          </div>
        </div>

        {/* Property Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-4">物件ステータス</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "公開中", count: 89, color: "bg-green-500" },
              { label: "商談中", count: 23, color: "bg-yellow-500" },
              { label: "成約済", count: 12, color: "bg-blue-500" },
              { label: "非公開", count: 4, color: "bg-gray-400" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 ${s.color} rounded-full shrink-0`} />
                <div>
                  <p className="text-lg font-bold text-gray-900">{s.count}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
