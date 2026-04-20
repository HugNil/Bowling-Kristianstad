export const SITE_URL = "https://www.bowlingkristianstad.se";
export const SITE_NAME = "Bowling Kristianstad";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-bowling-lanes.jpg`;
export const EVENT_OG_IMAGE = `${SITE_URL}/event-bowling-drinks.jpg`;
export const BIRTHDAY_OG_IMAGE = `${SITE_URL}/gemini_birthday.png`;
export const LOGO_IMAGE = `${SITE_URL}/bowlit-150x150.png`;

export const business = {
  name: SITE_NAME,
  telephone: "+4644122215",
  displayTelephone: "044-12 22 15",
  email: "bowlingkristianstad@hotmail.se",
  streetAddress: "Karlavägen 2",
  postalCode: "291 54",
  addressLocality: "Kristianstad",
  addressRegion: "Skåne",
  addressCountry: "SE",
  latitude: 56.0234928,
  longitude: 14.1632581,
  priceRange: "140-3400 SEK",
  mapUrl: "https://www.google.com/maps?q=56.0234928,14.1632581",
  facebookUrl: "https://www.facebook.com/profile.php?id=100046052304741",
};

export const routeSeo = {
  home: {
    path: "/",
    title: "Bowling Kristianstad | Bowlinghall vid Kristianstad Arena",
    description:
      "Bowla i Kristianstad nära Kristianstad Arena. Se priser, öppettider, barnkalas, festpaket, företagsevent och discobowling hos Bowling Kristianstad.",
    image: DEFAULT_OG_IMAGE,
  },
  about: {
    path: "/about",
    title: "Om Bowling Kristianstad | Bowlinghall i Kristianstad",
    description:
      "Lär känna Bowling Kristianstad: bowlinghall nära Kristianstad Arena med moderna banor, discobowling, barnkalas, fest och företagsevent.",
    image: DEFAULT_OG_IMAGE,
  },
  pricing: {
    path: "/pricing",
    title: "Priser bowling i Kristianstad | Bowling Kristianstad",
    description:
      "Se aktuella priser för bowling i Kristianstad. Skohyra ingår, och du hittar priser för vardagar, kvällar, helger och skolor.",
    image: DEFAULT_OG_IMAGE,
  },
  openingHours: {
    path: "/openinghours",
    title: "Öppettider Bowling Kristianstad | Aktuella tider",
    description:
      "Aktuella öppettider för Bowling Kristianstad nära Kristianstad Arena. Se när du kan bowla, discobowla eller boka kalas och event.",
    image: DEFAULT_OG_IMAGE,
  },
  birthday: {
    path: "/birthday",
    title: "Bowlingkalas i Kristianstad | Barnkalas & paket",
    description:
      "Fira barnkalas hos Bowling Kristianstad med bowling, mat, glass och godispåse. Se paket, pris och bokningsinformation för bowlingkalas.",
    image: BIRTHDAY_OG_IMAGE,
  },
  event: {
    path: "/event",
    title: "Fest & företagsevent i Kristianstad | Bowling Kristianstad",
    description:
      "Boka fest, kick-off eller företagsevent hos Bowling Kristianstad. Bowling, mat, quiz och möjlighet att boka hela hallen nära Kristianstad Arena.",
    image: EVENT_OG_IMAGE,
  },
  results: {
    path: "/results",
    title: "Resultat & föreningar | Bowling Kristianstad",
    description:
      "Se resultat, tävlingar, ligor och föreningar hos Bowling Kristianstad. Hitta länkar till aktuella bowlingresultat och klubbar.",
    image: DEFAULT_OG_IMAGE,
  },
} as const;

export const keywords = [
  "bowling Kristianstad",
  "bowlinghall Kristianstad",
  "bowla Kristianstad",
  "discobowling Kristianstad",
  "bowling priser Kristianstad",
  "bowling öppettider Kristianstad",
  "bowlingkalas Kristianstad",
  "barnkalas Kristianstad",
  "företagsevent Kristianstad",
  "fest Kristianstad",
  "Kristianstad Arena",
];

export const openingHoursSpecification = [
  { dayOfWeek: "Monday", opens: "09:30", closes: "20:00" },
  { dayOfWeek: "Tuesday", opens: "11:00", closes: "20:00" },
  { dayOfWeek: "Wednesday", opens: "09:30", closes: "20:00" },
  { dayOfWeek: "Thursday", opens: "11:00", closes: "20:00" },
  { dayOfWeek: "Friday", opens: "14:00", closes: "19:00" },
  { dayOfWeek: "Saturday", opens: "13:00", closes: "19:00" },
  { dayOfWeek: "Sunday", opens: "13:00", closes: "18:00" },
];

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
