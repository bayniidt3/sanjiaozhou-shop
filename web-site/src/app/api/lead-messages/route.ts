import { NextResponse } from "next/server";

import { createLeadMessage } from "@/lib/supabase-public";
import type { LeadType } from "@/types/mddjclub";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      contactName?: string;
      contactValue?: string;
      leadType?: LeadType;
      remark?: string;
      aw?: string;
      coinOnly?: string;
      currentAssets?: string;
      knifeSkin?: string;
    };

    if (!body.contactName?.trim() || !body.contactValue?.trim() || !body.leadType) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    await createLeadMessage({
      contactName: body.contactName.trim(),
      contactValue: body.contactValue.trim(),
      leadType: body.leadType,
      remark: body.remark?.trim() || "",
      aw: body.aw,
      coinOnly: body.coinOnly,
      currentAssets: body.currentAssets,
      knifeSkin: body.knifeSkin,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "提交失败" },
      { status: 500 },
    );
  }
}
