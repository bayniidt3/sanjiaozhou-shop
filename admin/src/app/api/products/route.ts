import { NextRequest, NextResponse } from "next/server";

import { listProducts, updateProductStatus } from "@/lib/api";
import type { ProductStatus } from "@/types/admin";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as { id?: string; status?: ProductStatus };

    if (!body.id || !body.status) {
      return NextResponse.json({ message: "id 和 status 必填" }, { status: 400 });
    }

    const product = await updateProductStatus(body.id, body.status);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
