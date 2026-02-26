import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function WorkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#work');
  }, [router]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
      }}
    >
      <p>
        Redirecting to Work section… If not redirected, go to{' '}
        <Link href="/#work">home</Link>.
      </p>
    </main>
  );
}
