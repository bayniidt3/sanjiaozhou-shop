import { redirect } from "next/navigation";

import { getPublicBasePath } from "@/lib/env";

export default function HomePage() {
  redirect(`${getPublicBasePath()}/products`);
}
