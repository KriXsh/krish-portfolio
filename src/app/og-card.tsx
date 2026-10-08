import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

// Shared 1200×630 social card (LinkedIn, X, WhatsApp, Slack previews).
export const ogSize = { width: 1200, height: 630 };

export function renderOgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #090a0f 0%, #151537 55%, #0b2a33 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2a4f8f, #1d3766 55%, #d9a77f)",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 26, color: "#b9cdec", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 32, color: "#94a3b8", maxWidth: 980, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#cbd5e1" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {["Full-Stack", "AI / ML", "Kafka", "Kubernetes", "AWS"].map((t) => (
              <div key={t} style={{ padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)" }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#b9cdec" }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
