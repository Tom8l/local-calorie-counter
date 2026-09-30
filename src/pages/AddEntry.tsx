import { useState } from "react";
import type { Food } from "../types";
import { addEntry } from "../db/entries";
import { generateDate, shiftDateString } from "../utils/date";
import { useFoods } from "../hooks/useFoods";
import styles from "./AddEntry.module.css"
import { useNavigate, useLocation } from "react-router";
import leftArrowIcon from "../assets/left-arrow-svgrepo.svg";
import rightArrowIcon from "../assets/right-arrow-svgrepo.svg";
import { Button } from "../components/Button";


export function AddEntry() {
    const location = useLocation();
    const [date, setDate] = useState<string>(location.state?.date ?? generateDate(0));
    const {foods} = useFoods();
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

    return (
        <>

            <div className={`${styles.mainContainer}`}>

                <div className={styles.dateContainer}>
                    <img src={leftArrowIcon} width={50} height={50} onClick={handlePreviousDate}/>
                    <h1> {date} </h1>
                    <img src={rightArrowIcon} width={50} height={50} onClick={handleNextDate}/>
                </div>

                <div className={styles.foodListText}>
                    Foods
                </div>

                <div>
                    <ul className={styles.foodList}>
                    {foods.map(food => (
                        <li key={food.id}>
                            <div className={styles.foodEntry}>

                                <div className={styles.foodNameAndBrand}>
                                    <div>{food.name}</div>
                                    <div className={styles.foodBrandText}>{food.brand != null ? food.brand : ""}</div>
                                </div>

                                <div className={styles.foodRightElems}>

                                    <div>
                                        {food.servingSize} {food.servingUnit}
                                    </div>

                                    <input
                                        name="servingInput"
                                        className={styles.foodListInput}
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

                                    <Button className={styles.foodAddBtn} size="sm" onClick={() => handleEntry(food)}> + </Button>
                                </div>

                            </div>
                        </li>
                ))}
                </ul>
                </div>

            </div>
        </>
    );
}