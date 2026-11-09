import path from "node:path";
import type { NextConfig } from "next";

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
const securityHeaders = [...baseHeaders, { key: "X-Frame-Options", value: "DENY" }];
/** 3D-сцена Kimi встраивается в страницу 3D-тура через iframe — только с того же origin. */
const kimiHeaders = [...baseHeaders, { key: "X-Frame-Options", value: "SAMEORIGIN" }];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Корень проекта задан явно: lockfile в родительском каталоге не должен влиять на трассировку файлов.
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  async headers() {
    return [
      { source: "/((?!kimi-tour/).*)", headers: securityHeaders },
      { source: "/kimi-tour/:path*", headers: kimiHeaders },
    ];
  },
};

export default nextConfig;
