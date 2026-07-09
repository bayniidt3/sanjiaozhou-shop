"use client";

import { useState, useTransition } from "react";

import type { LeadMessageRecord, MessageStatus } from "@/types/admin";

import { formatDateTime } from "@/lib/format";
import { StatusPill } from "@/components/status-pill";

const labelMap: Record<MessageStatus, string> = {
  new: "新留言",
  contacted: "已联系",
  archived: "已归档",
};

const toneMap: Record<MessageStatus, "success" | "warning" | "neutral"> = {
  new: "warning",
  contacted: "success",
  archived: "neutral",
};

export function MessagesTable({ initialMessages }: { initialMessages: LeadMessageRecord[] }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [messages, setMessages] = useState(initialMessages);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (message: LeadMessageRecord, status: MessageStatus) => {
    setPendingId(message.id);

    startTransition(async () => {
      const response = await fetch(`${basePath}/api/messages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: message.id, status }),
      });

      if (!response.ok) {
        setPendingId(null);
        return;
      }

      const nextMessage = (await response.json()) as LeadMessageRecord;
      setMessages((current) => current.map((item) => (item.id === nextMessage.id ? nextMessage : item)));
      setPendingId(null);
    });
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#f6f9fc] text-[13px] uppercase tracking-[0.16em] text-[#7b8aa1]">
            <tr>
              <th className="px-6 py-4 font-medium">联系人</th>
              <th className="px-4 py-4 font-medium">类型</th>
              <th className="px-4 py-4 font-medium">联系方式</th>
              <th className="px-4 py-4 font-medium">备注</th>
              <th className="px-4 py-4 font-medium">状态</th>
              <th className="px-4 py-4 font-medium">提交时间</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => {
              const disabled = isPending && pendingId === message.id;

              return (
                <tr key={message.id} className="border-t border-[#eef2f6] text-[14px] text-[#23364d]">
                  <td className="px-6 py-4 font-semibold">{message.contact_name}</td>
                  <td className="px-4 py-4">{message.lead_type}</td>
                  <td className="px-4 py-4">{message.contact_value}</td>
                  <td className="max-w-[360px] px-4 py-4 text-[#607089]">{message.remark || "-"}</td>
                  <td className="px-4 py-4">
                    <StatusPill tone={toneMap[message.status]}>{labelMap[message.status]}</StatusPill>
                  </td>
                  <td className="px-4 py-4 text-[#6d7c92]">{formatDateTime(message.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleStatusChange(message, "contacted")}
                        className="rounded-full bg-[#0f4c81] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
                      >
                        已联系
                      </button>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleStatusChange(message, "archived")}
                        className="rounded-full border border-[#d7e0ea] px-4 py-2 text-[13px] font-semibold text-[#4d5e74] disabled:opacity-50"
                      >
                        归档
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
