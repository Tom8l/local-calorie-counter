import { useEffect } from "react";
import { dbPromise } from "../db/database.ts";
import { resetDatabase } from '../db/reset'

export default function DBTest() {
    useEffect(() => {
        async function testDatabase() {
            const db = await dbPromise;

            console.log("Database opened:", db.name);

            await db.put("foods", {
                id: crypto.randomUUID(),
                name: "Potato",
                brand: null,
                calories: 80,
                protein: 2,
                fat: 0.1,
                carbs: 17,
                servingSize: 100,
                servingUnit: "g",
                createdAt: Date.now(),
                source: "custom",
            });

            const foods = await db.getAll("foods");

            console.log("Foods:", foods);
        }

        testDatabase();

    }, [])

    return <div>Check the console</div>;
}




export function DBTest2() {
    useEffect(() => {
        async function testDatabase() {
            const db = await dbPromise;

            console.log("Database opened:", db.name);

            await db.put("entries", {
                id: crypto.randomUUID(),

                date: "2026-08-07",

                foodId: "testID",
                foodName: "Potato",

                servingUnit: "g",
                quantity: 1,

                calories: 80,
                protein: 2,
                fat: 0.1,
                carbs: 17,

                createdAt: Date.now()
            });

            const foods = await db.getAll("foods");

            console.log("Foods:", foods);
        }

        testDatabase();

    }, [])

    return <div>Check the console</div>;
}