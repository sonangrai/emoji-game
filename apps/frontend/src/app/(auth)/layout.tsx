"use client";
import UserHeader from "@/components/common/user-header";
import { getCookie } from "@/lib/cookie";
import { useMemo } from "react";

function LoginLayout({ children }: { children: React.ReactNode }) {
  const loggedIn: boolean = useMemo(() => {
    return getCookie("player") !== "";
  }, []);

  if (!loggedIn) document.location.href = "/login";

  return (
    <>
      <UserHeader />
      {children}
    </>
  );
}

export default LoginLayout;
