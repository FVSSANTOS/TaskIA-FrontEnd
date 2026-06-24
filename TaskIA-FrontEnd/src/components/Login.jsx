import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    setError("");
    onLogin?.();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border border-slate-800 bg-slate-950/95 shadow-2xl shadow-slate-950/40">
          <CardHeader className="space-y-3 px-8 pt-10 pb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-500/15 text-indigo-300">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold text-white">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Entre com sua conta para acessar o quadro Kanban.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  E-mail
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="seu@exemplo.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Senha
                </span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-center text-sm text-slate-500">
              Use qualquer e-mail e senha para testar o fluxo.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
