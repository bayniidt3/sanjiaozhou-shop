import { NextRequest, NextResponse } from "next/server";

import { listMessages, updateMessageStatus } from "@/lib/api";
import type { MessageStatus } from "@/types/admin";

export async function GET() {
  try {
    const messages = await listMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as { id?: string; status?: MessageStatus };

    if (!body.id || !body.status) {
      return NextResponse.json({ message: "id 和 status 必填" }, { status: 400 });
    }

    const message = await updateMessageStatus(body.id, body.status);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
