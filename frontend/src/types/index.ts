// src/types/index.ts

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Villa {
  [x: string]: any;
  coverImage: string | StaticImport;
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  features: string[]; // Örn: ["Isıtmalı Havuz", "Jakuzi", "Deniz Manzarası"]
  isAvailable?: boolean;
}
