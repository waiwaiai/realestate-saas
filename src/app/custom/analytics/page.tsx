"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Clock,
  Target,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

const weeklyViewings = [
  { week: "3/3週", total: 12, converted: 3, cancelled: 1 },
  { week: "3/2週", total: 10, converted: 2, cancelled: 0 },
  { week: "3/1週", total: 8, converted: 1, cancelled: 2 },
  { week: "2/4週", total: 11, converted: 4, cancelled: 1 },
  { week: "2/3週", total: 9, converted: 2, cancelled: 0 },
  { week: "2/2週", total: 7, converted: 1, cancelled: 1 },
];

const agentPerformance = [
  { name: "田中 太郎", viewings: 18, conversions: 5, rate: 27.8, avgTime: 42 },
  { name: "佐藤 花子", viewings: 14, conversions: 3, rate: 21.4, avgTime: 38 },
  { name: "鈴木 一郎", viewings: 12, conversions: 3, rate: 25.0, avgTime: 45 },
  { name: "山田 美咲", viewings: 8, conversions: 1, rate: 12.5, avgTime: 35 },
];

const timeSlotData = [
  { slot: "09:00-10:00", count: 3, convRate: 15 },
  { slot: "10:00-11:00", count: 8, convRate: 28 },
  { slot: "11:00-12:00", count: 6, convRate: 22 },
  { slot: "13:00-14:00", count: 10, convRate: 35 },
  { slot: "14:00-15:00", count: 12, convRate: 32 },
  { slot: "15:00-16:00", count: 9, convRate: 25 },
  { slot: "16:00-17:00", count: 5, convRate: 18 },
];

const propertyTypeConversion = [
  { type: "マンション", viewings: 24, conversions: 6, rate: 25.0 },
  { type: "一戸建て", viewings: 15, conversions: 4, rate: 26.7 },
  { type: "アパート", viewings: 8, conversions: 1, rate: 12.5 },
  { type: "オフィス", viewings: 5, conversions: 1, rate: 20.0 },
];

const aiInsights = [
  {
    type: "positive",
    title: "13:00-15:00の内見が最も成約率が高い",
    detail: "この時間帯の成約率は33.5%。午前中の20.8%と比較して+12.7pt。午後の枠を優先的に埋めることを推奨。",
  },
  {
    type: "warning",
    title: "アパート物件の成約率が低下傾向",
    detail: "直近3ヶ月で12.5%→10.2%に低下。価格帯の見直しか、ターゲット層の再検討を推奨。",
  },
  {
    type: "positive",
    title: "2回目の内見で成約率が大幅向上",
    detail: "1回内見: 成約率8.2%、2回内見: 成約率42.3%。初回内見後のフォロー強化で2回目を促すことが鍵。",
  },
  {
    type: "info",
    title: "港区エリアの平均内見回数が増加",
    detail: "2.8回/成約（前月2.3回）。高額物件の慎重な検討傾向。焦らず丁寧な対応が成約に繋がる。",
  },
];

export default function AnalyticsModulePage() {
  const [period, setPeriod] = useState("month");
  const maxSlotCount = Math.max(...timeSlotData.map((t) => t.count));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/custom"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">内見データ分析</h1>
            <p className="text-sm text-gray-500">カスタム機能 · 導入日 2026-03-01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {[
              { key: "week", label: "週" },
              { key: "month", label: "月" },
              { key: "quarter", label: "四半期" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  period === p.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "内見総数", value: "52", change: "+14.3%", up: true, icon: Calendar },
          { label: "成約率", value: "23.1%", change: "+2.8pt", up: true, icon: Target },
          { label: "平均内見時間", value: "41分", change: "-3分", up: true, icon: Clock },
          { label: "キャンセル率", value: "5.8%", change: "-1.2pt", up: true, icon: Users },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-600">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          AI分析インサイト
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-start gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    insight.type === "positive"
                      ? "bg-green-500"
                      : insight.type === "warning"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{insight.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">週別内見推移</h2>
          <div className="space-y-3">
            {weeklyViewings.map((w) => (
              <div key={w.week} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-14 shrink-0 font-mono">{w.week}</span>
                <div className="flex-1 flex gap-0.5">
                  <div
                    className="h-6 bg-blue-500 rounded-l"
                    style={{ width: `${(w.converted / w.total) * 100}%` }}
                    title={`成約 ${w.converted}件`}
                  />
                  <div
                    className="h-6 bg-blue-200"
                    style={{ width: `${((w.total - w.converted - w.cancelled) / w.total) * 100}%` }}
                    title={`継続中 ${w.total - w.converted - w.cancelled}件`}
                  />
                  {w.cancelled > 0 && (
                    <div
                      className="h-6 bg-red-200 rounded-r"
                      style={{ width: `${(w.cancelled / w.total) * 100}%` }}
                      title={`キャンセル ${w.cancelled}件`}
                    />
                  )}
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{w.total}件</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded inline-block" /> 成約</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-200 rounded inline-block" /> 継続中</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-200 rounded inline-block" /> キャンセル</span>
          </div>
        </div>

        {/* Time Slot Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">時間帯別内見数 &amp; 成約率</h2>
          <div className="space-y-2.5">
            {timeSlotData.map((t) => (
              <div key={t.slot} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 shrink-0 font-mono">{t.slot}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(t.count / maxSlotCount) * 100}%` }}
                  >
                    {t.count >= 5 && (
                      <span className="text-[10px] font-medium text-white">{t.count}件</span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-medium w-10 text-right ${
                    t.convRate >= 30 ? "text-green-600" : t.convRate >= 20 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {t.convRate}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            ※ 成約率が高い時間帯ほど優先的に内見を組むと効率UP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">担当者別パフォーマンス</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-5 py-2.5 font-medium">担当者</th>
                <th className="px-5 py-2.5 font-medium text-right">内見数</th>
                <th className="px-5 py-2.5 font-medium text-right">成約数</th>
                <th className="px-5 py-2.5 font-medium text-right">成約率</th>
                <th className="px-5 py-2.5 font-medium text-right">平均時間</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((a) => (
                <tr key={a.name} className="border-b border-gray-50 hover:bg-blue-50/30">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{a.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 text-right">{a.viewings}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900 text-right">{a.conversions}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        a.rate >= 25
                          ? "bg-green-50 text-green-700"
                          : a.rate >= 20
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {a.rate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 text-right">{a.avgTime}分</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Property Type Conversion */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">物件タイプ別成約率</h2>
          </div>
          <div className="p-5 space-y-4">
            {propertyTypeConversion.map((p) => (
              <div key={p.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{p.type}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-500">{p.viewings}内見 → {p.conversions}成約</span>
                    <span
                      className={`font-bold ${
                        p.rate >= 25 ? "text-green-600" : p.rate >= 20 ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {p.rate.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      p.rate >= 25
                        ? "bg-green-500"
                        : p.rate >= 20
                          ? "bg-blue-500"
                          : "bg-gray-400"
                    }`}
                    style={{ width: `${p.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Lightbulb className="h-3 w-3 text-amber-500" />
              一戸建ての成約率が最も高い傾向。高額でも成約に繋がりやすい。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
