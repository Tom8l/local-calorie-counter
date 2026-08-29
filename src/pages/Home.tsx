import styles from "./Home.module.css"
import { getToday } from "../utils/date";
import { useEntries } from "../hooks/useEntries";
import { Link } from "react-router";
import type { Entry } from "../types";
import { deleteEntry } from "../db/entries";

export function Home() {

    const {entries, reloadEntries} = useEntries(getToday());

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

    return (
        <>

      <div className={styles.mainContainer}>

        <div>
          <h1> Today's date: {getToday()} </h1>
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