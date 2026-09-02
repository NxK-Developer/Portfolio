import { ImageResponse } from "next/og";

export const alt = "Nxk Developer — Creative Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #06060a 0%, #0e1019 55%, #12122a 100%)",
          color: "#edeef3",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* top */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1.5px solid rgba(139,123,255,0.4)",
              background: "rgba(139,123,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#b7abff",
            }}
          >
            N
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Nxk Developer
          </div>
        </div>

        {/* title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Digital experiences
          </div>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#8b7bff" }}>
            that feel alive.
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#9ea1ad",
            }}
          >
            <span style={{ width: 48, height: 2, background: "#8b7bff" }} />
            Interactive portfolio · Projects · Creative web experiences
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 17,
            color: "#63666f",
            letterSpacing: "0.15em",
          }}
        >
          <span>N X K</span>
          <span>BUILT WITH KHUSHI</span>
        </div>
      </div>
    ),
    size
  );
}
