import type { ThemeId } from "../config/themes";

interface ThemeSwitcherProps {
  current: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemeSwitcher({ _current, _onChange }: { _current?: ThemeId; _onChange?: (theme: ThemeId) => void } | ThemeSwitcherProps) {
  return null;
}
