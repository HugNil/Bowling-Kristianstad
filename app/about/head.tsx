const SITE_URL = "https://www.bowlingkristianstad.se";

export default function Head() {
  return (
    <>
      <title>Om Bowling Kristianstad – historia och upplevelser</title>
      <meta
        name="description"
        content="Lär känna Bowling Kristianstad: moderna banor, disco bowling och evenemang nära Kristianstad Arena."
      />
      <link rel="canonical" href={`${SITE_URL}/about`} />
      <meta property="og:title" content="Om Bowling Kristianstad – historia och upplevelser" />
      <meta
        property="og:description"
        content="Lär känna Bowling Kristianstad: moderna banor, disco bowling och evenemang nära Kristianstad Arena."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/about`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Om Bowling Kristianstad – historia och upplevelser" />
      <meta
        name="twitter:description"
        content="Lär känna Bowling Kristianstad: moderna banor, disco bowling och evenemang nära Kristianstad Arena."
      />
    </>
  );
}
