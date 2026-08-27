import type { ThemeId } from "../config/themes";

interface ThemeSwitcherProps {
  current: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemeSwitcher({ current, onChange }: ThemeSwitcherProps) {
  return null; // <--- Hides the theme switcher completely
}
