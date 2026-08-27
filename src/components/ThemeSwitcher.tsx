import { themeOrder, themes, type ThemeId } from "../config/themes";

interface ThemeSwitcherProps {
  current: ThemeId;
  onChange: (theme: ThemeId) => void;
}

/**
 * Demo-only control so visitors browsing this template on GitHub Pages can preview
 * all four religion presets live. Safe to delete once you've picked your theme in
 * src/config/invite.config.ts.
 */
export default function ThemeSwitcher({ current, onChange }: ThemeSwitcherProps) {
  return (
    <div className="fixed left-5 top-5 z-40 flex gap-1 rounded-full border bg-white/70 p-1 backdrop-blur"
      style={{ borderColor: "var(--color-secondary)" }}
    >
      {themeOrder.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className="rounded-full px-3 py-1 font-body text-xs transition"
          style={{
            background: current === id ? "var(--color-primary)" : "transparent",
            color: current === id ? "var(--color-bg)" : "var(--color-text-soft)",
          }}
        >
          {themes[id].label}
        </button>
      ))}
    </div>
  );
}
