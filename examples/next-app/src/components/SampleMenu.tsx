import Link from 'next/link';

export function SampleMenu({ locale }: { locale: string }) {
  return (
    <nav style={{ padding: 16 }}>
      <ul style={{ display: 'flex', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link href={`/${locale}/server`}>Server sample</Link>
        </li>
        <li>
          <Link href={`/${locale}/client`}>Client sample</Link>
        </li>
      </ul>
    </nav>
  );
}


