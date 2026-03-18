"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import BuildingAnimation from "@/components/BuildingAnimation";

// ── Types ──────────────────────────────────────────────
interface Message {
  role: "bot" | "user" | "system";
  content: string;
  timestamp: string;
}

interface RequestForm {
  module: string;
  action: string;
  detail: string;
  priority: string;
  reference: string;
}

// ── Constants ──────────────────────────────────────────
const modules = [
  { value: "properties", label: "物件管理", desc: "物件の登録・編集・一覧表示に関する機能" },
  { value: "customers", label: "顧客管理", desc: "顧客情報・ランク・対応履歴に関する機能" },
  { value: "viewings", label: "内見管理", desc: "内見スケジュール・履歴に関する機能" },
  { value: "contracts", label: "契約管理", desc: "契約書の作成・署名・管理に関する機能" },
  { value: "reports", label: "レポート", desc: "売上・分析・データ可視化に関する機能" },
  { value: "dashboard", label: "ダッシュボード", desc: "トップ画面のKPI・通知に関する機能" },
  { value: "integration", label: "外部連携", desc: "Googleドライブ・Slack・SUUMO等との連携" },
  { value: "other", label: "その他・新規", desc: "上記に当てはまらない新しい機能" },
];

const actions = [
  { value: "add", label: "機能を追加したい" },
  { value: "modify", label: "既存機能を変更したい" },
  { value: "fix", label: "不具合を直したい" },
  { value: "automate", label: "自動化したい" },
  { value: "design", label: "見た目を変えたい" },
];

const priorities = [
  { value: "high", label: "急ぎ", color: "text-red-600 bg-red-50 border-red-200" },
  { value: "medium", label: "通常", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  { value: "low", label: "余裕あり", color: "text-green-600 bg-green-50 border-green-200" },
];

// ── Component ──────────────────────────────────────────
export default function RequestPage() {
  const [step, setStep] = useState<"form" | "chat">("form");
  const [form, setForm] = useState<RequestForm>({
    module: "",
    action: "",
    detail: "",
    priority: "medium",
    reference: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const now = () => new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send message to OpenClaw ──
  const sendToAgent = useCallback(
    async (text: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, sessionId }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || data.error || "Agent error");
        }

        if (data.sessionId) setSessionId(data.sessionId);

        // Show each payload as a separate chat bubble
        const payloads: string[] = data.payloads || [data.reply];
        const botMessages: Message[] = payloads.map((text: string) => ({
          role: "bot" as const,
          content: text,
          timestamp: now(),
        }));
        setMessages((prev) => [...prev, ...botMessages]);
      } catch (err: unknown) {
        const e = err as Error;
        setError(e.message);
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `うまくつながりませんでした。しばらくしてからもう一度お試しください。（${e.message}）`,
            timestamp: now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  // ── Submit form → start chat ──
  const handleFormSubmit = async () => {
    if (!form.module || !form.action || !form.detail) return;

    const selectedModule = modules.find((m) => m.value === form.module);
    const selectedAction = actions.find((a) => a.value === form.action);

    const prompt = [
      `【IeSearch 不動産SaaS カスタム機能リクエスト】`,
      ``,
      `■ 対象モジュール: ${selectedModule?.label}（${selectedModule?.desc}）`,
      `■ やりたいこと: ${selectedAction?.label}`,
      `■ 詳細:`,
      form.detail,
      `■ 優先度: ${priorities.find((p) => p.value === form.priority)?.label}`,
      form.reference ? `■ 参考・補足: ${form.reference}` : "",
      ``,
      `上記の要件を理解した上で、以下を行ってください:`,
      `1. 要件の確認・不明点があれば質問`,
      `2. 実装方針の提案`,
      `3. ユーザーの承認後、実装を開始`,
      ``,
      `対象リポジトリ: ~/dev/realestate-saas`,
      `技術スタック: Next.js 16 (App Router) + Tailwind CSS + TypeScript`,
      `実装後はビルド確認まで行ってください。`,
    ]
      .filter(Boolean)
      .join("\n");

    setStep("chat");
    setMessages([
      {
        role: "user",
        content: `【${selectedModule?.label}】${selectedAction?.label}\n\n${form.detail}`,
        timestamp: now(),
      },
    ]);

    await sendToAgent(prompt);
  };

  // ── Send chat message ──
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: now() }]);
    await sendToAgent(text);
  };

  // ── Form validation ──
  const isFormValid = form.module && form.action && form.detail.trim().length > 0;

  // ── Render ──
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">AI機能リクエスト</h1>
          <p className="text-sm text-gray-500">
            {step === "form"
              ? "まず、リクエスト内容を入力してください"
              : "AIアシスタントとやりとりしています"}
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            step === "form"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {step === "chat" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              1
            </span>
          )}
          リクエスト入力
        </div>
        <ArrowRight className="h-4 w-4 text-gray-300" />
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            step === "chat"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
              step === "chat"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-white"
            }`}
          >
            2
          </span>
          AIとやりとり &amp; 作成
        </div>
      </div>

      {step === "form" ? (
        /* ─── STEP 1: Structured Form ─── */
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Module */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              どの機能に関するリクエストですか？ <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modules.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setForm((f) => ({ ...f, module: m.value }))}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    form.module === m.value
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{m.label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {m.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              何をしたいですか？ <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {actions.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setForm((f) => ({ ...f, action: a.value }))}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    form.action === a.value
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              具体的にどうしたいですか？ <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="例: 物件一覧ページで、お気に入りボタンを押したら顧客ごとにブックマークを保存できるようにしたい。一覧画面にもハートマークを表示して、フィルターでお気に入りだけ絞り込めるようにしてほしい。"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              value={form.detail}
              onChange={(e) =>
                setForm((f) => ({ ...f, detail: e.target.value }))
              }
            />
            <p className="text-xs text-gray-400 mt-1">
              できるだけ具体的に書いてください。AIが追加で質問することもあります。
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              優先度
            </label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  onClick={() =>
                    setForm((f) => ({ ...f, priority: p.value }))
                  }
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    form.priority === p.value
                      ? p.color + " ring-1 ring-current"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              参考情報・補足（任意）
            </label>
            <textarea
              rows={2}
              placeholder="参考にしたいサービスのURL、スクリーンショットの説明、技術的な希望など..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              value={form.reference}
              onChange={(e) =>
                setForm((f) => ({ ...f, reference: e.target.value }))
              }
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              <Sparkles className="inline h-3 w-3 mr-1" />
              送信後、AIアシスタントが内容を確認し、機能を作成します
            </p>
            <button
              onClick={handleFormSubmit}
              disabled={!isFormValid}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              AIアシスタントに送信
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ─── STEP 2: Chat with OpenClaw ─── */
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold">イエサーチくん</p>
                <p className="text-[11px] text-blue-100">
                  {isLoading ? "回答を考えています..." : "対応できます"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setStep("form");
                setMessages([]);
                setSessionId(null);
              }}
              className="flex items-center gap-1 text-xs text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              新規リクエスト
            </button>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-5 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                } animate-fade-in`}
              >
                {msg.role !== "system" && (
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "bot"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="h-3.5 w-3.5" />
                    ) : (
                      <User className="h-3.5 w-3.5" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white border border-gray-200 text-gray-700"
                      : msg.role === "system"
                        ? "bg-red-50 border border-red-200 text-red-700 mx-auto max-w-none text-center text-xs"
                        : "bg-blue-600 text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <p
                    className={`text-[10px] mt-1.5 ${
                      msg.role === "user"
                        ? "text-blue-200"
                        : msg.role === "system"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="animate-fade-in">
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4">
                  <BuildingAnimation />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="追加の要件や質問を入力..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && handleSend()}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] text-gray-400">
                AIアシスタントがあなたの要望に合わせて機能を作ります
              </p>
              <p className="text-[11px] text-gray-400">
                今月あと7回利用できます
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
