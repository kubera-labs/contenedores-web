"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al iniciar sesión");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors";
  const inputStyle: React.CSSProperties = {
    borderColor: "var(--border)",
    background: "var(--background)",
    color: "var(--foreground)",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="w-full max-w-sm">
        <div
          className="rounded-2xl border p-8 shadow-sm"
          style={{ background: "var(--background)", borderColor: "var(--border)" }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <Image
              src="/logo_final_optimizado.webp"
              alt="Monarca Conteiners"
              width={140}
              height={42}
              className="object-contain"
              priority
            />
          </div>

          <h1
            className="text-xl font-bold text-center mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Panel Administrativo
          </h1>
          <p
            className="text-sm text-center mb-7"
            style={{ color: "var(--foreground-muted)" }}
          >
            Ingresá tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "var(--foreground-secondary)" }}
              >
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "var(--foreground-secondary)" }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {error && (
              <p
                className="text-sm text-center font-medium rounded-lg py-2 px-3"
                style={{
                  color: "var(--color-error)",
                  background: "var(--color-error-light)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 mt-1"
              style={{ background: "#2563EB" }}
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
