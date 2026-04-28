import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function safeEq(a: string, b: string): boolean {
  try {
    const ha = Buffer.from(createHmac("sha256", "cmp").update(a).digest("hex"));
    const hb = Buffer.from(createHmac("sha256", "cmp").update(b).digest("hex"));
    return timingSafeEqual(ha, hb);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // Rate limiting — only active when Upstash Redis env vars are set
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const { Redis } = await import("@upstash/redis");
    const { Ratelimit } = await import("@upstash/ratelimit");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: false,
    });
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
    const { success } = await limiter.limit(`login:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Demasiados intentos. Esperá 15 minutos." },
        { status: 429 },
      );
    }
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { username, password } = body;
  const envUser = process.env.ADMIN_USERNAME ?? "";
  const envPass = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET;

  const valid =
    !!username &&
    !!password &&
    !!secret &&
    safeEq(username, envUser) &&
    safeEq(password, envPass);

  if (!valid) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
