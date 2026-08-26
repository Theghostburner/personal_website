import { ImageResponse } from "next/og";

export const alt = "Sudeep Sharma — IIT Kharagpur, founder of Clarion";
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
          background: "#161310",
          color: "#f3eee4",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.7 }}>
          IIT Kharagpur · Clarion · Computer Graphics Society
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, letterSpacing: "-0.04em", lineHeight: 0.95 }}>Sudeep Sharma</div>
          <div style={{ marginTop: 24, fontSize: 28, maxWidth: 820, opacity: 0.82, lineHeight: 1.35 }}>
            Engineer and founder. Dual degree from IIT Kharagpur. Building Clarion so engineering teams
            spend less time chasing work.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
