"use server";

import { Link } from "../actions/add-custom-links";
import { db } from "../lib/firebase";

export type ProfileData = {
  userId: string;
  name: string;
   description: string;
   imagePath: string;
  totalVisits: number;
  createdAt: number;
  socialMedias?: {
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  link1?: Link;
  link2?: Link;
  link3?: Link;
  updatedAt?: number;
};

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: string;
  totalVisits?: number;
};

export async function getProfileData(profileid: string) {
  const snapshot = await db.collection("profiles").doc(profileid).get();

  return snapshot.data() as ProfileData;
}

export async function getProfileProjects(profileid: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileid)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ProjectData);
}