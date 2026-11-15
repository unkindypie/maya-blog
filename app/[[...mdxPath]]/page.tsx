import { createSeoPage, pageMetadata, pageStructuredData } from "@/lib/seo";
import { StructuredData } from "@/ui/components/structured-data";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");
export const dynamicParams = false;
const Wrapper = getMDXComponents().wrapper;
type Props = { params: Promise<{ mdxPath?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { mdxPath } = await params;
  const { metadata } = await importPage(mdxPath);
  return pageMetadata(createSeoPage(`/${mdxPath?.join("/") ?? ""}`, metadata));
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { default: Content, metadata } = await importPage(params.mdxPath);
  const page = createSeoPage(`/${params.mdxPath?.join("/") ?? ""}`, metadata);
  return (
    <>
      <StructuredData data={pageStructuredData(page)} />
      <Wrapper metadata={metadata}>
        <Content {...props} params={params} />
      </Wrapper>
    </>
  );
}
