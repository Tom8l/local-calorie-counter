import { dbPromise } from "./database"
import type { Entry } from "../types";


export async function addEntry(entry: Entry) {
    const db = await dbPromise;

    return db.put("entries", entry);
}

export async function getEntries() {
    const db = await dbPromise;

    return db.getAll("entries");
}

export async function getEntriesByDate(date: string) {
    const db = await dbPromise;

    const entries = await db.getAll("entries");

    return entries.filter(
        entry => entry.date === date
    );
}

export async function deleteEntry(id: string) {
    const db = await dbPromise;

    return db.delete("entries", id);
}




export async function clearEntries() {
    const db = await dbPromise;
    await db.clear("entries");
}

