"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-blue-600">
            <Building2 className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight">
              IeSearch
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/properties" className="hover:text-blue-600 transition-colors">
              物件検索
            </Link>
            <Link href="/properties?type=sale" className="hover:text-blue-600 transition-colors">
              購入
            </Link>
            <Link href="/properties?type=rent" className="hover:text-blue-600 transition-colors">
              賃貸
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
              マーケット
            </Link>
            <Link href="/custom" className="hover:text-blue-600 transition-colors">
              カスタム
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/request"
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              AI機能リクエスト
            </Link>
            <Link
              href="/properties"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              物件を探す
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-2 text-sm font-medium text-gray-600">
            <Link href="/properties" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              物件検索
            </Link>
            <Link href="/properties?type=sale" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              購入
            </Link>
            <Link href="/properties?type=rent" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              賃貸
            </Link>
            <Link href="/dashboard" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              マーケット
            </Link>
            <Link href="/custom" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              カスタム
            </Link>
            <Link href="/request" className="py-2 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
              AI機能リクエスト
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
