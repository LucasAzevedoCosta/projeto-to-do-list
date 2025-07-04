"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/helpers";

interface ProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  completedTasksCount: number;
  tags: string[];
}

export function ProfileDialog({ isOpen, onOpenChange }: ProfileDialogProps) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchUser() {
      try {
        const res = await fetch("/api/user", { credentials: "include" });
        if (!res.ok) throw new Error("Erro ao carregar dados do usuário.");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Perfil do Usuário</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <Avatar className="h-20 w-20 bg-gradient-to-br from-primary to-secondary">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-card-foreground text-xl">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {user?.name}
            </h3>
            <p className="text-muted-foreground">Usuário Premium</p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Membro desde
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt ? formatDate(user.createdAt) : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Tarefas Concluídas
                </p>
                <p className="text-sm text-muted-foreground">47 tarefas</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Produtivo
            </Badge>
            <Badge
              variant="secondary"
              className="bg-secondary/20 text-secondary-foreground"
            >
              Organizado
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
