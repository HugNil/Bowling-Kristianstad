export type Locale = "sv" | "en";

export const stringsSv = {
  site: {
    name: "Bowling Kristianstad",
  },

  // Header navigation
  header: {
    home: "Hem",
    pricing: "Priser",
    openingHours: "Öppettider",
    about: "Om Oss",
    birthday: "Kalas & Party",
    event: "Fest & Mat",
    results: "Resultat & Föreningar",
  },

  // Contact information
  contact: {
    heading: "Kontakta Oss",
    addressTitle: "Besöksadress",
    addressLines: ["Karlavägen 2", "291 54 Kristianstad"],
    contactTitle: "Kontaktuppgifter",
    phoneLabel: "Telefon",
    phone: "044-12 22 15",
    emailLabel: "E-post",
    email: "bowlingkristianstad@hotmail.se",
  },

  // Home page
  home: {
    heroTitle: "Välkommen till Bowling Kristianstad",
    heroSubtitle: "Upplev den bästa bowlingen i Kristianstad med moderna banor och fantastisk atmosfär",
    heroPrimaryCta: "Se Priser",
    heroSecondaryCta: "Om Oss",
    featuresTitle: "Varför Välja Oss?",
    features: [
      {
        icon: "🎳",
        title: "Hög kvalitet",
        body: "Våra bowlingbanor är noggrant underhållna för att ge dig en spelupplevelse i toppklass.",
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Familjevänligt",
        body: "Perfekt för hela familjen! Vi har bowling för alla åldrar och erfarenhetsnivåer.",
      },
      {
        icon: "🍕",
        title: "Mat & Dryck",
        body: "Vid bokade evenemang erbjuder vi mat och dryck enligt överenskommelse.",
      },
    ],
    ctaTitle: "Redo att Börja Bowla?",
    ctaBody: "Boka din bana idag och upplev den bästa bowlingen i Kristianstad!",
    ctaButton: "Se Våra Priser",
    mapHeading: "Här finns vi",
  },

  // About page
  about: {
    heroTitle: "Om Bowling Kristianstad",
    heroSubtitle: "Din favoritbowlinghall i hjärtat av Kristianstad",
    historyTitle: "Vår Historia",
    historyParagraphs: [
      "Bowling Kristianstad har varit en del av stadens underhållningsliv i många år. Vi är stolta över att erbjuda en välkomnande och trivsam miljö där familjer, vänner och företag kan samlas för roliga och minnesvärda stunder.",
      "Med våra moderna bowlingbanor och utrustning garanterar vi en fantastisk spelupplevelse för både nybörjare och erfarna spelare.",
      "Utöver bowling erbjuder vi möjlighet att boka fest, kalas och andra speciella tillfällen. För barnkalas serverar vi enklare mat som hamburgare eller korv, anpassat för de yngre gästerna.",
      "Vid fester och företagsevent ordnar vi maten genom catering eller pizza, vilket gör det enkelt att skräddarsy arrangemanget efter önskemål.",
    ],
    fallbackCardTitle: "Moderna Bowlingbanor",
  },

  // Opening Hours page
  openingHours: {
    heroTitle: "Våra Öppettider",
    heroSubtitle: "Här hittar du våra aktuella öppettider för Bowling Kristianstad. Välkommen in för en rolig stund!",
    secondaryTitle: "Öppettider",
    infoTitle: "Bra att veta!",
    infoParagraphs: [
      "Vi förbehåller oss rätten att ändra öppettider vid helgdagar och speciella evenemang vid låg beläggning. Kontakta oss gärna för att få den senaste informationen.",
      "Max <strong>5</strong> personer per bana för att garantera en bra spelupplevelse för alla. Övriga personer i sällskapet är välkomna att kolla på utanför banområdet.",
      "Vi har discobowling varje fredag från kl. 18:00 och lördagar/söndagar från kl. 14:00 tills stängning. Under discobowlingen är det hög musik och blinkande lampor, vilket kan påverka spelupplevelsen.",
      "1 timme består av 57 minuter speltid.",
      "Kom ihåg att boka din bana i förväg, särskilt under helger och lov, för att säkerställa att ni får plats när ni vill spela.",
    ],
    bookTitle: "Boka Nu!",
    bookBody: "Ring oss för att boka din bana eller skicka ett mail så hjälper vi dig.",
    body1: "Ring oss på",
    body2: "eller maila oss",
    bookNote: "Skohyra ingår i priset. Vi tar emot Swish och Kontant.",
  },

  // Pricing page
  pricing: {
    heroTitle: "Våra Priser",
    heroSubtitle: "Vi erbjuder konkurrenskraftiga priser för alla tillfällen. Kontakta oss för större bokningar och specialerbjudanden.",
    bookTitle: "Boka Nu!",
    bookBody: "Ring oss för att boka din bana eller skicka ett mail så hjälper vi dig.",
    bookNote: "Skohyra ingår i priset. Vi tar emot Swish och Kontant.",
  },
  event: {
    heroTitle: "Event & Företagsevent",
    heroSubtitle: "Boka företagsevent, kick-off eller kompisgäng hos Bowling Kristianstad nära Kristianstad Arena.",
    introTitle: "Bowling och mat, fest i allmänhet till otroligt låga priser",
    introParagraph1: "Företag, privat eller förening? Spelar ingen roll. Vi har möjlighet att erbjuda bowling och mat till otroligt låga priser. Vi har fullständiga rättigheter för slutna sällskap (för mer information ring: ",
    introParagraph1Link: "). Önskas lugn och ro har Ni möjlighet att boka hela hallen för privat fest under 3 eller 4 timmar.",
    introParagraph2: "Bowling & mat och varför inte en extratävling, vi kör gärna en musikquiz för er utan extra kostnad.",
    tailorText: "Vi skräddarsyr er fest.",
    arrangementText: "För att vi skall kunna arrangera Er fest så bra som möjligt...",
    contactText: "ring oss för mer information och bokning",
    priceTitle: "Pris: hela bowlinghallen för er själva.",
    priceBowlingTime: "(1 timmes bowligtid)",
    menuTitle: "Menyalternativ",
  },
  birthday: {
    heroTitle: "Bowlingkalas",
    heroSubtitle: "Fira barnkalas med discobowling, paket och mat hos Bowling Kristianstad nära Kristianstad Arena.",
    introTitle: "Barnkalas eller tonårsparty?",
    introParagraph1: "Ditt barn är i centrum för ett par timmar tillsammans med vänner, ",
    introParagraph2: "medan vi tar hand om kalaset och skapar en fantastisk, trygg och minnesvärd upplevelse.",
    introParagraphs: [
      "Vi börjar med att barnen samlas och födelsedagsbarnet/barnen får sina presenter.",
      "Sedan serveras dryck (läsk med eller utan kolsyra).",
      "Därefter blir det dags för mat – korv eller hamburgare (samma till hela gänget, som beställs vid bokning). Vid matallergi finns ytterligare möjligheter.",
      "På med bowlingskorna och alla barn bowlar en hel timme.",
      "Trötta efter allt bowlande så blir det glass till efterrätt, och samtidigt får alla barn sina bowlingresultat på papper.",
      "Kalaset avslutas med present till födelsedagsbarnet och en godispåse till alla barn (ca 2 timmar).",
    ],
    includesTitle: "Detta ingår:",
    includesList: [
      "Läsk 50 cl",
      "Korv eller hamburgare",
      "Glass",
      "Godispåse",
      "Present till födelsedagsbarnet",
      "Bowling 3–5 barn/bana",
      "Kaffe & te till födelsedagsbarnets föräldrar",
      "Personal & service ingår – en ansvarig vuxen från ert sällskap måste finnas på plats under hela kalaset.",
    ],
    cardsLeft: [
      { title: "Personal", body: "Personal kommer finnas tillgänglig under hela tiden men minst en ansvarig vuxen från ert sällskap måste finnas på plats under hela kalaset." },
    ],
    cardsRight: [
      { title: "Tid", body: "Kalaset pågår i ca 2 timmar." },
    ],
    calculator: {
      title: "Beräkna Pris",
      childrenLabel: "Antal barn",
      menuLabel: "Välj meny",
      extrasLabel: "Tillval",
      totalPrice: "Totalt pris",
      perChild: "per barn",
      bookButton: "Boka nu",
      bookNote: "Ring oss på 044-12 22 15 för att slutföra bokningen",
      bookingCTA1: "Ring oss så hjälper vi dig att boka och ",
      bookingCTA2: "kolla lediga datum!",
    },
  },

  // Results page
  results: {
    title: "Resultat & Föreningar",
    subtitle: "Håll koll på dina bowlingresultat och våra föreningar",
    associationsTitle: "Våra Föreningar",
    associationsDescription: "Hos Bowling Kristianstad har vi flera aktiva bowlingföreningar som välkomnar nya medlemmar:",
    externalLinksTitle: "Externa Länkar",
    externalLinksDescription: "Kolla in resultat och information från våra partners:",
  },
};


// English translations
export const stringsEn = {
  site: {
    name: "Bowling Kristianstad",
  },

  // Header navigation
  header: {
    home: "Home",
    pricing: "Pricing",
    openingHours: "Opening Hours",
    about: "About Us",
    birthday: "Birthday & Party",
    event: "Party & Food",
    results: "Results & Clubs",
  },

  // Contact information
  contact: {
    heading: "Contact Us",
    addressTitle: "Address",
    addressLines: ["Karlavägen 2", "291 54 Kristianstad"],
    contactTitle: "Contact Info",
    phoneLabel: "Phone",
    phone: "044-12 22 15",
    emailLabel: "Email",
    email: "bowlingkristianstad@hotmail.se",
  },

  // Home page
  home: {
    heroTitle: "Welcome to Bowling Kristianstad",
    heroSubtitle: "Experience the best bowling in Kristianstad with modern lanes and fantastic atmosphere",
    heroPrimaryCta: "View Pricing",
    heroSecondaryCta: "About Us",
    featuresTitle: "Why Choose Us?",
    features: [
      {
        icon: "🎳",
        title: "High Quality",
        body: "Our bowling lanes are meticulously maintained to give you a top-class bowling experience.",
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Family Friendly",
        body: "Perfect for the whole family! We have bowling for all ages and skill levels.",
      },
      {
        icon: "🍕",
        title: "Food & Drinks",
        body: "For booked events, we offer food and drinks by arrangement.",
      },
    ],
    ctaTitle: "Ready to Start Bowling?",
    ctaBody: "Book your lane today and experience the best bowling in Kristianstad!",
    ctaButton: "View Our Pricing",
    mapHeading: "Find Us Here",
  },

  // About page
  about: {
    heroTitle: "About Bowling Kristianstad",
    heroSubtitle: "Your favorite bowling hall in the heart of Kristianstad",
    historyTitle: "Our Story",
    historyParagraphs: [
      "Bowling Kristianstad has been part of the city's entertainment scene for many years. We are proud to offer a welcoming and comfortable environment where families, friends, and businesses can gather for fun and memorable moments.",
      "With our modern bowling lanes and equipment, we guarantee a fantastic bowling experience for both beginners and experienced players.",
      "In addition to bowling, we offer the possibility to book parties, birthday celebrations, and other special occasions. For children's parties, we serve simple food such as hamburgers or hot dogs, tailored for younger guests.",
      "For parties and corporate events, we arrange catering or pizza, making it easy to customize the arrangement according to your wishes.",
    ],
    fallbackCardTitle: "Modern Bowling Lanes",
  },

  // Opening Hours page
  openingHours: {
    heroTitle: "Our Opening Hours",
    heroSubtitle: "Find our current opening hours for Bowling Kristianstad. Welcome in for a fun time!",
    secondaryTitle: "Opening Hours",
    infoTitle: "Good to Know!",
    infoParagraphs: [
      "We reserve the right to change opening hours during holidays and special events with low occupancy. Feel free to contact us for the latest information.",
      "Maximum <strong>5</strong> players per lane to guarantee a good bowling experience for everyone. Other people in your group are welcome to watch from outside of the lane area.",
      "We have disco bowling every Friday from 6 PM and Saturdays/Sundays from 2 PM until closing. During disco bowling, there is loud music and flashing lights, which may affect the bowling experience.",
      "1 hour consists of 57 minutes of playtime.",
      "Remember to book your lane in advance, especially during weekends and holidays, to ensure you get a spot when you want to play.",
    ],
    bookTitle: "Book Now!",
    bookBody: "Call us to book your lane or send an email and we'll help you.",
    body1: "Call us at",
    body2: "or email us",
    bookNote: "Shoe rental is included in the price. We accept Swish and Cash.",
  },

  // Pricing page
  pricing: {
    heroTitle: "Our Pricing",
    heroSubtitle: "We offer competitive prices for all occasions. Contact us for larger bookings and special offers.",
    bookTitle: "Book Now!",
    bookBody: "Call us to book your lane or send an email and we'll help you.",
    bookNote: "Shoe rental is included in the price. We accept Swish and Cash.",
  },
  event: {
    heroTitle: "Events & Corporate Events",
    heroSubtitle: "Book corporate events, kick-offs, or group gatherings at Bowling Kristianstad near Kristianstad Arena.",
    introTitle: "Bowling and food, parties at incredibly low prices",
    introParagraph1: "Company, private or association? It does not matter. We have the ability to offer bowling and food at incredibly low prices. We have complete rights for closed gatherings (for more information call: ",
    introParagraph1Link: "). If you wish peace and quiet, you have the opportunity to book the entire hall for a private party for 3 or 4 hours.",
    introParagraph2: "Bowling & food and why not an extra bowling, we happily run a music quiz for you at no extra cost.",
    tailorText: "We tailor your party.",
    arrangementText: "For us to arrange your party as well as possible...",
    contactText: "call us for more information and booking",
    priceTitle: "Price: entire bowling alley for you.",
    priceBowlingTime: "(1 hour bowling time)",
    menuTitle: "Menu Options",
  },
  birthday: {
    heroTitle: "Bowling Party",
    heroSubtitle: "Celebrate a birthday with disco bowling, packages, and food at Bowling Kristianstad near Kristianstad Arena.",
    introTitle: "Kids party or teen party?",
    introParagraph1: "Your child is the center of attention for a couple of hours together with friends,",
    introParagraph2: "while we take care of the party and create a fantastic, safe, and memorable experience.",
    introParagraphs: [
      "We start with gathering the group and handing out presents to the birthday child/children.",
      "Then drinks are served (soda with or without carbonation).",
      "Next it's time for food – hot dogs or hamburgers (same choice for the whole group, decided when booking). Additional options are available for food allergies.",
      "Put on the bowling shoes and all the children bowl for a full hour.",
      "Tired after all the bowling, there is ice cream for dessert, and at the same time all the children receive their bowling results on paper.",
      "The party ends with a present for the birthday child and a candy bag for all children (about 2 hours).",
    ],
    includesTitle: "Included:",
    includesList: [
      "Soda 50 cl",
      "Hot dog or hamburger",
      "Ice cream",
      "Candy bag",
      "Present for the birthday child",
      "Bowling 3–5 kids/lane",
      "Coffee & tea for the birthday child’s parents",
      "Staff & service included – one responsible adult from your group must be present during the entire party.",
    ],
    cardsLeft: [
      { title: "Staff", body: "Our staff will be available throughout the party, but at least one responsible adult from your group must be present during the entire event." },
    ],
    cardsRight: [
      { title: "Time", body: "The party lasts about 2 hours." },
    ],
    calculator: {
      title: "Calculate Price",
      childrenLabel: "Number of children",
      menuLabel: "Choose menu",
      extrasLabel: "Add-ons",
      totalPrice: "Total price",
      perChild: "per child",
      bookButton: "Book now",
      bookNote: "Call us at 044-12 22 15 to complete your booking",
      bookingCTA1: "Call us and we will help you to book and ",
      bookingCTA2: "check available dates!",
    },
  },

  // Results page
  results: {
    title: "Results & Associations",
    subtitle: "Keep track of your bowling results and our associations",
    associationsTitle: "Our Associations",
    associationsDescription: "At Bowling Kristianstad we have several active bowling associations that welcome new members:",
    externalLinksTitle: "External Links",
    externalLinksDescription: "Check out results and information from our partners:",
  },
};

export const strings = stringsSv;

export function getStrings(lang: Locale) {
  return lang === "en" ? stringsEn : stringsSv;
}
