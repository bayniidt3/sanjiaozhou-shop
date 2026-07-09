import { NextRequest, NextResponse } from "next/server";

import { createProduct, deleteProduct, listProducts, updateProduct, updateProductStatus } from "@/lib/api";
import type { ProductStatus } from "@/types/admin";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as { id?: string; status?: ProductStatus; mode?: "status" | "full" };

    if (!body.id) {
      return NextResponse.json({ message: "id 必填" }, { status: 400 });
    }

    const product =
      body.mode === "full"
        ? await updateProduct(body.id, body as never)
        : body.status
          ? await updateProductStatus(body.id, body.status)
          : null;

    if (!product) {
      return NextResponse.json({ message: "status 必填" }, { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "id 必填" }, { status: 400 });
    }

    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
