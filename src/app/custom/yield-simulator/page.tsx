"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  TrendingUp,
  Building2,
  Percent,
  Wallet,
  ReceiptText,
  RotateCcw,
  Lightbulb,
} from "lucide-react";

interface SimInputs {
  propertyPrice: string;
  monthlyRent: string;
  managementFee: string;
  propertyTax: string;
  insurance: string;
  managementCommissionRate: string;
  vacancyRate: string;
}

const defaultInputs: SimInputs = {
  propertyPrice: "3000",
  monthlyRent: "15",
  managementFee: "1.5",
  propertyTax: "30",
  insurance: "5",
  managementCommissionRate: "5",
  vacancyRate: "5",
};

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatManYen(val: number): string {
  return val.toLocaleString("ja-JP", { maximumFractionDigits: 1 });
}

export default function YieldSimulatorPage() {
  const [inputs, setInputs] = useState<SimInputs>(defaultInputs);

  const update = (key: keyof SimInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const result = useMemo(() => {
    const price = parseNum(inputs.propertyPrice);
    const monthlyRent = parseNum(inputs.monthlyRent);
    const managementFee = parseNum(inputs.managementFee);
    const propertyTax = parseNum(inputs.propertyTax);
    const insurance = parseNum(inputs.insurance);
    const commissionRate = parseNum(inputs.managementCommissionRate) / 100;
    const vacancyRate = parseNum(inputs.vacancyRate) / 100;

    const annualGrossRent = monthlyRent * 12;
    const annualEffectiveRent = annualGrossRent * (1 - vacancyRate);

    const annualManagementFee = managementFee * 12;
    const annualCommission = annualEffectiveRent * commissionRate;
    const totalAnnualExpenses =
      annualManagementFee + propertyTax + insurance + annualCommission;

    const netIncome = annualEffectiveRent - totalAnnualExpenses;

    const grossYield = price > 0 ? (annualGrossRent / price) * 100 : 0;
    const netYield = price > 0 ? (netIncome / price) * 100 : 0;

    return {
      annualGrossRent,
      annualEffectiveRent,
      annualManagementFee,
      annualCommission,
      propertyTax,
      insurance,
      totalAnnualExpenses,
      netIncome,
      grossYield,
      netYield,
    };
  }, [inputs]);

  const yieldLevel = (rate: number) => {
    if (rate >= 8) return { label: "高利回り", color: "bg-green-50 text-green-700" };
    if (rate >= 5) return { label: "標準", color: "bg-blue-50 text-blue-700" };
    if (rate > 0) return { label: "低利回り", color: "bg-amber-50 text-amber-700" };
    return { label: "—", color: "bg-gray-50 text-gray-500" };
  };

  const grossLevel = yieldLevel(result.grossYield);
  const netLevel = yieldLevel(result.netYield);

  const inputFields: {
    key: keyof SimInputs;
    label: string;
    unit: string;
    placeholder: string;
  }[] = [
    { key: "propertyPrice", label: "物件価格", unit: "万円", placeholder: "3000" },
    { key: "monthlyRent", label: "月額賃料", unit: "万円", placeholder: "15" },
    { key: "managementFee", label: "管理費・修繕積立金（月額）", unit: "万円", placeholder: "1.5" },
    { key: "propertyTax", label: "固定資産税（年額）", unit: "万円", placeholder: "30" },
    { key: "insurance", label: "火災保険料（年額）", unit: "万円", placeholder: "5" },
    { key: "managementCommissionRate", label: "管理委託手数料", unit: "％", placeholder: "5" },
    { key: "vacancyRate", label: "想定空室率", unit: "％", placeholder: "5" },
  ];

  const expenseBreakdown = [
    { label: "管理費・修繕積立金", value: result.annualManagementFee, color: "bg-blue-500" },
    { label: "固定資産税", value: result.propertyTax, color: "bg-amber-500" },
    { label: "火災保険料", value: result.insurance, color: "bg-purple-500" },
    { label: "管理委託手数料", value: result.annualCommission, color: "bg-pink-500" },
  ];
  const maxExpense = Math.max(...expenseBreakdown.map((e) => e.value), 1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/custom"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Calculator className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">利回りシミュレータ</h1>
            <p className="text-sm text-gray-500">カスタム機能 · 導入日 2026-03-18</p>
          </div>
        </div>
        <button
          onClick={() => setInputs(defaultInputs)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          リセット
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Form - Left */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              シミュレーション条件
            </h2>
            <div className="space-y-3">
              {inputFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-gray-500 mb-1">{field.label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs[field.key]}
                      onChange={(e) => update(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-right pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      {field.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 p-4">
            <h3 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              ワンポイント
            </h3>
            <ul className="text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
              <li>・ 表面利回り8%以上が投資目安とされる地域が多い</li>
              <li>・ 実質利回りは表面より1〜3%低くなるのが一般的</li>
              <li>・ 空室率は都心5%、郊外10〜15%が目安</li>
            </ul>
          </div>
        </div>

        {/* Results - Right */}
        <div className="lg:col-span-3 space-y-4">
          {/* Yield KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Percent className="h-3.5 w-3.5" />
                  表面利回り
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${grossLevel.color}`}>
                  {grossLevel.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {result.grossYield.toFixed(2)}
                <span className="text-lg text-gray-400 ml-0.5">%</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                年間賃料 {formatManYen(result.annualGrossRent)}万円 ÷ 物件価格
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  実質利回り
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${netLevel.color}`}>
                  {netLevel.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {result.netYield.toFixed(2)}
                <span className="text-lg text-gray-400 ml-0.5">%</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                純収益 {formatManYen(result.netIncome)}万円 ÷ 物件価格
              </p>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-gray-400" />
              年間収支サマリー
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">年間賃料収入（満室時）</span>
                <span className="text-sm font-bold text-gray-900">{formatManYen(result.annualGrossRent)} 万円</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">
                  空室控除後の収入
                  <span className="text-xs text-gray-400 ml-1">（空室率 {inputs.vacancyRate}%）</span>
                </span>
                <span className="text-sm font-bold text-gray-900">{formatManYen(result.annualEffectiveRent)} 万円</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-red-600">年間経費 合計</span>
                <span className="text-sm font-bold text-red-600">−{formatManYen(result.totalAnnualExpenses)} 万円</span>
              </div>
              <div className="flex items-center justify-between py-3 bg-blue-50 rounded-lg px-3 -mx-1">
                <span className="text-sm font-bold text-blue-900">年間純収益（NOI）</span>
                <span className={`text-lg font-bold ${result.netIncome >= 0 ? "text-blue-700" : "text-red-600"}`}>
                  {formatManYen(result.netIncome)} 万円
                </span>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ReceiptText className="h-4 w-4 text-gray-400" />
              経費内訳
            </h2>
            <div className="space-y-3">
              {expenseBreakdown.map((e) => (
                <div key={e.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{e.label}</span>
                    <span className="text-xs font-medium text-gray-900">{formatManYen(e.value)} 万円/年</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${e.color}`}
                      style={{ width: `${(e.value / maxExpense) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">経費合計</span>
              <span className="text-sm font-bold text-gray-900">{formatManYen(result.totalAnnualExpenses)} 万円/年</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
