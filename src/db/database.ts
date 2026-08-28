import { openDB } from "idb";
import type { DBSchema } from "idb";
import type { Food, Entry } from "../types";

interface CalorieTrackerDB extends DBSchema {
    foods: {
        key: string;
        value: Food;
        indexes: {
            "by-name": string;
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
    1,
    {
        upgrade(db) {
            const foods = db.createObjectStore("foods", {
                keyPath: "id",
            });

            foods.createIndex("by-name", "name");

            const entries = db.createObjectStore("entries", {
                keyPath: "id",
            });

            entries.createIndex("by-date", "date");

        }
    }
)


