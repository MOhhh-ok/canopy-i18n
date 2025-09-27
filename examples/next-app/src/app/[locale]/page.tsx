export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  await params; // not used here, but conforms to Next.js 15 validator
  return (
    <main style={{ padding: 24 }}>
      <h2>Welcome</h2>
      <p>Use the menu to navigate samples.</p>
    </main>
  );
}


