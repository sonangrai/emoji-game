"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { getCookie } from "@/lib/cookie";

export default function UserHeader() {
  const user: {
    nickname: string;
    email: string;
  } = useMemo(() => {
    return JSON.parse(getCookie("player"));
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onLogout = () => {
    document.cookie = "player=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-xl">
          GEmoji
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{getInitials(user.nickname)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.nickname}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-1"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 bg-background border-b p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{getInitials(user.nickname)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.nickname}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="gap-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
