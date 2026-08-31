import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";

import { addFood, getFoods, getFood, deleteFood, updateFood, clearFoods } from "./foods";


describe("foods", () => {
    beforeEach(async () => {
        await clearFoods();
    });

    const potato = {
        id: crypto.randomUUID(),
        name: "Potato",
        brand: null,
        calories: 80,
        protein: 2,
        fat: 0.1,
        carbs: 17,
        servingSize: 100,
        servingUnit: "g" as const,
        createdAt: Date.now(),
        source: "custom" as const,   
    }

    const cheese1 = {
        id: crypto.randomUUID(),
        name: "Cheese",
        brand: "The Cheese Factory",
        calories: 170,
        protein: 10,
        fat: 10,
        carbs: 10,
        servingSize: 100,
        servingUnit: "g" as const,
        createdAt: Date.now(),
        source: "custom" as const,      
    }

    it("adds a food to the database", async () => {
        await addFood(potato);

        const foods = await getFoods();

        expect(foods).toHaveLength(1);
        expect(foods[0].name).toBe("Potato");
        expect(foods[0].calories).toBe(80);
    });

    it("deletes only the selected food", async () => {
        await addFood(potato);

        await addFood({
            ...potato,
            id: crypto.randomUUID(),
            name: "The Cooler Potato",
        })

        await deleteFood(potato.id);

        const foods = await getFoods();

        expect(foods).toHaveLength(1);
        expect(foods[0].name).toBe("The Cooler Potato");
    });

    it("gets specific food by id", async () => {
        await addFood(potato);

        await addFood({
            ...potato,
            id: crypto.randomUUID(),
            name: "The Cooler Potato",
        })

        const food = await getFood(potato.id);

        expect(food?.name).toBe("Potato");
        expect(food?.calories).toBe(80);
    });

    it("returns undefined for unknown food", async () => {
        const food = await getFood("food-that-does-not-exist");

        expect(food).toBeUndefined();
    });

    it ("updates a food", async () => {
        await addFood(potato);

        await updateFood({
            ...potato,
            calories: 110,
        });

        const foods = await getFoods();

        expect(foods).toHaveLength(1);
        expect(foods[0].name).toBe("Potato");
        expect(foods[0].calories).toBe(110);
    });

    it ("tries to add two of the same food and brand combination", async () => {
        await addFood(cheese1);
        await addFood(cheese1);

        const foods = await getFoods();

        expect(foods).toHaveLength(1);

    });
});
