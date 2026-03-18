"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "bot" | "user";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "bot",
    content:
      "こんにちは！IeSearch AI機能リクエストBotです。\n\nどんな機能がほしいか教えてください。要件のヒアリングから開発・デプロイまでお手伝いします。\n\n例えば：\n・「内見後のお客様に自動でサンクスメールを送りたい」\n・「物件ごとの問い合わせ数をグラフで見たい」\n・「Googleドライブに契約書を自動保存したい」\n\n何でもお気軽にどうぞ！",
  },
];

const botResponses: Record<string, string[]> = {
  メール: [
    "メール関連の機能ですね！いくつか確認させてください。\n\n1. どのタイミングでメールを送りたいですか？\n   - 内見予約時\n   - 内見後\n   - 定期フォロー\n\n2. メールの内容はテンプレートを使いますか？それとも毎回カスタム？\n\n3. 送信先は顧客のメールアドレスですか？",
    "承知しました！以下の仕様で開発を進めますね。\n\n📋 **開発内容**\n- 内見完了後に自動サンクスメール送信\n- テンプレートはカスタマイズ可能\n- 物件情報を自動差し込み\n\n⏱ **推定開発時間**: 約15分\n💰 **月額プラン内**: 開発回数1回消費\n\n「開発を開始する」と言っていただければ、すぐに取りかかります！",
  ],
  グラフ: [
    "データの可視化ですね！確認です。\n\n1. どのデータをグラフにしたいですか？\n   - 問い合わせ数\n   - 内見予約数\n   - 成約率\n   - PV数\n\n2. 期間はどのくらいで表示しますか？（日次/週次/月次）\n\n3. ダッシュボードに追加する形でOKですか？",
    "了解です！以下で進めます。\n\n📋 **開発内容**\n- ダッシュボードに物件別問い合わせグラフを追加\n- 月次表示（過去12ヶ月分）\n- 棒グラフ＋推移線グラフ\n\n⏱ **推定開発時間**: 約20分\n💰 **月額プラン内**: 開発回数1回消費\n\n開発を始めてよろしいですか？",
  ],
  default: [
    "なるほど、面白い機能ですね！もう少し詳しく教えてください。\n\n1. その機能は誰が使いますか？（社内スタッフ？顧客？）\n2. どんな場面で使いたいですか？\n3. 既存のツールとの連携は必要ですか？\n\nできるだけ具体的に教えていただけると、より正確な見積もりが出せます！",
    "ありがとうございます！要件が見えてきました。\n\n📋 **開発内容を整理中...**\n\nAIエージェントが最適な実装方法を検討しています。\n数分後に開発計画をお見せしますので、少々お待ちください。\n\n（デモのためここまでとなります。実際のサービスではAIエージェントが自動で開発・デプロイまで行います）",
  ],
};

export default function RequestPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Determine which response set to use
    let responseSet = botResponses.default;
    if (userMessage.includes("メール") || userMessage.includes("mail")) {
      responseSet = botResponses["メール"];
    } else if (
      userMessage.includes("グラフ") ||
      userMessage.includes("分析") ||
      userMessage.includes("可視化")
    ) {
      responseSet = botResponses["グラフ"];
    }

    const idx = Math.min(responseIndex, responseSet.length - 1);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: responseSet[idx] },
      ]);
      setIsTyping(false);
      setResponseIndex((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          トップに戻る
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold">AI機能リクエスト</h1>
              <p className="text-sm text-blue-100">
                ほしい機能を伝えるだけ。AIが開発します。
              </p>
            </div>
            <Sparkles className="h-5 w-5 ml-auto animate-pulse-slow" />
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              } animate-fade-in`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "bot"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {msg.role === "bot" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "bot"
                    ? "bg-white border border-gray-200 text-gray-700"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="どんな機能がほしいですか？"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            デモ版: 実際のサービスではAIエージェントが開発・デプロイまで自動で行います
          </p>
        </div>
      </div>
    </div>
  );
}
