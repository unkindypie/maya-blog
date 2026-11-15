export interface StructuredDataProps {
  readonly data: Readonly<Record<string, unknown>>;
}
export function StructuredData({ data }: Readonly<StructuredDataProps>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
