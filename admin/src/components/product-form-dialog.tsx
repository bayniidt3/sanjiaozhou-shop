"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ProductRecord, ProductStatus } from "@/types/admin";

type ProductFormValues = {
  title: string;
  image_url: string;
  tags: string;
  price: string;
  original_price: string;
  deposit: string;
  rent: string;
  ratio: string;
  weapon: string;
  seller: string;
  source_product_id: string;
  status: ProductStatus;
};

const emptyValues: ProductFormValues = {
  title: "",
  image_url: "",
  tags: "",
  price: "",
  original_price: "",
  deposit: "",
  rent: "",
  ratio: "",
  weapon: "",
  seller: "",
  source_product_id: "",
  status: "published",
};

function buildInitialValues(product: ProductRecord | null): ProductFormValues {
  if (!product) {
    return emptyValues;
  }

  return {
    title: product.title,
    image_url: product.image_url,
    tags: product.tags.join(", "),
    price: String(product.price),
    original_price: String(product.original_price),
    deposit: String(product.deposit),
    rent: product.rent,
    ratio: String(product.ratio),
    weapon: product.weapon,
    seller: product.seller || "",
    source_product_id: product.source_product_id || "",
    status: product.status,
  };
}

export function ProductFormDialog({
  open,
  product,
  submitting,
  onClose,
  onSubmit,
}: {
  open: boolean;
  product: ProductRecord | null;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (payload: Record<string, unknown>) => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(() => buildInitialValues(product));
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(buildInitialValues(product));
    }
  }, [open, product]);

  if (!open) {
    return null;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const nextImageUrl = await readFileAsDataUrl(file);
      setValues((current) => ({ ...current, image_url: nextImageUrl }));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      ...values,
      tags: values.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      price: Number(values.price),
      original_price: Number(values.original_price),
      deposit: Number(values.deposit),
      ratio: Number(values.ratio),
      seller: values.seller || null,
      source_product_id: values.source_product_id || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08121fcc] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[860px] rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_30px_80px_rgba(8,18,31,0.35)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] uppercase tracking-[0.2em] text-[#7b8aa1]">Product</div>
            <h2 className="mt-2 text-[28px] font-semibold text-[#10243c]">{product ? "编辑产品" : "新增产品"}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#dbe5ee] px-4 py-2 text-sm text-[#5d6d83]">
            关闭
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="产品标题" value={values.title} onChange={(value) => setValues((current) => ({ ...current, title: value }))} />
          <div className="flex flex-col gap-2 text-sm font-medium text-[#38506d]">
            <span>产品图片</span>
            <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-[14px] border border-dashed border-[#c8d6e5] bg-[#fbfdff] px-4 text-center text-sm text-[#4b627e]">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploading ? "上传中..." : "选择本地图片"}
            </label>
            <Field label="图片地址" value={values.image_url} onChange={(value) => setValues((current) => ({ ...current, image_url: value }))} />
            {values.image_url ? (
              <div className="overflow-hidden rounded-[16px] border border-[#dbe5ee] bg-[#f8fbff] p-2">
                <Image
                  src={values.image_url}
                  alt="产品预览"
                  width={320}
                  height={180}
                  unoptimized
                  className="h-40 w-full rounded-[12px] object-cover"
                />
              </div>
            ) : null}
          </div>
          <Field label="售价" value={values.price} onChange={(value) => setValues((current) => ({ ...current, price: value }))} />
          <Field label="原价" value={values.original_price} onChange={(value) => setValues((current) => ({ ...current, original_price: value }))} />
          <Field label="押金" value={values.deposit} onChange={(value) => setValues((current) => ({ ...current, deposit: value }))} />
          <Field label="比例" value={values.ratio} onChange={(value) => setValues((current) => ({ ...current, ratio: value }))} />
          <Field label="租期" value={values.rent} onChange={(value) => setValues((current) => ({ ...current, rent: value }))} />
          <Field label="武器信息" value={values.weapon} onChange={(value) => setValues((current) => ({ ...current, weapon: value }))} />
          <Field label="卖家" value={values.seller} onChange={(value) => setValues((current) => ({ ...current, seller: value }))} />
          <Field label="来源产品ID" value={values.source_product_id} onChange={(value) => setValues((current) => ({ ...current, source_product_id: value }))} />
          <div className="md:col-span-2">
            <Field label="标签（逗号分隔）" value={values.tags} onChange={(value) => setValues((current) => ({ ...current, tags: value }))} />
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium text-[#38506d]">
            状态
            <select
              value={values.status}
              onChange={(event) => setValues((current) => ({ ...current, status: event.target.value as ProductStatus }))}
              className="h-12 rounded-[14px] border border-[#dbe5ee] bg-[#fbfdff] px-4 text-[#10243c] outline-none"
            >
              <option value="published">已上架</option>
              <option value="draft">已下架</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full border border-[#dbe5ee] px-5 py-3 text-sm font-semibold text-[#5d6d83]">
            取消
          </button>
          <button type="submit" disabled={submitting} className="rounded-full bg-[#0f4c81] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {submitting ? "保存中..." : product ? "保存修改" : "创建产品"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#38506d]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[14px] border border-[#dbe5ee] bg-[#fbfdff] px-4 text-[#10243c] outline-none"
      />
    </label>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error ?? new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}
