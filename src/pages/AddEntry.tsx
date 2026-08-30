import { useEffect, useState } from "react";
import type { Food } from "../types";
import { getFoods } from "../db/foods";
import { addEntry } from "../db/entries";
import { generateDate } from "../utils/date";
import { useFoods } from "../hooks/useFoods";
import styles from "./AddEntry.module.css"




export function AddEntry() {

    const {foods, reloadFoods} = useFoods();


    const handleEntry = async (food: Food) => {
        const quantity = 1;

        const entry = {
            id: crypto.randomUUID(),
            date: generateDate(0),

            foodId: food.id,
            foodName: food.name,

            servingUnit: food.servingUnit,
            quantity: quantity * food.servingSize,

            calories: food.calories * quantity,
            protein: food.protein * quantity,
            fat: food.fat * quantity,
            carbs: food.carbs * quantity,

            createdAt: Date.now(),
        };

        await addEntry(entry);
        alert("Entry added.")

    };

    return (
        <>
            {}
            <div className={`${styles.mainContainer}`}>

                <div className={styles.foodListText}>
                    Foods:
                </div>

                <div>
                    {foods.map(food => (
                        <div key={food.id}>
                            {food.name}, {food.servingSize} {food.servingUnit} <button onClick={() => handleEntry(food)}> Add </button>
                        </div>
                ))}
                </div>

            </div>
        </>
    );
}