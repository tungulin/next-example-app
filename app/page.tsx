'use client';

import { useClientRedirect } from '@/shared/hooks';

export default function Home() {
    useClientRedirect('/movies', { query: { page: 1 } });

    return <></>;
}
