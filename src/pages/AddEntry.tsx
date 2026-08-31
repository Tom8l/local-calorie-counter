import { useEffect, useState } from "react";
import type { Food } from "../types";
import { getFoods } from "../db/foods";
import { addEntry } from "../db/entries";
import { generateDate } from "../utils/date";
import { useFoods } from "../hooks/useFoods";
import styles from "./AddEntry.module.css"
import { useNavigate } from "react-router";



export function AddEntry() {

    const {foods, reloadFoods} = useFoods();
    const navigate = useNavigate();

    const [servings, setServings] = useState<Record<string, number>>({});
    const [dates, setDates] = useState<Record<string, string>>({});

    const handleEntry = async (food: Food) => {
        const quantity = servings[food.id] || 1;

        const entry = {
            id: crypto.randomUUID(),
            date: dates[food.id] || generateDate(0),

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

        const confirmed = window.confirm("Entry added. Return to food diary?");

        if (confirmed) {
            navigate("/");
        }

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
                            {food.brand != null ? `${food.name} - ${food.brand},` : `${food.name},`} {food.servingSize} {food.servingUnit}
                            <input
                                type="number"
                                min="0.25"
                                step="0.25"
                                value={servings[food.id] ?? 1}
                                onChange={(e) =>
                                    setServings({
                                        ...servings,
                                        [food.id]: Number(e.target.value),
                                    })
                                }
                            />

                            <input
                                type="date"
                                value={dates[food.id] ?? generateDate(0)}
                                onChange={(e) =>
                                    setDates({
                                        ...dates,
                                        [food.id]: e.target.value,
                                    })
                                }
                            />
                            <button onClick={() => handleEntry(food)}> Add </button>
                        </div>
                ))}
                </div>

            </div>
        </>
    );
}