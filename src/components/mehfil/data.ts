export const LINKS = {
  instagram: "https://www.instagram.com/sagarthesoul/",
  instagramQawwali: "https://www.instagram.com/sagarkigehrai_/",
  youtube: "https://www.youtube.com/@SagarBhatiaOfficial",
  spotify: "https://open.spotify.com/search/Sagar%20Bhatia",
};

export type Track = {
  no: string;
  title: string;
  note: string;
  year: string;
  hue: string; // label colour token class
};

export const TRACKS: Track[] = [
  { no: "01", title: "Khudaya", note: "From the film “Sarfira”", year: "2024", hue: "bg-marigold" },
  { no: "02", title: "Aakhri Salaam", note: "From “De De Pyaar De 2”", year: "2025", hue: "bg-rose" },
  { no: "03", title: "Raazdaariyan", note: "Single", year: "2025", hue: "bg-gold" },
  { no: "04", title: "Mera Ishq", note: "Original single", year: "2023", hue: "bg-ember" },
  { no: "05", title: "Kaali Raat", note: "Single", year: "2022", hue: "bg-gold-soft" },
  { no: "06", title: "Channa Mereya", note: "Sufi version · ft. Kanha Kamboj", year: "2024", hue: "bg-rose" },
  { no: "07", title: "Shukran Allah", note: "Sufi version · ft. Kanha Kamboj", year: "2024", hue: "bg-marigold" },
];

export const TIMELINE = [
  { year: "2007", title: "The guitarist", text: "Starts out in Mumbai, playing guitar for Narendra Chanchal at jagrans." },
  { year: "2014", title: "India’s Raw Star", text: "Reaches the top six on national television." },
  { year: "2015", title: "Right Note", text: "Founds his own company devoted to Sufi music." },
  { year: "2022", title: "Sagar Wali Qawwali", text: "2 July, Studio XO — the first mehfil under the name that changed everything." },
  { year: "2024", title: "Khudaya", text: "Playback debut in Akshay Kumar’s “Sarfira”." },
  { year: "Now", title: "The world stage", text: "5000+ live shows, from Delhi to Dubai’s Coca-Cola Arena." },
];

// Placeholder dates — replace with real tour dates.
export const SHOWS = [
  { day: "06", month: "Dec", year: "2026", city: "New Delhi", country: "India" },
  { day: "20", month: "Dec", year: "2026", city: "Mumbai", country: "India" },
  { day: "10", month: "Jan", year: "2027", city: "Dubai", country: "UAE" },
  { day: "24", month: "Jan", year: "2027", city: "Bengaluru", country: "India" },
  { day: "07", month: "Feb", year: "2027", city: "London", country: "UK" },
];
