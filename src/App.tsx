import { useEffect, useMemo, useState } from "react";
import { inviteConfig } from "./config/invite.config";
import { demoPresets } from "./config/demoPresets";
import { themes, type ThemeId } from "./config/themes";
import { applyUrlOverrides } from "./lib/overrides";
import Cover from "./components/Cover";
import OpeningBlessing from "./components/OpeningBlessing";
import NamesHero from "./components/NamesHero";
import DateReveal from "./components/DateReveal";
import MapSection from "./components/MapSection";
import RSVP from "./components/RSVP";
import MusicToggle from "./components/MusicToggle";
import Ornament from "./components/Ornament";

function getInitialTheme(): ThemeId {
  const param = new URLSearchParams(window.location.search).get("theme");
  if (param && param in themes) return param as ThemeId;
  return inviteConfig.theme;
}

export default function App() {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme);
  const [opened, setOpened] = useState(false);
  const theme = themes[themeId];
  // Editing invite.config.ts always wins for its own theme. Previewing a
  // different theme via the switcher shows that theme's full demo couple,
  // so flipping themes never looks mismatched (real names under a
  // different theme's colors/blessing).
  const config = useMemo(() => {
    const base = themeId === inviteConfig.theme ? inviteConfig : demoPresets[themeId];
    return applyUrlOverrides(base);
  }, [themeId]);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <div data-theme={themeId} className="min-h-dvh w-full" style={{ background: "var(--color-backdrop)" }}>
      <div className="card-texture relative mx-auto min-h-dvh w-full max-w-[480px] overflow-hidden shadow-2xl sm:my-8 sm:min-h-[calc(100dvh-4rem)] sm:rounded-sm">
        <Cover partnerOne={config.partnerOne} partnerTwo={config.partnerTwo} onOpen={() => setOpened(true)} />
        <MusicToggle src={config.music?.src} armed={opened} />

        <main className="relative">
          <OpeningBlessing theme={theme} />
          <NamesHero
            partnerOne={config.partnerOne}
            partnerTwo={config.partnerTwo}
            tagline={config.tagline}
            theme={theme}
          />

          {config.heroPhoto && (
            <section className="relative flex flex-col items-center px-6 py-10">
              <div
                className="h-64 w-64 overflow-hidden rounded-full border-4 sm:h-72 sm:w-72"
                style={{ borderColor: "var(--color-secondary)", boxShadow: "0 0 0 1px var(--color-silver)" }}
              >
                <img
                  src={config.heroPhoto}
                  alt={`${config.partnerOne} & ${config.partnerTwo}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </section>
          )}

          <section className="relative flex flex-col items-center gap-6 px-6 py-14 text-center">
            <Ornament motif={theme.motif} className="h-8 w-32" />
            <p
              className="font-body max-w-xl text-lg italic leading-relaxed"
              style={{ color: "var(--color-text-soft)" }}
            >
              {config.note}
            </p>
          </section>

          <DateReveal weddingDate={config.weddingDate} events={config.events} theme={theme} />
          <MapSection events={config.events} />
          <RSVP rsvp={config.rsvp} partnerOne={config.partnerOne} partnerTwo={config.partnerTwo} />

          <footer className="relative flex flex-col items-center gap-3 px-6 py-14 text-center">
            <Ornament motif={theme.motif} className="h-8 w-32" />
            <p className="font-script text-3xl" style={{ color: "var(--color-primary)" }}>
              {config.partnerOne} &amp; {config.partnerTwo}
            </p>
            <p className="font-body text-sm" style={{ color: "var(--color-text-soft)" }}>
              See you there
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
