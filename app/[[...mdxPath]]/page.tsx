import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");
export const dynamicParams = false;
const Wrapper = getMDXComponents().wrapper;
type Props = { params: Promise<{ mdxPath?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { metadata } = await importPage((await params).mdxPath);
  return metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { default: Content, metadata } = await importPage(params.mdxPath);
  return (
    <Wrapper metadata={metadata}>
      <Content {...props} params={params} />
    </Wrapper>
  );
}
