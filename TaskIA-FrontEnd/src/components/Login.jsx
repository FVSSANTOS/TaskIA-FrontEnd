import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { login, register } from "../services/apiServices";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setError("Informe seu nome completo para criar a conta.");
        return;
      }
      if (!confirmPassword.trim()) {
        setError("Confirme sua senha para continuar.");
        return;
      }
      if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      let data;
      if (mode === "login") {
        data = await login(email, password);
      } else {
        data = await register({ name, email, password });
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      onLogin?.(data);
    } catch (err) {
      setError(err.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border border-zinc-800 bg-zinc-950/95 shadow-2xl shadow-black/40">
          <CardHeader className="space-y-3 px-8 pt-10 pb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-500/15 text-purple-300">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {mode === "register" ? "person_add" : "lock"}
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold text-white">
              {mode === "register" ? "Crie sua conta" : "Bem-vindo de volta"}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              {mode === "register"
                ? "Cadastre-se para começar a gerenciar suas tarefas."
                : "Entre com sua conta para acessar o quadro Kanban."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "register" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">
                    Nome completo
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Seu nome"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-300">
                  E-mail
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="seu@exemplo.com"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-300">
                  Senha
                </span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
              </label>

              {mode === "register" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">
                    Confirme a senha
                  </span>
                  <input
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  />
                </label>
              ) : null}

              {error ? (
                <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white hover:bg-purple-500 focus-visible:ring-purple-500/40 disabled:opacity-60"
              >
                {loading
                  ? "Aguarde..."
                  : mode === "register"
                  ? "Criar conta"
                  : "Entrar"}
              </Button>
            </form>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 px-4 py-4 text-center text-sm text-zinc-500">
              {mode === "register"
                ? "Já tem conta?"
                : "Ainda não tem conta?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
                className="font-semibold text-white underline-offset-4 hover:text-purple-300 hover:underline"
              >
                {mode === "register" ? "Entre aqui." : "Cadastre-se."}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
