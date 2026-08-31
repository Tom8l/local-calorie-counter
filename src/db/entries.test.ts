import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";

import { addEntry, getEntries, getEntriesByDate, deleteEntry, clearEntries } from "./entries"



const potatoEntry = {
    id: "sample-entry-1",

    date: "2026-08-05",

    foodId: "potato-food-id",
    foodName: "Potato",

    quantity: 1,
    servingUnit: "g",

    calories: 80,
    protein: 2,
    fat: 0.1,
    carbs: 17,

    createdAt: Date.now(),
}


describe("entries", () => {
    beforeEach(async () => {
        await clearEntries();
    });

    it("adds an entry", async () => {
        await addEntry(potatoEntry);
        
        const entries = await getEntries();

        expect(entries).toHaveLength(1);
        expect(entries[0].foodName).toBe("Potato");
    })

    it("gets entries from a specific date", async () => {
        await addEntry(potatoEntry);

        await addEntry({
            ...potatoEntry,
            id: "sample-entry-2",
            date: "2026-08-06",
        });

        const entries = await getEntriesByDate("2026-08-05");

        expect(entries).toHaveLength(1);
        expect(entries[0].date).toBe("2026-08-05");
    })

    it("deletes an entry", async () => {
        await addEntry(potatoEntry);

        await deleteEntry("sample-entry-1");

        const entries = await getEntries();

        expect(entries).toHaveLength(0);
    })


});