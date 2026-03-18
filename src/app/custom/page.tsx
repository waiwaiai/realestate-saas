"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  Lock,
  Code,
  ExternalLink,
  Bot,
  ArrowRight,
} from "lucide-react";

const installedModules = [
  {
    id: "report",
    name: "月次レポート自動生成",
    description: "物件データから月次レポートを自動生成。PDF出力対応。",
    icon: FileText,
    status: "active" as const,
    installedAt: "2026-02-15",
    usageCount: 24,
  },
  {
    id: "analytics",
    name: "内見データ分析",
    description: "内見の予約率・成約率を可視化。改善ポイントを自動提案。",
    icon: BarChart3,
    status: "active" as const,
    installedAt: "2026-03-01",
    usageCount: 12,
  },
];

const availableModules = [
  {
    id: "email",
    name: "自動フォローメール",
    description: "内見後の自動フォローアップメール。テンプレート編集可能。",
    icon: Mail,
    difficulty: "簡単",
  },
  {
    id: "calendar",
    name: "内見スケジュール連携",
    description: "Google/Outlookカレンダーと連携。ダブルブッキング防止。",
    icon: Calendar,
    difficulty: "中程度",
  },
  {
    id: "contract",
    name: "電子契約連携",
    description: "クラウドサインと連携。契約書の送付・署名をワンクリックで。",
    icon: Lock,
    difficulty: "要相談",
  },
];

export default function CustomPage() {
  const [activeTab, setActiveTab] = useState<"installed" | "marketplace">("installed");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">カスタム機能</h1>
          <p className="text-sm text-gray-500">あなた専用の拡張機能エリア</p>
        </div>
        <Link
          href="/request"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Bot className="h-4 w-4" />
          新しい機能をリクエスト
        </Link>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
        <div className="flex items-start gap-3">
          <Code className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              コア機能（物件管理・顧客管理・契約管理）はそのまま。
              このエリアでは独自機能の追加・編集が自由にできます。
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                今月の残り開発回数: 7/10回
              </span>
              <span className="text-xs text-gray-500">プロフェッショナルプラン</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("installed")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "installed"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          導入済み ({installedModules.length})
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "marketplace"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          テンプレート
        </button>
      </div>

      {activeTab === "installed" ? (
        <div className="space-y-3">
          {installedModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <mod.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{mod.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{mod.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>導入日: {mod.installedAt}</span>
                      <span>利用回数: {mod.usageCount}回</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    稼働中
                  </span>
                  <Link
                    href={`/custom/${mod.id}`}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    開く <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/request"
            className="block w-full bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50/30 transition-colors group text-center"
          >
            <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
              AIに新しい機能を作ってもらう
            </p>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                <mod.icon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{mod.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{mod.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    mod.difficulty === "簡単"
                      ? "bg-green-100 text-green-700"
                      : mod.difficulty === "中程度"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {mod.difficulty}
                </span>
                <Link
                  href="/request"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  導入する <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
