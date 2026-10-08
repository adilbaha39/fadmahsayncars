export interface Car {
  id: string;
  name: string;
  image: string;
  transmission: "manual" | "automatic";
  seats: number;
  price: number;
  category: "economy" | "suv" | "compact" | "family";
}

export const cars: Car[] = [
  { id: "duster-manual", name: "Duster", image: "cars1.jpeg", transmission: "manual", seats: 5, price: 400, category: "suv" },
  { id: "sandero", name: "Sandero", image: "cars2.jpeg", transmission: "manual", seats: 5, price: 300, category: "economy" },
  { id: "accent-manual", name: "Accent", image: "cars3.jpeg", transmission: "manual", seats: 5, price: 350, category: "compact" },
  { id: "grand-i10", name: "Grand i10", image: "cars4.jpeg", transmission: "manual", seats: 5, price: 350, category: "economy" },
  { id: "accent-auto", name: "Accent Auto", image: "cars5.jpeg", transmission: "automatic", seats: 5, price: 400, category: "compact" },
  { id: "logan", name: "Logan", image: "cars6.jpeg", transmission: "manual", seats: 5, price: 300, category: "economy" },
  { id: "stepway", name: "Stepway", image: "cars7.jpeg", transmission: "manual", seats: 5, price: 300, category: "economy" },
  { id: "jogger", name: "Jogger", image: "cars9.jpeg", transmission: "manual", seats: 7, price: 400, category: "family" },
  { id: "clio5-manual", name: "Clio 5", image: "cars14.jpeg", transmission: "manual", seats: 5, price: 300, category: "compact" },
  { id: "clio5-auto", name: "Clio 5 Auto", image: "cars15.jpeg", transmission: "automatic", seats: 5, price: 300, category: "compact" },
  { id: "creta", name: "Creta", image: "cars16.jpeg", transmission: "automatic", seats: 5, price: 450, category: "suv" },
  { id: "haval", name: "Haval", image: "cars17.jpeg", transmission: "automatic", seats: 5, price: 450, category: "suv" },
  { id: "duster-auto", name: "Duster Auto", image: "cars18.jpeg", transmission: "automatic", seats: 5, price: 450, category: "suv" },
  { id: "tucson", name: "Tucson", image: "cars20.jpeg", transmission: "automatic", seats: 5, price: 600, category: "suv" },
];

export const agencies = [
  {
    id: "marrakech",
    name: { fr: "MARRAKECH MENARA", ar: "مطار مراكش المنارة", en: "MARRAKECH MENARA" },
    label: { fr: "AÉROPORT", ar: "مطار", en: "AIRPORT" },
    image: "sora2.jpeg",
    mapUrl: "https://maps.app.goo.gl/6PBbUujSAZgu19wF6",
    type: "airport",
  },
  {
    id: "merzouga",
    name: { fr: "MERZOUGA", ar: "مرزوكة", en: "MERZOUGA" },
    label: { fr: "AGENCE", ar: "وكالة", en: "AGENCY" },
    image: "sora4.jpeg",
    mapUrl: "https://maps.app.goo.gl/MNDDZiqPzeL7NQJz6",
    type: "agency",
  },
  {
    id: "errachidia",
    name: { fr: "ERRACHIDIA", ar: "مطار الرشيدية", en: "ERRACHIDIA" },
    label: { fr: "AÉROPORT", ar: "مطار", en: "AIRPORT" },
    image: "sora3.jpeg",
    mapUrl: "https://maps.app.goo.gl/PsfhaXLK4QjHoAcg7",
    type: "airport",
  },
];
