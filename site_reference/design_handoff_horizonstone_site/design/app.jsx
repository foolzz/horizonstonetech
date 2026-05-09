/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle */
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#F4F6F8", "#0F1B2D", "#3D6B8C"],
  "headlineStyle": "editorial",
  "showAgent": true
}/*EDITMODE-END*/;

// [bg, ink, accent] — cool tones
const PALETTES = [
  ["#F4F6F8", "#0F1B2D", "#3D6B8C"], // Glacier — slate on cool gray
  ["#EEF1F5", "#101820", "#0E7C7B"], // Slate + Teal
  ["#F2F4F7", "#1A2433", "#5A7A99"], // Mist + Steel blue
  ["#0B1220", "#E6ECF2", "#6FA8DC"], // Deep navy + Ice
  ["#0E1418", "#DCE3EA", "#7AB8B3"], // Graphite + Seafoam
];

// Quick luminance check — light bgs need different secondary ink alphas
const isLight = (hex) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 160;
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bg, ink, accent] = t.palette;

  // Apply palette via CSS vars
  React.useEffect(() => {
    const r = document.documentElement;
    const light = isLight(bg);
    r.style.setProperty("--bg", bg);
    r.style.setProperty("--ink", ink);
    r.style.setProperty("--accent", accent);
    // derive secondary inks (lighter bgs need slightly stronger alphas to read)
    r.style.setProperty("--ink-2", ink + (light ? "C2" : "B0"));
    r.style.setProperty("--ink-3", ink + (light ? "80" : "60"));
    r.style.setProperty("--line", ink + (light ? "22" : "1A"));
    r.style.setProperty("--line-2", ink + (light ? "38" : "2E"));
    r.style.setProperty("--bg-2", bg);
    document.body.dataset.theme = light ? "light" : "dark";
  }, [bg, ink, accent]);

  return (
    <>
      <Nav />
      <Hero headlineStyle={t.headlineStyle} />
      <Services />
      <Process />
      <Cases />
      <Approach />
      <CTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakColor
            label="Theme"
            value={t.palette}
            onChange={(v) => setTweak("palette", v)}
            options={PALETTES}
          />
        </TweakSection>
        <TweakSection title="Hero headline">
          <TweakRadio
            label="Style"
            value={t.headlineStyle}
            onChange={(v) => setTweak("headlineStyle", v)}
            options={[
              { label: "Editorial", value: "editorial" },
              { label: "Bold", value: "bold" },
              { label: "Technical", value: "technical" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
