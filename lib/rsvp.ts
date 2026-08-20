import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDb } from "./firebase";

export type Attendance = {
  id: string;
  name: string;
  attending: boolean;
  pax: number;
  createdAt?: { seconds: number } | null;
};

export type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt?: { seconds: number } | null;
};

export async function submitRsvp(input: {
  name: string;
  phone: string;
  attending: boolean;
  pax: number;
  notes: string;
}) {
  const db = getDb();
  const rsvpRef = doc(collection(db, "rsvps"));
  const payload = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    attending: input.attending,
    pax: input.attending ? input.pax : 0,
    notes: input.notes.trim(),
    createdAt: serverTimestamp(),
  };
  await setDoc(rsvpRef, payload);
  await setDoc(doc(db, "attendancePublic", rsvpRef.id), {
    name: payload.name,
    attending: payload.attending,
    pax: payload.pax,
    createdAt: serverTimestamp(),
  });
}

export function listenAttendance(cb: (rows: Attendance[]) => void) {
  const q = query(
    collection(getDb(), "attendancePublic"),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Attendance, "id">),
      })),
    );
  });
}

export async function submitWish(name: string, message: string) {
  await addDoc(collection(getDb(), "wishes"), {
    name: name.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });
}

export function listenWishes(cb: (rows: Wish[]) => void) {
  const q = query(
    collection(getDb(), "wishes"),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Wish, "id">),
      })),
    );
  });
}
