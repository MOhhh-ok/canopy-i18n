import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h2>canopy-i18n Next.js example</h2>
      <ul>
        <li>
          <Link href="/ja">/ja</Link>
        </li>
        <li>
          <Link href="/en">/en</Link>
        </li>
      </ul>
    </main>
  );
}
