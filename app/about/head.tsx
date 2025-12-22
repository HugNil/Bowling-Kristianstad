const SITE_URL = "https://www.bowlingkristianstad.se";
const OG_IMAGE = "https://www.bowlingkristianstad.se/wp-content/uploads/2017/12/shutterstock_420254671.jpg";

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
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bowling Kristianstad" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Om Bowling Kristianstad – historia och upplevelser" />
      <meta
        name="twitter:description"
        content="Lär känna Bowling Kristianstad: moderna banor, disco bowling och evenemang nära Kristianstad Arena."
      />
      <meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100046052304741" />
    </>
  );
}
