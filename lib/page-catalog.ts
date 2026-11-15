import { getPageMap } from "nextra/page-map";
import { collectSeoPages } from "./seo";

export async function getSeoPages() {
  return collectSeoPages(await getPageMap());
}
