"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClients";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error("Erro a o fazer login.");
    } else {
      if (data.session?.access_token && data.user?.email) {
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem("user", data.user.email);
        router.push("/dashboard");
      }
    }
  };

   useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token !== null){
          router.push('/dashboard');
        }
      })

  return (
    <div className="flex items-center justify-center min-h-screen bg-foreground">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar na administração</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 p-6 max-w-sm mx-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button onClick={() => router.back()}>
              Retornar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
