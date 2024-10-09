import React from 'react';

import Link from 'next/link';

interface PageProps {
  params: {
    lng: string;
  };
}

export default function page({ params: { lng } }: Readonly<PageProps>) {
  return (
    <main>
      <Link href={`/${lng}`}>
        <button type='button'>home</button>
      </Link>
    </main>
  );
}
