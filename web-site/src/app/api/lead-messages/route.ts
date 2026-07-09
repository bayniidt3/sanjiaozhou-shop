import { NextResponse } from "next/server";

import { createLeadMessage } from "@/lib/supabase-public";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      contactName?: string;
      contactValue?: string;
      leadType?: "账号上架" | "求购" | "客服";
      remark?: string;
    };

    if (!body.contactName?.trim() || !body.contactValue?.trim() || !body.leadType) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    await createLeadMessage({
      contactName: body.contactName.trim(),
      contactValue: body.contactValue.trim(),
      leadType: body.leadType,
      remark: body.remark?.trim() || "",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "提交失败" },
      { status: 500 },
    );
  }
}
