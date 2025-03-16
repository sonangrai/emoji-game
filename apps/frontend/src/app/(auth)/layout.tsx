"use client";
import UserHeader from "@/components/common/user-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for auth cookie
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("player="));

    if (!authCookie) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Allow access
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Prevent flash of protected content
  }

  return (
    <>
      <UserHeader />
      {children}
    </>
  );
}

export default AuthLayout;
