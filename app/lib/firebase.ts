import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

// Certifcado

const decodedKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  "base64"
).toString("utf-8");

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
});

// Instancia do app
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = getFirestore();

export const storage = getStorage().bucket();

export async function getDownloadURLFromPath(path?: string) {
  if (!path) return;

  const file = storage.file(path);

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500", // Não deixa expirar
  });

  return url;
}

export function triggerImageInput(id: string) {
  document.getElementById(id)?.click();
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0] ?? null;
  if (file) {
    const imageURL = URL.createObjectURL(file);
    return imageURL;
  }
  return null;
}