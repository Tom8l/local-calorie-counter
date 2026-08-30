import styles from "./Home.module.css"
import { generateDate, shiftDateString } from "../utils/date";
import { useEntries } from "../hooks/useEntries";
import { Link } from "react-router";
import type { Entry } from "../types";
import { deleteEntry } from "../db/entries";
import { useState } from "react";
import leftArrowIcon from "../assets/left-arrow-svgrepo.svg";
import rightArrowIcon from "../assets/right-arrow-svgrepo.svg";

export function Home() {
    const [date, setDate] = useState<string>(generateDate(0));

    const {entries, reloadEntries} = useEntries(date);

    const handleDeletion = async (entry: Entry) => {
        await deleteEntry(entry.id);
        reloadEntries();
    };

    function calculateTotalMacros(entries: Entry[]) {
        let calories = 0;
        let protein = 0;
        let fat = 0;
        let carbs = 0;

        for (const entry of entries) {
          calories += entry.calories;
          protein += entry.protein;
          fat += entry.fat;
          carbs += entry.carbs;
        }
        return {calories, protein, fat, carbs};
    }

    const totals = calculateTotalMacros(entries);


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

      <div className={styles.mainContainer}>

        <div className={styles.dateContainer}>
          <img src={leftArrowIcon} width={50} height={50} onClick={handlePreviousDate}/>
          <h1> Date: {date} </h1>
          <img src={rightArrowIcon} width={50} height={50} onClick={handleNextDate}/>
        </div>

        <div className={styles.buttonContainer}>
            <Link to="/add-entry">
                <button>Add Entry</button>
            </Link>
            <Link to="/add-food">
                <button>Add Food</button>
            </Link>
        </div>

        <div id="entries">
          {entries.map(entry => (
            <div key={entry.id}>
              <strong>{entry.foodName}</strong>

              <div>
                {entry.quantity} {entry.servingUnit} <button onClick={() => handleDeletion(entry)}> Delete </button>
              </div>
            </div>
          ))}
        </div>


        <div>
          Calories: {totals.calories}
        </div>
        <div>
          Protein: {totals.protein}
        </div>
        <div>
          Fat: {totals.fat}
        </div>
        <div>
          Carbs: {totals.carbs}
        </div>

      </div>

    </>
    )
}