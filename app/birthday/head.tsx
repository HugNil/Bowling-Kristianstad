const SITE_URL = "https://www.bowlingkristianstad.se";
const OG_IMAGE = "https://www.bowlingkristianstad.se/wp-content/uploads/2017/12/shutterstock_420254671.jpg";

export default function Head() {
  return (
    <>
      <title>Bowlingkalas i Kristianstad | Barnkalas & paket</title>
      <meta
        name="description"
        content="Fira barnkalas hos Bowling Kristianstad med disco bowling, paket och mat nära Kristianstad Arena. Boka enkelt och skapa minnen!"
      />
      <link rel="canonical" href={`${SITE_URL}/birthday`} />
      <meta property="og:title" content="Bowlingkalas i Kristianstad | Barnkalas & paket" />
      <meta
        property="og:description"
        content="Fira barnkalas hos Bowling Kristianstad med disco bowling, paket och mat nära Kristianstad Arena. Boka enkelt och skapa minnen!"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/birthday`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bowling Kristianstad" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Bowlingkalas i Kristianstad | Barnkalas & paket" />
      <meta
        name="twitter:description"
        content="Fira barnkalas hos Bowling Kristianstad med disco bowling, paket och mat nära Kristianstad Arena. Boka enkelt och skapa minnen!"
      />
      <meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100046052304741" />
    </>
  );
}
