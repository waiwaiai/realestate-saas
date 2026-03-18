import {
  Plus,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const viewings = [
  {
    id: "1",
    date: "2026-03-18",
    time: "10:00",
    property: "南青山タワーレジデンス 23F",
    customer: "山田 太郎",
    agent: "田中 太郎",
    status: "completed",
    note: "気に入った様子。2回目の内見を希望。",
  },
  {
    id: "2",
    date: "2026-03-18",
    time: "15:00",
    property: "世田谷 新築一戸建て",
    customer: "鈴木 一郎",
    agent: "鈴木 一郎",
    status: "scheduled",
    note: "重要事項説明も同時に実施予定。",
  },
  {
    id: "3",
    date: "2026-03-19",
    time: "11:00",
    property: "代官山メゾネットハウス",
    customer: "佐藤 花子",
    agent: "佐藤 花子",
    status: "scheduled",
    note: "",
  },
  {
    id: "4",
    date: "2026-03-19",
    time: "14:00",
    property: "湾岸タワー 40F パノラマビュー",
    customer: "高橋 美咲",
    agent: "田中 太郎",
    status: "scheduled",
    note: "ご家族同伴。駐車場の空きも確認希望。",
  },
  {
    id: "5",
    date: "2026-03-17",
    time: "13:00",
    property: "六本木ヒルズビュー 1LDK",
    customer: "山田 太郎",
    agent: "田中 太郎",
    status: "completed",
    note: "間取りがやや狭い。他物件も検討。",
  },
  {
    id: "6",
    date: "2026-03-16",
    time: "10:00",
    property: "白金台 低層レジデンス",
    customer: "伊藤 恵理",
    agent: "田中 太郎",
    status: "completed",
    note: "専用庭が気に入った。価格交渉の可能性あり。",
  },
  {
    id: "7",
    date: "2026-03-20",
    time: "11:00",
    property: "目黒川沿い ヴィンテージマンション",
    customer: "伊藤 恵理",
    agent: "佐藤 花子",
    status: "scheduled",
    note: "",
  },
  {
    id: "8",
    date: "2026-03-15",
    time: "15:00",
    property: "鎌倉 海が見える古民家リノベ",
    customer: "中村 裕介",
    agent: "山田 美咲",
    status: "cancelled",
    note: "顧客都合によりキャンセル。リスケ調整中。",
  },
];

export default function ViewingsPage() {
  const statusConfig: Record<string, { label: string; style: string; icon: typeof CheckCircle2 }> = {
    completed: { label: "完了", style: "bg-green-50 text-green-700", icon: CheckCircle2 },
    scheduled: { label: "予定", style: "bg-blue-50 text-blue-700", icon: Clock },
    cancelled: { label: "キャンセル", style: "bg-red-50 text-red-600", icon: XCircle },
  };

  const today = viewings.filter((v) => v.date === "2026-03-18");
  const upcoming = viewings.filter((v) => v.date > "2026-03-18" && v.status === "scheduled");
  const past = viewings.filter((v) => v.date < "2026-03-18");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">内見管理</h1>
          <p className="text-sm text-gray-500">内見スケジュールと履歴</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          内見を予約
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "今日の内見", count: today.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "今後の予定", count: upcoming.length, color: "text-green-600", bg: "bg-green-50" },
          { label: "今月の完了", count: viewings.filter((v) => v.status === "completed").length, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "キャンセル", count: viewings.filter((v) => v.status === "cancelled").length, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Today */}
      {today.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            今日の内見
          </h2>
          <div className="space-y-3">
            {today.map((v) => {
              const config = statusConfig[v.status];
              return (
                <div key={v.id} className="bg-white rounded-lg border-2 border-blue-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-center bg-blue-50 rounded-lg px-3 py-2 shrink-0">
                        <p className="text-lg font-bold text-blue-600">{v.time}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{v.property}</h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{v.customer}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{v.agent}（担当）</span>
                        </div>
                        {v.note && <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-2 py-1 rounded">{v.note}</p>}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.style}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">今後の予定</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium">日時</th>
                  <th className="px-4 py-3 font-medium">物件</th>
                  <th className="px-4 py-3 font-medium">顧客</th>
                  <th className="px-4 py-3 font-medium">担当</th>
                  <th className="px-4 py-3 font-medium">備考</th>
                  <th className="px-4 py-3 font-medium">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((v) => {
                  const config = statusConfig[v.status];
                  return (
                    <tr key={v.id} className="border-b border-gray-50 hover:bg-blue-50/30">
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{v.date} {v.time}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{v.property}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.customer}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.agent}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{v.note || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.style}`}>{config.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Past */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">過去の内見</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium">日時</th>
                <th className="px-4 py-3 font-medium">物件</th>
                <th className="px-4 py-3 font-medium">顧客</th>
                <th className="px-4 py-3 font-medium">担当</th>
                <th className="px-4 py-3 font-medium">備考</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {past.map((v) => {
                const config = statusConfig[v.status];
                return (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-blue-50/30">
                    <td className="px-4 py-3 text-sm font-mono text-gray-500">{v.date} {v.time}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{v.property}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{v.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{v.agent}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{v.note || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.style}`}>{config.label}</span>
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
