"use server";
 
 import { Timestamp } from "firebase-admin/firestore";
 import { auth } from "../lib/auth";
 import { db, storage } from "../lib/firebase";
 import { randomUUID } from "crypto";
 
 export async function createProject(formData: FormData) {
   const session = await auth();
   if (!session) return;
 
   const profileid = formData.get("profileid") as string;
   const projectName = formData.get("projectName") as string;
   const projectDescription = formData.get("projectDescription") as string;
   const projectUrl = formData.get("projectUrl") as string;
   const file = formData.get("file") as File;
 
   const generatedid = randomUUID();
 
   const storageRef = storage.file(`project-images/${profileid}/${generatedid}`);
   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);
   await storageRef.save(buffer);
 
   const imagePath = storageRef.name;
 
   try {
     await db
       .collection("profiles")
       .doc(profileid)
       .collection("projects")
       .doc(generatedid)
       .set({
         id: generatedid,
         userId: session.user?.id,
         projectName,
         projectDescription,
         projectUrl,
         imagePath,
         createdAt: Timestamp.now().toMillis(),
       });
 
     return true;
   } catch (error) {
     console.error(error);
     return false;
   }
 }