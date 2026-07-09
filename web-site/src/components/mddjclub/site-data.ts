import type { FilterRow, HeaderLink, ProductCard, ProductDetail } from "@/types/mddjclub";

export const topUtilityLinks: HeaderLink[] = [
  { href: "#", label: "我的订单" },
  { href: "#", label: "我的钱包" },
  { href: "#", label: "联系客服" },
];

export const mainNavLinks: HeaderLink[] = [
  { href: "/", label: "首页" },
  { href: "/list", label: "租号大厅" },
  { href: "/recovery-list", label: "求购列表" },
];

export const footerColumns = [
  {
    title: "平台指南",
    links: ["首页", "租号大厅", "常见问题"],
  },
  {
    title: "商务合作",
    links: ["关于蒙佳哆商行"],
  },
  {
    title: "联系我们",
    links: ["客服热线", "客服微信"],
  },
];

export const marketRows = [
  { seller: "长官商行", ratio: "45.00", note: "封禁赔付账号80%，白泽代言", date: "2026-07-04" },
  { seller: "叮当商行", ratio: "49.00", note: "封号全额赔偿，寒冲+老飞宇代言", date: "2026-07-04" },
  { seller: "镇叙风商行", ratio: "45.00", note: "封号赔付押金+租金，多主播代言", date: "2026-07-04" },
  { seller: "春卡哇商行", ratio: "41.00", note: "封号赔付押金+租金，业内龙头", date: "2026-07-04" },
];

export const featuredCards: ProductCard[] = [
  {
    id: "89127",
    image: "/images/mddjclub/4-26dc0d80822127a6c7b5fecba15ca2c4.jpg",
    title: "钻石2099m9格7体7负",
    discount: "8折",
    tags: ["恒金玫瑰", "天际线", "维什戴尔", "水墨云图", "M7被锁咬咬", "渡鸦刀卫"],
    ratio: "42.50",
    deposit: "2999.00",
    rent: "20m/天",
    weapon: "AWM/213",
    price: "4938.40",
    originalPrice: "6173.00",
    seller: "187***2370",
  },
  {
    id: "89128",
    image: "/images/mddjclub/6-f9b5b396bbda30996d6f0922351440aa.jpg",
    title: "黄金2099m9格7体7负",
    discount: "8折",
    tags: ["维什戴尔", "信条", "红狼-电锯锯弦"],
    ratio: "48.75",
    deposit: "1999.00",
    rent: "20m/天",
    weapon: "AWM/216",
    price: "4305.60",
    originalPrice: "5382.00",
    seller: "137****7147",
  },
  {
    id: "89129",
    image: "/images/mddjclub/8-5ed524b91cd1b641f8819a8389244459.png",
    title: "铂金1036m9格7体7负",
    discount: "8.5折",
    tags: ["天际线", "幽蓝", "红狼-电锯锯弦", "牧羊人-街头之星"],
    ratio: "45.88",
    deposit: "1000.00",
    rent: "20m/天",
    weapon: "AWM/92",
    price: "2257.60",
    originalPrice: "2656.00",
    seller: "158****0520",
  },
  {
    id: "89130",
    image: "/images/mddjclub/9-9d1598d01775260511093b62240d033a.jpg",
    title: "钻石1821m9格7体7负",
    discount: "8.5折",
    tags: ["恒金玫瑰", "天际线", "水墨云图", "北极星", "银翼-末结善荣", "乌鲁鲁-凯恩勇手"],
    ratio: "45.88",
    deposit: "1999.00",
    rent: "15m/天",
    weapon: "AWM/464",
    price: "3968.65",
    originalPrice: "4669.00",
    seller: "187***6427",
    badge: "1人想要",
  },
  {
    id: "89131",
    image: "/images/mddjclub/10-ff76a6d620deaeae9bb372579d5c4fb6.jpg",
    title: "钻石953m9格7体7负",
    discount: "8.5折",
    tags: ["恒金玫瑰", "天际线", "幽蓝", "红狼-电锯锯弦", "蜂医-迷界入", "牧龙-铁锯背骨"],
    ratio: "45.88",
    deposit: "1000.00",
    rent: "15m/天",
    weapon: "AWM/47",
    price: "2076.55",
    originalPrice: "2443.00",
    seller: "180***4040",
  },
  {
    id: "89132",
    image: "/images/mddjclub/11-abcba28b06727249ec90baf7b3b74220.png",
    title: "铂金770m9格7体7负",
    discount: "8.5折",
    tags: ["恒金玫瑰", "天际线", "幽蓝", "维都-迷界入", "红狼-电锯锯弦"],
    ratio: "45.88",
    deposit: "898.00",
    rent: "20m/天",
    weapon: "AWM/249",
    price: "1677.90",
    originalPrice: "1974.00",
    seller: "177***5576",
    badge: "2人想要",
  },
];

export const listCards: ProductCard[] = [
  ...featuredCards,
  {
    id: "89133",
    image: "/images/mddjclub/12-0c4686082c0374892a6c8447a9b3102c.png",
    title: "钻石700m9格7体7负",
    discount: "8.5折",
    tags: ["暮影-金刚射手", "蜂医-迷界入", "无名-夜鹰", "红狼-电锯锯弦"],
    ratio: "47.05",
    deposit: "800.00",
    rent: "20m/天",
    weapon: "AWM/72",
    price: "1487.50",
    originalPrice: "1750.00",
    seller: "182***8129",
  },
  {
    id: "89134",
    image: "/images/mddjclub/13-f86f22446ddbf755e0b1510dffff8c3d.png",
    title: "黄金1016m9格7体7负",
    discount: "8.5折",
    tags: ["恒金玫瑰", "幽蓝", "银翼-末结善荣", "蜂医-迷界入"],
    ratio: "47.05",
    deposit: "700.00",
    rent: "20m/天",
    weapon: "AWM/264",
    price: "2159.00",
    originalPrice: "2540.00",
    seller: "198****9519",
  },
  {
    id: "89135",
    image: "/images/mddjclub/14-f97504bae9d40247b13eae143c9b11a9.jpg",
    title: "黄金1165m9格7体7负",
    discount: "8.7折",
    tags: ["幽蓝", "电锯锯弦", "乌鲁鲁-凯恩勇手"],
    ratio: "44.82",
    deposit: "800.00",
    rent: "20m/天",
    weapon: "AWM/110",
    price: "2598.69",
    originalPrice: "2987.00",
    seller: "139****5001",
  },
  {
    id: "89136",
    image: "/images/mddjclub/15-f4fb4cd7ce1b880e34e91151c83153ae.jpg",
    title: "铂金1067m6格6体7负",
    discount: "8.8折",
    tags: ["无（电锯、处刑者不可刀皮，请选“无”）"],
    ratio: "46.59",
    deposit: "800.00",
    rent: "15m/天",
    weapon: "AWM/0",
    price: "2289.76",
    originalPrice: "2602.00",
    seller: "173****5499",
    badge: "1人想要",
  },
  {
    id: "89137",
    image: "/images/mddjclub/16-c01fadb35bb2e96bdd4e8c46ccabab55.png",
    title: "铂金976m9格7体7负",
    discount: "8.8折",
    tags: ["天际线", "恒金玫瑰", "幽蓝", "牧医-迷界入", "红狼-电锯锯弦"],
    ratio: "44.31",
    deposit: "1001.00",
    rent: "20m/天",
    weapon: "AWM/208",
    price: "2201.76",
    originalPrice: "2502.00",
    seller: "182****1990",
    badge: "1人想要",
  },
  {
    id: "89138",
    image: "/images/mddjclub/17-b87f5b35ed1db964a1262ecd0454f8a5.jpg",
    title: "钻石710m9格7体7负",
    discount: "8.8折",
    tags: ["幽蓝", "乌鲁鲁-凯恩勇手", "红狼-电锯锯弦"],
    ratio: "44.31",
    deposit: "400.00",
    rent: "10m/天",
    weapon: "AWM/309",
    price: "1601.60",
    originalPrice: "1820.00",
    seller: "191****5787",
  },
];

export const filterRows: FilterRow[] = [
  { label: "选择分类", values: ["全部", "三角洲"] },
  { label: "纯币", values: ["最小", "-", "最大"], compact: true },
  { label: "绝密KD", values: ["最小", "-", "最大"], compact: true },
  { label: "保险格数", values: ["全部", "4", "6", "9"] },
  { label: "体力", values: ["全部", "1", "2", "3", "4", "5", "6", "7"] },
  { label: "负重", values: ["全部", "1", "2", "3", "4", "5", "6", "7"] },
  { label: "红皮", values: ["无", "蚀金玫瑰", "天际线", "维什戴尔", "水墨云图", "午夜邮差", "Vector美杜莎", "AS VAL悬赏令", "AUG气象感应"] },
  { label: "刀皮", values: ["无", "赤泉", "怜悯", "蝴蝶刀", "北极星", "信条", "黑海", "龙牙", "暗星"] },
  { label: "金皮", values: ["无", "银翼-末结善荣", "薇娜-劳拉", "乌鲁鲁-凯恩勇手", "暮影-金刚射手", "牧羊人-街头之星", "蜂医-危险物质", "蜂医-迷界入"] },
  { label: "游戏大区", values: ["全部", "QQ区", "VX区"] },
  { label: "选区", values: ["全部", "普通区", "自营区", "特价区", "极品号区"] },
];

const detailById: Record<string, ProductDetail> = {
  "89131": {
    ...listCards.find((card) => card.id === "89131")!,
    actionLabel: "下单",
    gallery: [
      "/images/mddjclub/10-ff76a6d620deaeae9bb372579d5c4fb6.jpg",
      "/images/mddjclub/18-88e84c56e980a6348837a7e5795b9058.jpg",
      "/images/mddjclub/19-008cac3f0b6d74d730ffb2853796d576.jpg",
    ],
    sellerAvatar: "/images/mddjclub/5-5c8df237b49c7471e317b0b90b7f9df4.png",
    lastVisitor: "刚刚来过",
    detailSections: [
      {
        title: "基础信息",
        items: [
          { label: "AWM", value: "47" },
          { label: "封禁记录", value: "有" },
          { label: "金币", value: "953" },
          { label: "绝密KD", value: "2" },
          { label: "保险格位", value: "9" },
          { label: "体力", value: "7" },
          { label: "负重", value: "7" },
        ],
      },
      {
        title: "外观与属性",
        items: [
          { label: "刀皮", value: "坠星者" },
          { label: "金皮", value: "红狼-电锯惊魂, 蜂医-送葬人" },
          { label: "红皮皮肤", value: "蚀金玫瑰, 天际线" },
          { label: "六甲", value: "4" },
          { label: "六头", value: "10" },
        ],
      },
      {
        title: "账户信息",
        items: [
          { label: "等级", value: "60" },
          { label: "段位", value: "钻石" },
          { label: "上架渠道", value: "普通+自营" },
          { label: "登录方式", value: "扫码账密均可" },
          { label: "可辅助上号时间", value: "09:00-23:59" },
        ],
      },
      {
        title: "其他信息",
        items: [
          { label: "租赁周期", value: "64 天" },
          { label: "账号费用", value: "2076.55 元" },
          { label: "押金费用", value: "1000.00 元" },
          { label: "不可使用物品备注", value: "不能动收藏室，红弹免费，红包免费" },
        ],
      },
    ],
  },
};

export function getProductDetailById(id: string): ProductDetail {
  const exact = detailById[id];
  if (exact) return exact;

  const fallback = listCards.find((card) => card.id === id) ?? listCards[0];

  return {
    ...fallback,
    actionLabel: "下单",
    gallery: [fallback.image],
    sellerAvatar: "/images/mddjclub/5-5c8df237b49c7471e317b0b90b7f9df4.png",
    lastVisitor: "最近浏览",
    detailSections: [
      {
        title: "基础信息",
        items: [
          { label: "AWM", value: fallback.weapon.replace("AWM/", "") || "0" },
          { label: "比例", value: fallback.ratio },
          { label: "押金", value: fallback.deposit },
          { label: "租赁时长", value: fallback.rent },
        ],
      },
      {
        title: "外观与属性",
        items: [
          { label: "标签", value: fallback.tags.join("、") },
          { label: "折扣", value: fallback.discount },
        ],
      },
      {
        title: "账户信息",
        items: [
          { label: "卖家", value: fallback.seller || "平台商家" },
          { label: "标题", value: fallback.title },
        ],
      },
      {
        title: "其他信息",
        items: [
          { label: "详情说明", value: "当前为前端克隆详情页占位数据，后续可通过后台按 id 返回真实详情。" },
        ],
      },
    ],
  };
}
