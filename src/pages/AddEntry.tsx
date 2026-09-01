import { useEffect, useState } from "react";
import type { Food } from "../types";
import { getFoods } from "../db/foods";
import { addEntry } from "../db/entries";
import { generateDate, shiftDateString } from "../utils/date";
import { useFoods } from "../hooks/useFoods";
import styles from "./AddEntry.module.css"
import { useNavigate, useLocation } from "react-router";
import leftArrowIcon from "../assets/left-arrow-svgrepo.svg";
import rightArrowIcon from "../assets/right-arrow-svgrepo.svg";


export function AddEntry() {
    const location = useLocation();
    const [date, setDate] = useState<string>(location.state?.date ?? generateDate(0));
    const {foods, reloadFoods} = useFoods();
    const navigate = useNavigate();

    const [servings, setServings] = useState<Record<string, number>>({});

    const handleEntry = async (food: Food) => {
        const quantity = servings[food.id] || 1;

        const entry = {
            id: crypto.randomUUID(),
            date: date || generateDate(0),

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

        const confirmed = window.confirm("Entry added!\n\nReturn to food diary?");

        if (confirmed) {
            navigate("/");
        }

    };

    const handlePreviousDate = () => {
        const prevDateString = shiftDateString(date, -1);
        setDate(prevDateString);
    }

    const handleNextDate = () => {
        const newDateString = shiftDateString(date, 1);
        setDate(newDateString);
    }

    const handleTodayButton = () => {
        setDate(generateDate(0));
    }

    return (
        <>
            <div>Back</div>

            <div className={`${styles.mainContainer}`}>

                <div className={styles.dateContainer}>
                    <img src={leftArrowIcon} width={50} height={50} onClick={handlePreviousDate}/>
                    <h1> Date: {date} </h1>
                    <img src={rightArrowIcon} width={50} height={50} onClick={handleNextDate}/>
                </div>

                <button onClick={handleTodayButton}>Today</button>

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

                            <button onClick={() => handleEntry(food)}> Add </button>
                        </div>
                ))}
                </div>

            </div>
        </>
    );
}