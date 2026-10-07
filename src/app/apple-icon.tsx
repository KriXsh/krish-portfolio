import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon on iOS (no rounded corners: iOS masks them itself).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #a3293d, #7a1f2f 55%, #d9a77f)",
          color: "#fff",
          fontSize: 116,
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
