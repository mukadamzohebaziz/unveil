import type { ThemeId } from "./themes";

export interface WeddingEvent {
  name: string;
  /** e.g. "2026-02-14" */
  date: string;
  time: string;
  venue: string;
  address: string;
  /**
   * Optional: paste a full Google Maps "Embed a map" <iframe> src here for pixel-exact
   * pin placement. If omitted, an embed is generated automatically from `address`.
   */
  mapEmbedSrc?: string;
  /** Optional: link used by the "Get Directions" button. Defaults to a Maps search for `address`. */
  directionsUrl?: string;
}

export interface InviteConfig {
  /** "hindu" | "muslim" | "christian" | "universal" — can be overridden live with ?theme= */
  theme: ThemeId;
  partnerOne: string;
  partnerTwo: string;
  tagline: string;
  /** Main wedding date, ISO format, used for the hero reveal + countdown. */
  weddingDate: string;
  heroPhoto?: string;
  note: string;
  events: WeddingEvent[];
  rsvp: {
    enabled: boolean;
    /**
     * A form endpoint (e.g. https://formspree.io/f/xxxxxxx) that emails submissions to you.
     * Leave blank to fall back to a mailto: link using `notifyEmail`.
     */
    formEndpoint?: string;
    notifyEmail?: string;
  };
  music?: {
    /** Path under /public, no leading slash, e.g. "audio/theme-song.mp3" — a leading slash breaks GitHub Pages subpath deploys. Leave unset to hide the music toggle. */
    src?: string;
    title?: string;
  };
}

// ---------------------------------------------------------------------------
// EDIT ME — this is the only file most people need to touch to make this
// their own invitation. Swap the sample data below, pick a theme, and the
// whole scroll experience (colors, fonts, opening blessing, motifs) updates
// automatically.
// ---------------------------------------------------------------------------
export const inviteConfig: InviteConfig = {
  theme: "muslim",
  partnerOne: "Zoheb",
  partnerTwo: "Muskan",
  tagline: "request the honour of your presence at their Nikah & Walima",
  weddingDate: "2026-12-27",
  heroPhoto: "",
  note:
    "By the grace of Allah, we are beginning our journey together and would be blessed to have you share this joy with us.",
  events: [
    {
      name: "Nikah Ceremony",
      date: "2026-12-27",
      time: "11:00 AM",
      venue: "Captain House, Dapoli",
      address: "Captain House, Dapoli, Maharashtra 415712",
    },
    {
      name: "Walima Reception",
      date: "2026-12-29",
      time: "11:00 AM",
      venue: "Royal Banquet Hall",
      address: "Royal Banquet Hall, JK Files, MIDC Road, Ratnagiri, Maharashtra 415639",
    },
  ],
  rsvp: {
    enabled: true,
    formEndpoint: "https://formspree.io/f/xzebprgl",
    notifyEmail: "mukadamzohebaziz@gmail.com",
  },
  music: {
    src: "audio/dua-bismillah.mp3",
    title: "Bismillahi Arqeek",
  },
};
