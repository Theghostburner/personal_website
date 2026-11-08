import { ImageResponse } from "next/og";

export const alt = "Sudeep Sharma";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1d4ed8",
          color: "#f2efe8",
          padding: "56px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Technical product manager · AbleCredit
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            lineHeight: 0.85,
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            fontWeight: 800,
          }}
        >
          <div style={{ display: "flex" }}>Sudeep</div>
          <div style={{ display: "flex" }}>Sharma</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
