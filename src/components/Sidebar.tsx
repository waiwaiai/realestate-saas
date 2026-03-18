"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarCheck,
  FileText,
  BarChart3,
  Puzzle,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/properties", label: "物件管理", icon: Building2 },
  { href: "/customers", label: "顧客管理", icon: Users },
  { href: "/viewings", label: "内見管理", icon: CalendarCheck },
  { href: "/contracts", label: "契約管理", icon: FileText },
  { href: "/reports", label: "レポート", icon: BarChart3 },
  { type: "divider" as const, label: "カスタマイズ" },
  { href: "/custom", label: "カスタム機能", icon: Puzzle },
  { href: "/request", label: "AI機能リクエスト", icon: Bot },
  { type: "divider" as const, label: "システム" },
  { href: "/settings", label: "設定", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#1e293b] text-gray-300 flex flex-col z-50 transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <Building2 className="h-4.5 w-4.5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-base tracking-tight">
            IeSearch
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            if (collapsed) return <div key={i} className="my-3 border-t border-white/10" />;
            return (
              <div key={i} className="pt-4 pb-1 px-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            );
          }

          if (!("href" in item)) return null;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon!;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors group ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 font-medium"
                  : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-white/10 text-gray-500 hover:text-gray-300 transition-colors shrink-0"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
