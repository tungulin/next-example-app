import { usePathname, useRouter } from 'next/navigation';
// import { useRouter } from "next/router";
import { useEffect } from 'react';

type Options = { query: Record<string, string | number> };

export const useClientRedirect = (path: string, options: any) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathname !== path) {
            router.replace(path, options);
        }
    }, []);
};
