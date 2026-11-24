import fs from "fs";
import path from "path";
import { Property } from "@/types";
import { SAMPLE_PROPERTIES } from "@/data/sample";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "properties.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Seed initial listings from SAMPLE_PROPERTIES
    fs.writeFileSync(DATA_FILE, JSON.stringify(SAMPLE_PROPERTIES, null, 2), "utf-8");
  }
}

export function getLocalProperties(): Property[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Property[];
  } catch (err) {
    console.error("Failed to read properties file:", err);
    return [];
  }
}

export function saveLocalProperties(properties: Property[]): boolean {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write properties file:", err);
    return false;
  }
}

export function addLocalProperty(property: Property): Property[] {
  const list = getLocalProperties();
  const updated = [property, ...list];
  saveLocalProperties(updated);
  return updated;
}

export function updateLocalProperty(slug: string, updatedFields: Partial<Property>): Property | null {
  const list = getLocalProperties();
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updatedFields };
  saveLocalProperties(list);
  return list[index];
}

export function deleteLocalProperty(slug: string): boolean {
  const list = getLocalProperties();
  const filtered = list.filter((p) => p.slug !== slug);
  if (filtered.length === list.length) return false;

  saveLocalProperties(filtered);
  return true;
}
