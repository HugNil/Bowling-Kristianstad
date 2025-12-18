const SITE_URL = "https://www.bowlingkristianstad.se";

export default function Head() {
  return (
    <>
      <title>Priser bowling i Kristianstad | Bowling Kristianstad</title>
      <meta
        name="description"
        content="Se priser för bowling, disco bowling och bokningspaket hos Bowling Kristianstad nära Kristianstad Arena. Skohyra ingår."
      />
      <link rel="canonical" href={`${SITE_URL}/pricing`} />
      <meta property="og:title" content="Priser bowling i Kristianstad | Bowling Kristianstad" />
      <meta
        property="og:description"
        content="Se priser för bowling, disco bowling och bokningspaket hos Bowling Kristianstad nära Kristianstad Arena. Skohyra ingår."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/pricing`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Priser bowling i Kristianstad | Bowling Kristianstad" />
      <meta
        name="twitter:description"
        content="Se priser för bowling, disco bowling och bokningspaket hos Bowling Kristianstad nära Kristianstad Arena. Skohyra ingår."
      />
    </>
  );
}
