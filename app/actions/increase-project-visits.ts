"use server";
 
 import { FieldValue } from "firebase-admin/firestore";
 import { db } from "../lib/firebase";
 
 export async function increaseProjectVisits(
   profileid: string,
   projectid: string
 ) {
   const projectRef = db
     .collection("profiles")
     .doc(profileid)
     .collection("projects")
     .doc(projectid);
 
   await db.runTransaction(async (transaction) => {
     const projectDoc = await transaction.get(projectRef);
 
     if (!projectDoc.exists) return;
 
     transaction.update(projectRef, { totalVisits: FieldValue.increment(1) });
   });
 }