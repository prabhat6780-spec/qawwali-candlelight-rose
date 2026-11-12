export const LINKS = {
  instagram: "https://www.instagram.com/sagarthesoul/",
  instagramQawwali: "https://www.instagram.com/sagarkigehrai_/",
  youtube: "https://www.youtube.com/channel/UCKvKYzYGaf8zciOkwypxNTw",
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
  { year: "2026", title: "Canada Tour", text: "Sagar Wali Qawwali crosses the seas and takes the mehfil across Canada." },
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

// Videos from Sagar's YouTube channel (LINKS.youtube). Thumbnails load from YouTube itself.
export type Reel = { id: string; title: string; hindi: string };

export const ytThumb = (id: string, kind: "maxres" | "vertical" = "maxres") =>
  `https://i.ytimg.com/vi/${id}/${kind === "vertical" ? "oardefault" : "maxresdefault"}.jpg`;

export const FEATURED_FILM = {
  id: "8Rr68QxKjPw",
  title: "Canada Tour 2026",
  caption: "Thank you for the love.",
};

export const REELS: Reel[] = [
  { id: "CJ3U3EB2iME", title: "Kisi Aur Ki Ho Jao", hindi: "किसी और की हो जाओ" },
  { id: "8n8ZBLgk7Fg", title: "Sanson Ki Mala", hindi: "साँसों की माला" },
  { id: "hRAHPCog0CM", title: "Mann Ke Jeete Jeet Hai", hindi: "मन के जीते जीत है" },
  { id: "v1YQtwVkwxQ", title: "Kahani", hindi: "कहानी" },
  { id: "S_hC4KO2pI8", title: "Sanu Ek Pal Chain", hindi: "सानू इक पल चैन" },
  { id: "1QSLOE1Virk", title: "Khafa Hua Hi Nahi", hindi: "ख़फ़ा हुआ ही नहीं" },
  { id: "K8nKS3SFoVo", title: "Maa Keh Diya", hindi: "माँ कह दिया" },
  { id: "KqxZteYaxPo", title: "Kisse", hindi: "किस्से" },
  { id: "IeAeTuxLTHM", title: "Biba", hindi: "बीबा" },
  { id: "tTTZGYDTlsY", title: "Struggle", hindi: "संघर्ष" },
  { id: "AiWJfqoTR9U", title: "Addat", hindi: "आदत" },
  { id: "G_AUq9ao3P4", title: "Mohabbat Kya Hai", hindi: "मोहब्बत क्या है" },
];
