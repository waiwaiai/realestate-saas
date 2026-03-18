import Link from "next/link";
import {
  Search,
  Building2,
  TrendingUp,
  Shield,
  Bot,
  Puzzle,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

export default function Home() {
  const featured = properties.filter((p) => p.status === "available").slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI搭載 &middot; 顧客が育てるSaaS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              理想の住まいを、
              <br />
              もっと簡単に。
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
              IeSearchは不動産業務を効率化するSaaSプラットフォーム。
              物件管理から顧客対応まで一元化。さらに、あなた自身で機能をカスタマイズできます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Search className="h-5 w-5" />
                物件を探す
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                <Puzzle className="h-5 w-5" />
                カスタム機能を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "掲載物件数", value: "12,400+", color: "text-blue-600" },
              { label: "月間PV", value: "850万", color: "text-green-600" },
              { label: "成約実績", value: "3,200+", color: "text-purple-600" },
              { label: "導入企業", value: "180社", color: "text-orange-600" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              注目の物件
            </h2>
            <p className="text-gray-500 mt-1">最新の厳選物件をご紹介</p>
          </div>
          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700"
          >
            すべて見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="sm:hidden text-center mt-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-blue-600 font-medium"
          >
            すべての物件を見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Unique Value: Customer-Grown SaaS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              IeSearchだけの新コンセプト
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              顧客自身が育てるSaaS
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              必要な機能を、あなた自身で追加できる。AIエージェントが開発からデプロイまで自動で行います。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <Puzzle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                カスタムページ
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                コア機能はそのまま。独自機能を自由に追加できる専用エリアをご用意。
                WebViewで安全に分離されているので、本体に影響なし。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI機能リクエスト
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                「こんな機能がほしい」と伝えるだけ。AIがヒアリング→要件定義→開発→デプロイまで自動で実行。
                IT人材不要で機能改善。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                安全なインフラ
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                顧客ごとにサーバを完全分離。VPS IPアドレス制限で情報漏洩リスクを最小化。
                インフラ構築はすべてお任せ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            カスタマイズの流れ
          </h2>
          <p className="text-gray-500">3ステップであなただけの機能を</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "機能をリクエスト",
              desc: "SaaS内のAI Botに「こんな機能がほしい」と伝えるだけ。AIが要件をヒアリングします。",
              icon: Bot,
            },
            {
              step: "02",
              title: "AIが自動開発",
              desc: "AIエージェントが設計・実装・テスト・デプロイまで自動実行。人間の開発者は不要。",
              icon: Wrench,
            },
            {
              step: "03",
              title: "すぐに使える",
              desc: "開発完了後、即座に利用開始。月ごとの編集上限内なら追加費用なし。",
              icon: Sparkles,
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-6xl font-black text-blue-100 mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <item.icon className="h-5 w-5 text-blue-600" />
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Standard Features */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">標準機能</h2>
            <p className="text-gray-400">
              すべてのプランに含まれるコア機能
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, label: "物件検索・絞り込み", desc: "エリア・価格・条件で瞬時に検索" },
              { icon: Building2, label: "物件管理", desc: "写真・間取り・情報を一元管理" },
              { icon: TrendingUp, label: "マーケット分析", desc: "相場・トレンドをリアルタイム把握" },
              { icon: Shield, label: "セキュリティ", desc: "IP制限・暗号化・監査ログ" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <feature.icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-1">{feature.label}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            料金プラン
          </h2>
          <p className="text-gray-500">ビジネス規模に合わせて選べる3プラン</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "スタンダード",
              price: "49,800",
              desc: "小規模不動産会社向け",
              features: [
                "物件掲載 500件まで",
                "基本検索・フィルター",
                "マーケットダッシュボード",
                "メールサポート",
                "カスタム開発 月3回まで",
              ],
              highlight: false,
            },
            {
              name: "プロフェッショナル",
              price: "128,000",
              desc: "成長企業に最適",
              features: [
                "物件掲載 無制限",
                "AI物件レコメンド",
                "API連携",
                "優先サポート",
                "カスタム開発 月10回まで",
                "Googleドライブ連携",
              ],
              highlight: true,
            },
            {
              name: "エンタープライズ",
              price: "お問合せ",
              desc: "大手法人・チェーン向け",
              features: [
                "すべてのPro機能",
                "専用サーバー",
                "IP制限・VPN対応",
                "カスタム開発 無制限",
                "専任カスタマーサクセス",
                "SLA保証 99.9%",
              ],
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.highlight
                  ? "border-blue-600 bg-blue-600 text-white shadow-xl scale-105"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
                  人気No.1
                </span>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  {plan.price.includes("お問合せ") ? "" : "¥"}
                  {plan.price}
                </span>
                {!plan.price.includes("お問合せ") && (
                  <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                    /月（税別）
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? "text-blue-200" : "text-blue-600"}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.price.includes("お問合せ") ? "お問い合わせ" : "無料で始める"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            あなたのビジネスに合わせて進化するSaaS
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            導入後もAIが機能開発をサポート。IT人材不要で、必要な機能をその場で追加。
            他社SaaSでは実現できない、あなただけのシステムを。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Bot className="h-5 w-5" />
              AI機能リクエストを試す
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              デモを見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
