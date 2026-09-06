import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJSON(file, fallback) {
  try {
    const raw = fs.readFileSync(path.join(dataDir, file), 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2), 'utf-8');
}

export function getProducts() { return readJSON('products.json', []); }
export function saveProducts(products) { writeJSON('products.json', products); }

export function getSocial() {
  return readJSON('social.json', { whatsapp: '', facebook: '', instagram: '', tiktok: '', youtube: '' });
}
export function saveSocial(social) { writeJSON('social.json', social); }

export function getLeads() { return readJSON('leads.json', []); }
export function saveLeads(leads) { writeJSON('leads.json', leads); }

export function getClicks() { return readJSON('clicks.json', {}); }
export function saveClicks(clicks) { writeJSON('clicks.json', clicks); }

export function slugify(name, idSuffix = '') {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  return idSuffix ? `${base}-${idSuffix}` : base;
}
