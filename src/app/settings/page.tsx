"use client";

import {
  Building,
  Users,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Globe,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "company", label: "会社情報", icon: Building },
  { id: "members", label: "メンバー", icon: Users },
  { id: "security", label: "セキュリティ", icon: Shield },
  { id: "notifications", label: "通知", icon: Bell },
  { id: "appearance", label: "表示", icon: Palette },
  { id: "api", label: "API連携", icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">設定</h1>
        <p className="text-sm text-gray-500">システム設定・アカウント管理</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <nav className="w-48 shrink-0 space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "company" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-900">会社情報</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
                  <input type="text" defaultValue="東京不動産パートナーズ株式会社" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">宅建業免許番号</label>
                  <input type="text" defaultValue="東京都知事(3)第12345号" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                  <input type="text" defaultValue="03-1234-5678" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                  <input type="email" defaultValue="info@tokyo-fudosan.co.jp" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
                  <input type="text" defaultValue="東京都港区南青山3-15-8 青山ビル5F" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  保存する
                </button>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">メンバー管理</h2>
                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg">
                  メンバーを招待
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "田中 太郎", email: "tanaka@tokyo-fudosan.co.jp", role: "管理者", active: true },
                  { name: "佐藤 花子", email: "sato@tokyo-fudosan.co.jp", role: "営業", active: true },
                  { name: "鈴木 一郎", email: "suzuki@tokyo-fudosan.co.jp", role: "営業", active: true },
                  { name: "山田 美咲", email: "yamada@tokyo-fudosan.co.jp", role: "事務", active: false },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${m.active ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                        {m.active ? "有効" : "無効"}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{m.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-900">セキュリティ設定</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">IPアドレス制限</p>
                    <p className="text-xs text-gray-500 mt-0.5">許可されたIPからのみアクセスを許可</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">有効</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">二要素認証</p>
                    <p className="text-xs text-gray-500 mt-0.5">全メンバーに2FAを必須化</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">有効</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">監査ログ</p>
                    <p className="text-xs text-gray-500 mt-0.5">すべての操作ログを90日間保存</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">有効</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SSO連携</p>
                    <p className="text-xs text-gray-500 mt-0.5">SAML/OIDCによるシングルサインオン</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">未設定</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-900">通知設定</h2>
              <div className="space-y-4">
                {[
                  { label: "新規問い合わせ", desc: "物件への問い合わせがあった時", enabled: true },
                  { label: "内見予約", desc: "内見の予約・変更・キャンセル時", enabled: true },
                  { label: "契約更新", desc: "契約ステータスが変更された時", enabled: true },
                  { label: "物件掲載期限", desc: "掲載期限が近づいた時（7日前）", enabled: true },
                  { label: "顧客フォロー", desc: "未対応の顧客がいる時（3日経過）", enabled: false },
                  { label: "週次レポート", desc: "毎週月曜にサマリーを送信", enabled: false },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{n.label}</p>
                      <p className="text-xs text-gray-500">{n.desc}</p>
                    </div>
                    <button
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        n.enabled ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          n.enabled ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-900">表示設定</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">テーマカラー</label>
                  <div className="flex gap-3">
                    {["bg-blue-600", "bg-indigo-600", "bg-green-600", "bg-purple-600", "bg-gray-800"].map((c) => (
                      <button
                        key={c}
                        className={`w-8 h-8 ${c} rounded-full ${c === "bg-blue-600" ? "ring-2 ring-offset-2 ring-blue-600" : ""}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">表示密度</label>
                  <select className="px-3 py-2 rounded-md border border-gray-200 text-sm">
                    <option>標準</option>
                    <option>コンパクト</option>
                    <option>ゆったり</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">1ページあたりの表示件数</label>
                  <select className="px-3 py-2 rounded-md border border-gray-200 text-sm">
                    <option>20件</option>
                    <option>50件</option>
                    <option>100件</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-900">API連携</h2>
              <div className="space-y-4">
                {[
                  { name: "SUUMO連携", status: "connected", icon: Globe },
                  { name: "HOME'S連携", status: "connected", icon: Globe },
                  { name: "Googleドライブ", status: "disconnected", icon: Database },
                  { name: "Slack通知", status: "disconnected", icon: Bell },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <api.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{api.name}</span>
                    </div>
                    {api.status === "connected" ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">接続済</span>
                        <button className="text-xs text-red-600 hover:text-red-700">切断</button>
                      </div>
                    ) : (
                      <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg">
                        接続する
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
