import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404 · nothing here</h1>
      <p>This page might have moved, or never existed.</p>
      <Link href="/">Back home</Link>
    </>
  );
}
