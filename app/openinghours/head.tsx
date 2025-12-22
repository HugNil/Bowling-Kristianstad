const SITE_URL = "https://www.bowlingkristianstad.se";
const OG_IMAGE = "https://www.bowlingkristianstad.se/wp-content/uploads/2017/12/shutterstock_420254671.jpg";

export default function Head() {
  return (
    <>
      <title>Öppettider Bowling Kristianstad</title>
      <meta
        name="description"
        content="Aktuella öppettider för Bowling Kristianstad nära Kristianstad Arena. Se när du kan bowla, discobowla eller boka kalas."
      />
      <link rel="canonical" href={`${SITE_URL}/openinghours`} />
      <meta property="og:title" content="Öppettider Bowling Kristianstad" />
      <meta
        property="og:description"
        content="Aktuella öppettider för Bowling Kristianstad nära Kristianstad Arena. Se när du kan bowla, discobowla eller boka kalas."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/openinghours`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bowling Kristianstad" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Öppettider Bowling Kristianstad" />
      <meta
        name="twitter:description"
        content="Aktuella öppettider för Bowling Kristianstad nära Kristianstad Arena. Se när du kan bowla, discobowla eller boka kalas."
      />
      <meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100046052304741" />
    </>
  );
}
