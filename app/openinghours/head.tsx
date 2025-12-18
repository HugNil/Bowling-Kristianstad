const SITE_URL = "https://www.bowlingkristianstad.se";

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
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Öppettider Bowling Kristianstad" />
      <meta
        name="twitter:description"
        content="Aktuella öppettider för Bowling Kristianstad nära Kristianstad Arena. Se när du kan bowla, discobowla eller boka kalas."
      />
    </>
  );
}
