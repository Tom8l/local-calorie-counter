import { openDB } from "idb";
import type { DBSchema } from "idb";
import type { Food, Entry } from "../types";

interface CalorieTrackerDB extends DBSchema {
    foods: {
        key: string;
        value: Food;
        indexes: {
            "by-name-brand": [string, string];
        };
    };

    entries: {
        key: string;
        value: Entry;
        indexes: {
            "by-date": string;
        };
    };
}

export const dbPromise = openDB<CalorieTrackerDB>(
    "calorie-tracker-db",
    2,
    {
        upgrade(db) {
            const foods = db.createObjectStore("foods", {
                keyPath: "id",
            });

            foods.createIndex("by-name-brand", ["name", "brand"], { unique: true });

            const entries = db.createObjectStore("entries", {
                keyPath: "id",
            });

            entries.createIndex("by-date", "date");

        }
    }
)


