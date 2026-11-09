import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#1d4ed8",
          color: "#f2efe8",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.08em",
          lineHeight: 1,
        }}
      >
        SS
      </div>
    ),
    { ...size },
  );
}
