"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { LeadType } from "@/types/mddjclub";

type LeadModalProps = {
  defaultType: LeadType | null;
  open: boolean;
  onClose: () => void;
};

const leadTypeOptions: LeadType[] = ["账号上架", "求购", "客服"];
const type2FieldLabels = [
  { key: "currentAssets", label: "流动资产", placeholder: "请输入流动资产" },
  { key: "coinOnly", label: "纯币", placeholder: "请输入纯币" },
  { key: "aw", label: "AW", placeholder: "请输入 AW" },
  { key: "knifeSkin", label: "刀皮", placeholder: "请输入刀皮" },
] as const;

export function LeadModal({ defaultType, open, onClose }: LeadModalProps) {
  const [type, setType] = useState<LeadType>("账号上架");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [remark, setRemark] = useState("");
  const [currentAssets, setCurrentAssets] = useState("");
  const [coinOnly, setCoinOnly] = useState("");
  const [aw, setAw] = useState("");
  const [knifeSkin, setKnifeSkin] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultType) {
      setType(defaultType);
      setSubmitted(false);
      setError("");
    }
  }, [defaultType]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !contact.trim()) {
      setError("请先填写联系人和联系方式");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName: name,
          contactValue: contact,
          leadType: type,
          remark,
          currentAssets,
          coinOnly,
          aw,
          knifeSkin,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error || "提交失败");
      }

      setSubmitted(true);
      setName("");
      setContact("");
      setRemark("");
      setCurrentAssets("");
      setCoinOnly("");
      setAw("");
      setKnifeSkin("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "提交失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-[520px] rounded-[20px] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.28)]">
        <div className="flex items-center justify-between border-b border-[#edf1f6] px-6 py-5">
          <div>
            <h2 className="text-[22px] font-semibold text-[#1f2937]">留下联系方式</h2>
            <p className="mt-1 text-[13px] text-[#7f8aa3]">后续可以直接对接后台管理和线索处理。</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#7f8aa3] transition-colors hover:bg-[#f5f7fb]"
          >
            <X className="size-5" />
          </button>
        </div>
        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="text-[24px] font-semibold text-[#1f2937]">提交成功</div>
            <p className="mt-3 text-[14px] leading-7 text-[#7f8aa3]">
              已记录 `{type}` 线索，后台留言管理中可以直接查看。
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-[10px] bg-[#4698f3] px-6 py-3 text-[14px] font-semibold text-white"
            >
              我知道了
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#4b5563]">类型</label>
              <div className="flex flex-wrap gap-3">
                {leadTypeOptions.map((option) => {
                  const active = option === type;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setType(option)}
                      className={[
                        "rounded-full border px-4 py-2 text-[14px] font-medium transition-colors",
                        active
                          ? "border-[#4698f3] bg-[#eef6ff] text-[#4698f3]"
                          : "border-[#dce5f0] text-[#6b7280]",
                      ].join(" ")}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#4b5563]">联系人</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="请输入联系人姓名"
                className="h-12 w-full rounded-[10px] border border-[#dce5f0] px-4 text-[14px] outline-none transition-colors focus:border-[#4698f3]"
              />
            </div>
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#4b5563]">联系方式</label>
              <input
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="请输入手机号/微信/QQ"
                className="h-12 w-full rounded-[10px] border border-[#dce5f0] px-4 text-[14px] outline-none transition-colors focus:border-[#4698f3]"
              />
            </div>
            {type2FieldLabels.map((field) => {
              const valueMap = {
                currentAssets,
                coinOnly,
                aw,
                knifeSkin,
              };
              const setterMap = {
                currentAssets: setCurrentAssets,
                coinOnly: setCoinOnly,
                aw: setAw,
                knifeSkin: setKnifeSkin,
              };

              return (
                <div key={field.key}>
                  <label className="mb-2 block text-[14px] font-medium text-[#4b5563]">{field.label}</label>
                  <input
                    value={valueMap[field.key]}
                    onChange={(event) => setterMap[field.key](event.target.value)}
                    placeholder={field.placeholder}
                    className="h-12 w-full rounded-[10px] border border-[#dce5f0] px-4 text-[14px] outline-none transition-colors focus:border-[#4698f3]"
                  />
                </div>
              );
            })}
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#4b5563]">备注</label>
              <textarea
                value={remark}
                onChange={(event) => setRemark(event.target.value)}
                placeholder="可填写需求描述、方便联系时间等"
                className="min-h-[110px] w-full rounded-[10px] border border-[#dce5f0] px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#4698f3]"
              />
            </div>
            {error ? <div className="text-[13px] text-[#d14343]">{error}</div> : null}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[10px] border border-[#dce5f0] px-5 py-3 text-[14px] font-medium text-[#6b7280]"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-[10px] bg-[#4698f3] px-5 py-3 text-[14px] font-semibold text-white"
              >
                {submitting ? "提交中..." : "提交线索"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
