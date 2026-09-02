import { dbPromise } from "./database"
import type { Entry } from "../types";


/* Basic functionality (add, update, remove, etc.) */
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



/* Importing and exporting */

export async function exportEntries(): Promise<string> {
    const entries = await getEntries();

    return JSON.stringify({
        version: 1,
        exportedAt: Date.now(),
        entries,
    }, null, 2);
}

export async function importEntries(json: string): Promise<number> {
    const parsed: unknown = JSON.parse(json);

    if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("version" in parsed) ||
        !("entries" in parsed) ||
        parsed.version !== 1 ||
        !Array.isArray(parsed.entries) ||
        !parsed.entries.every(isEntry)
    ) {
        throw new Error("Invalid entries export file.");
    }

    const db = await dbPromise;
    const transaction = db.transaction("entries", "readwrite");

    for (const entry of parsed.entries) {
        transaction.store.put(entry);
    }

    await transaction.done;

    return parsed.entries.length;
}

function isEntry(value: unknown): value is Entry {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const entry = value as Record<string, unknown>;

    return (
        typeof entry.id === "string" &&
        typeof entry.date === "string" &&
        (entry.foodId === undefined || typeof entry.foodId === "string") &&
        typeof entry.foodName === "string" &&
        typeof entry.quantity === "number" &&
        typeof entry.servingUnit === "string" &&
        typeof entry.calories === "number" &&
        typeof entry.protein === "number" &&
        typeof entry.carbs === "number" &&
        typeof entry.createdAt === "number"
    )
}


/* Debug functions (SHOULD PROBABLY REMOVE) */

export async function clearEntries() {
    const db = await dbPromise;
    await db.clear("entries");
}

