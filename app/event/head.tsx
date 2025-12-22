const SITE_URL = "https://www.bowlingkristianstad.se";
const OG_IMAGE = "https://www.bowlingkristianstad.se/wp-content/uploads/2017/12/shutterstock_420254671.jpg";

export default function Head() {
  return (
    <>
      <title>Event & företagsevent i Kristianstad | Bowling Kristianstad</title>
      <meta
        name="description"
        content="Boka företagsevent, kick-off eller kompisgäng hos Bowling Kristianstad. Disco bowling, paket och mat nära Kristianstad Arena."
      />
      <link rel="canonical" href={`${SITE_URL}/event`} />
      <meta property="og:title" content="Event & företagsevent i Kristianstad | Bowling Kristianstad" />
      <meta
        property="og:description"
        content="Boka företagsevent, kick-off eller kompisgäng hos Bowling Kristianstad. Disco bowling, paket och mat nära Kristianstad Arena."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/event`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bowling Kristianstad" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Event & företagsevent i Kristianstad | Bowling Kristianstad" />
      <meta
        name="twitter:description"
        content="Boka företagsevent, kick-off eller kompisgäng hos Bowling Kristianstad. Disco bowling, paket och mat nära Kristianstad Arena."
      />
      <meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100046052304741" />
    </>
  );
}
