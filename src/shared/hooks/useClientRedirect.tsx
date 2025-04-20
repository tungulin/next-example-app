import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Options = { query: Record<string, string | number> };

export const useClientRedirect = (path: string, options: Options) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== path) {
      router.replace({ pathname: path, ...options });
    }
  }, []);
};
