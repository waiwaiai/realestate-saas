import { Building2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Building2 className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">IeSearch</span>
            </div>
            <p className="text-sm text-gray-400">
              理想の住まいを、もっと簡単に。
              AI搭載の不動産検索プラットフォーム。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">物件を探す</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/properties?type=sale" className="hover:text-white transition-colors">購入物件</Link></li>
              <li><Link href="/properties?type=rent" className="hover:text-white transition-colors">賃貸物件</Link></li>
              <li><Link href="/properties?propertyType=mansion" className="hover:text-white transition-colors">マンション</Link></li>
              <li><Link href="/properties?propertyType=house" className="hover:text-white transition-colors">一戸建て</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">マーケットデータ</Link></li>
              <li><span className="text-gray-500">AI物件提案（準備中）</span></li>
              <li><span className="text-gray-500">ローンシミュレーション（準備中）</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-500">会社概要</span></li>
              <li><span className="text-gray-500">利用規約</span></li>
              <li><span className="text-gray-500">プライバシーポリシー</span></li>
              <li><span className="text-gray-500">お問い合わせ</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; 2026 IeSearch. All rights reserved. This is a demo application.
        </div>
      </div>
    </footer>
  );
}
