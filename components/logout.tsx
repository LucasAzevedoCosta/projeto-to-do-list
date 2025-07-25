"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sair <LogOut className="size-4" />
    </Button>
  );
}