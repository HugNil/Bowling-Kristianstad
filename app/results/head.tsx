const SITE_URL = "https://www.bowlingkristianstad.se";

export default function Head() {
  return (
    <>
      <title>Resultat & tävlingar | Bowling Kristianstad</title>
      <meta
        name="description"
        content="Se resultat, ligor och tävlingar hos Bowling Kristianstad. Håll dig uppdaterad på matcher och poäng nära Kristianstad Arena."
      />
      <link rel="canonical" href={`${SITE_URL}/results`} />
      <meta property="og:title" content="Resultat & tävlingar | Bowling Kristianstad" />
      <meta
        property="og:description"
        content="Se resultat, ligor och tävlingar hos Bowling Kristianstad. Håll dig uppdaterad på matcher och poäng nära Kristianstad Arena."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/results`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Resultat & tävlingar | Bowling Kristianstad" />
      <meta
        name="twitter:description"
        content="Se resultat, ligor och tävlingar hos Bowling Kristianstad. Håll dig uppdaterad på matcher och poäng nära Kristianstad Arena."
      />
    </>
  );
}
