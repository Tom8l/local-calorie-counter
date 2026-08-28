import { dbPromise } from "./database"
import type { Food } from "../types";




export async function addFood(food: Food) {
    const db = await dbPromise;

    return db.put("foods", food);
}


export async function getFoods() {
    const db = await dbPromise;

    return db.getAll("foods");
}

export async function getFood(id: string) {
    const db = await dbPromise;

    return db.get("foods", id);
}

export async function deleteFood(id: string) {
    const db = await dbPromise;

    return db.delete("foods", id);
}


export async function updateFood(food: Food) {
    const db = await dbPromise;

    return db.put("foods", food);
}


export async function clearFoods() {
    const db = await dbPromise;
    await db.clear("foods");
}