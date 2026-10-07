import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Browser-tab icon: a "K" on the brand gradient.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #a3293d, #7a1f2f 55%, #d9a77f)",
          color: "#fff",
          fontSize: 42,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        K
      </div>
    ),
    size,
  );
}
