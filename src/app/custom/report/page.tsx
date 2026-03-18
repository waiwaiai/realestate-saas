"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building2,
  Users,
  Printer,
  Mail,
} from "lucide-react";

const pastReports = [
  { month: "2026年3月", status: "generating", pages: null, generatedAt: null },
  { month: "2026年2月", status: "done", pages: 12, generatedAt: "2026-03-01 09:00" },
  { month: "2026年1月", status: "done", pages: 14, generatedAt: "2026-02-01 09:00" },
  { month: "2025年12月", status: "done", pages: 11, generatedAt: "2026-01-01 09:00" },
  { month: "2025年11月", status: "done", pages: 13, generatedAt: "2025-12-01 09:00" },
];

const reportSections = [
  { name: "エグゼクティブサマリー", included: true },
  { name: "物件掲載・成約状況", included: true },
  { name: "エリア別パフォーマンス", included: true },
  { name: "顧客獲得・対応分析", included: true },
  { name: "内見コンバージョン", included: true },
  { name: "売上・手数料明細", included: true },
  { name: "競合市場レポート", included: false },
  { name: "翌月アクションプラン", included: true },
];

export default function ReportModulePage() {
  const [selectedMonth, setSelectedMonth] = useState("2026年2月");
  const [sections, setSections] = useState(reportSections);

  const toggleSection = (index: number) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, included: !s.included } : s))
    );
  };

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
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">月次レポート自動生成</h1>
            <p className="text-sm text-gray-500">カスタム機能 · 導入日 2026-02-15</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
            今すぐ生成
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main: Report Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">レポートプレビュー</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {selectedMonth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors" title="印刷">
                  <Printer className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors" title="メール送信">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </button>
              </div>
            </div>

            {/* Simulated Report Content */}
            <div className="p-6 space-y-6 bg-gray-50/50">
              {/* Report Header */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Monthly Report</p>
                    <h3 className="text-lg font-bold text-gray-900">
                      東京不動産パートナーズ 月次レポート
                    </h3>
                    <p className="text-sm text-gray-500">対象期間: 2026年2月1日 〜 2月28日</p>
                  </div>
                  <div className="text-right">
                    <Building2 className="h-8 w-8 text-blue-600 ml-auto mb-1" />
                    <p className="text-xs text-gray-400">自動生成: 2026/03/01</p>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  エグゼクティブサマリー
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {[
                    { label: "売上", value: "¥590万", change: "+8.2%" },
                    { label: "成約数", value: "4件", change: "-33%" },
                    { label: "新規顧客", value: "28人", change: "+12%" },
                    { label: "内見実施", value: "38回", change: "+5.6%" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500">{kpi.label}</p>
                      <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
                      <p className={`text-xs font-medium ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {kpi.change}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  2月は売上が前月比+8.2%と好調に推移。港区・渋谷区エリアでの成約が売上を牽引。
                  一方、成約数は4件と前月の6件から減少。高額物件（1億円以上）の商談が3件進行中のため、
                  3月は成約増が期待される。内見数は堅調で、リード獲得チャネルの強化が奏功している。
                </p>
              </div>

              {/* Area Performance */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  エリア別パフォーマンス
                </h4>
                <div className="space-y-3">
                  {[
                    { area: "港区", inquiries: 42, viewings: 12, contracts: 2, revenue: 280 },
                    { area: "渋谷区", inquiries: 28, viewings: 8, contracts: 1, revenue: 180 },
                    { area: "世田谷区", inquiries: 18, viewings: 6, contracts: 1, revenue: 130 },
                    { area: "目黒区", inquiries: 15, viewings: 5, contracts: 0, revenue: 0 },
                    { area: "その他", inquiries: 12, viewings: 7, contracts: 0, revenue: 0 },
                  ].map((row) => (
                    <div key={row.area} className="flex items-center gap-4">
                      <span className="text-sm text-gray-700 w-20 shrink-0">{row.area}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(row.inquiries / 42) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500 shrink-0">
                        <span>問{row.inquiries}</span>
                        <span>見{row.viewings}</span>
                        <span className="font-medium text-gray-900">約{row.contracts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Acquisition */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  顧客獲得・対応分析
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "SUUMO経由", value: 12, pct: 43 },
                    { label: "HOME'S経由", value: 8, pct: 29 },
                    { label: "自社サイト", value: 5, pct: 18 },
                  ].map((ch) => (
                    <div key={ch.label} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{ch.value}人</p>
                      <p className="text-xs text-gray-500">{ch.label}</p>
                      <p className="text-xs text-blue-600 font-medium">{ch.pct}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-xs text-gray-400">
                — レポート全12ページ中、プレビュー表示 —
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">生成設定</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">自動生成スケジュール</label>
                <select className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm">
                  <option>毎月1日 09:00</option>
                  <option>毎月1日 00:00</option>
                  <option>毎月末日</option>
                  <option>手動のみ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">送信先メール</label>
                <input
                  type="email"
                  defaultValue="tanaka@tokyo-fudosan.co.jp"
                  className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">出力形式</label>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-medium">
                    PDF
                  </button>
                  <button className="px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-md">
                    Excel
                  </button>
                  <button className="px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-md">
                    CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sections Toggle */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">含めるセクション</h3>
            <div className="space-y-2">
              {sections.map((section, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.included}
                    onChange={() => toggleSection(i)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className={`text-sm ${section.included ? "text-gray-700" : "text-gray-400"}`}>
                    {section.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Past Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">過去のレポート</h3>
            <div className="space-y-2">
              {pastReports.map((r) => (
                <button
                  key={r.month}
                  onClick={() => r.status === "done" && setSelectedMonth(r.month)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
                    selectedMonth === r.month
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {r.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm text-gray-700">{r.month}</span>
                  </div>
                  {r.status === "done" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{r.pages}P</span>
                      <Download className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                  ) : (
                    <span className="text-xs text-yellow-600">生成中...</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
