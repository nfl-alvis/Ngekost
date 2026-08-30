export type Facility =
  | "wifi"
  | "ac"
  | "bathroom-in"
  | "parking"
  | "kitchen"
  | "laundry"
  | "bed"
  | "wardrobe"
  | "desk"
  | "fridge"
  | "hot-water"
  | "cctv"
  | "access-24h";

export type Gender = "mixed" | "male" | "female";

export interface RoomType {
  id: string;
  name: string;
  /** monthly price in IDR */
  pricePerMonth: number;
  available: number;
  total: number;
  sizeM2: number;
}

export interface Property {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  city: string;
  district: string;
  address: string;
  gender: Gender;
  /** verified + active -> appears in public listing (PRD v3.6) */
  verified: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  /** picsum seed for stable images */
  imageSeed: string;
  facilities: Facility[];
  roomTypes: RoomType[];
  minPrice: number;
  distanceToCampusM: number;
  depositInfo: string;
}
