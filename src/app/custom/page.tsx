"use client";

import { useState } from "react";
import {
  Puzzle,
  Plus,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  Lock,
  Code,
  ExternalLink,
} from "lucide-react";

const installedModules = [
  {
    id: "report",
    name: "月次レポート自動生成",
    description: "物件データから月次レポートを自動生成。PDF出力対応。",
    icon: FileText,
    status: "active" as const,
    installedAt: "2026-02-15",
  },
  {
    id: "analytics",
    name: "内見データ分析",
    description: "内見の予約率・成約率を可視化。改善ポイントを自動提案。",
    icon: BarChart3,
    status: "active" as const,
    installedAt: "2026-03-01",
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
  const [activeTab, setActiveTab] = useState<"installed" | "marketplace">(
    "installed"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Puzzle className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              カスタムページ
            </h1>
            <p className="text-gray-500 text-sm">
              あなた専用の機能エリア。自由に追加・カスタマイズできます。
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border border-purple-100">
        <div className="flex items-start gap-4">
          <Code className="h-6 w-6 text-purple-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              このエリアはあなた専用です
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              コア機能（物件管理・検索・ダッシュボード）はそのまま。
              このカスタムエリアでは独自機能の追加・編集が自由にできます。
              WebViewで完全分離されているため、本体システムに影響はありません。
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                今月の残り開発回数: 7/10回
              </span>
              <span className="text-xs text-gray-500">
                プロフェッショナルプラン
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
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
          追加できる機能
        </button>
      </div>

      {activeTab === "installed" ? (
        <div className="space-y-4">
          {installedModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <mod.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {mod.name}
                    </h3>
                    <p className="text-sm text-gray-500">{mod.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      導入日: {mod.installedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    稼働中
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    開く <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Custom development CTA */}
          <button className="w-full bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-blue-400 hover:bg-blue-50/30 transition-colors group">
            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-blue-500">
              <Plus className="h-8 w-8" />
              <span className="font-medium">
                新しい機能をAIにリクエストする
              </span>
              <span className="text-xs">
                「こんな機能がほしい」を伝えるだけでOK
              </span>
            </div>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                <mod.icon className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{mod.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{mod.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    mod.difficulty === "簡単"
                      ? "bg-green-100 text-green-700"
                      : mod.difficulty === "中程度"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {mod.difficulty}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  導入する
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
