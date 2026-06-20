import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../config/firebase"

const resumesCollection = (userId) => collection(db, "users", userId, "resumes")

export async function listResumes(userId) {
  const q = query(resumesCollection(userId), orderBy("updatedAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getResume(userId, resumeId) {
  const snapshot = await getDoc(doc(db, "users", userId, "resumes", resumeId))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export async function createResume(userId, data, label = "Untitled Resume") {
  const docRef = await addDoc(resumesCollection(userId), {
    label,
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateResume(userId, resumeId, data, label) {
  const payload = { data, updatedAt: serverTimestamp() }
  if (label !== undefined) payload.label = label
  await updateDoc(doc(db, "users", userId, "resumes", resumeId), payload)
}

export async function deleteResume(userId, resumeId) {
  await deleteDoc(doc(db, "users", userId, "resumes", resumeId))
}
