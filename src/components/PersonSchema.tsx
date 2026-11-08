import { person } from "@/content/site";

export default function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    alternateName: person.name,
    jobTitle: "Concejala de Floridablanca",
    description: person.bio,
    address: { "@type": "PostalAddress", addressLocality: "Floridablanca", addressRegion: "Santander", addressCountry: "CO" },
    sameAs: Object.values(person.social),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
