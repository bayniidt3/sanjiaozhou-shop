export type HeaderLink = {
  href: string;
  label: string;
};

export type LeadType = "账号上架" | "求购" | "客服" | "类型2";

export type ProductCard = {
  id: string;
  image: string;
  title: string;
  discount: string;
  tags: string[];
  ratio: string;
  deposit: string;
  rent: string;
  weapon: string;
  price: string;
  originalPrice: string;
  badge?: string;
  seller?: string;
};

export type DetailInfoSection = {
  items: Array<{
    label: string;
    value: string;
  }>;
  title: string;
};

export type ProductDetail = {
  actionLabel?: string;
  detailSections: DetailInfoSection[];
  gallery: string[];
  id: string;
  lastVisitor?: string;
  sellerAvatar?: string;
} & ProductCard;

export type FilterRow = {
  label: string;
  values: string[];
  compact?: boolean;
};
