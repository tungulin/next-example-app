"use client";

import { userApi, useUserActions } from "@/entities/user";
import { AUTH_TOKEN } from "@/shared/constants/default";
import { useCookiesNext } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const authPaths = ["/profile"];

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const cookies = useCookiesNext();
  const router = useRouter();
  const pathname = usePathname();
  const { clearUser, setUser } = useUserActions();

  useEffect(() => {
    userApi
      .getUserInfo()
      .then((resp) => {
        const user = resp.data?.user;
        setUser(user);
      })
      .catch(() => {
        cookies.deleteCookie(AUTH_TOKEN);
        clearUser();

        if (pathname && authPaths.includes(pathname)) {
          router.push("/");
        }
      });
  }, []);

  return <div>{children}</div>;
};
