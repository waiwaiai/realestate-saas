"use client";

import { Bell, Search, HelpCircle, Building } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="物件・顧客を検索..."
            className="pl-9 pr-4 py-1.5 w-72 rounded-md border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Building className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900 leading-tight">東京不動産</p>
            <p className="text-xs text-gray-500 leading-tight">管理者</p>
          </div>
        </div>
      </div>
    </header>
  );
}
