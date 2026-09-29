import styles from "./Home.module.css"
import { generateDate, shiftDateString } from "../utils/date";
import { useEntries } from "../hooks/useEntries";
import { Link } from "react-router";
import type { Entry } from "../types";
import { deleteEntry, exportEntries, importEntries } from "../db/entries";
import { useRef, useState } from "react";
import leftArrowIcon from "../assets/left-arrow-svgrepo.svg";
import rightArrowIcon from "../assets/right-arrow-svgrepo.svg";
import { Button } from "../components/Button";

type HomeProps = {
  entriesVersion: number;
};

export function Home({ entriesVersion }: HomeProps) {
    const [date, setDate] = useState<string>(generateDate(0));
    const {entries, reloadEntries} = useEntries(date, entriesVersion);

    const dateInputRef = useRef<HTMLInputElement>(null);
    const openDatePicker = () => {
      dateInputRef.current?.showPicker();
    }

    const handleDeletion = async (entry: Entry) => {

        const confirmed = window.confirm("Really delete food from diary?");

        if (confirmed) {
          await deleteEntry(entry.id);
          reloadEntries();
        }
        
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

    const handleTodayButton = () => {
        setDate(generateDate(0));
    }

    return (
        <>

      <div className={styles.mainContainer}>

        <div className={styles.dateContainer}>
          <img src={leftArrowIcon} width={50} height={50} className={styles.previousDateArrow} onClick={handlePreviousDate}/>
            <label htmlFor="date-picker" style={{cursor: "pointer"}} onClick={openDatePicker}>
              <h1> {date} </h1>
            </label>
            <input ref={dateInputRef} id="date-picker" type="date" value={date} style={{display: "none"}} onChange={(event) => setDate(event.target.value)}/>
          <img src={rightArrowIcon} width={50} height={50} className={styles.nextDateArrow} onClick={handleNextDate}/>
        </div>

        <div className={styles.buttonContainer}>
            <Link to="/add-entry" state={{ date }}>
              <Button>Add Entry</Button>
            </Link>

        </div>

        <div className={styles.caloriesContainer}>
          <div className={styles.caloriesLabel}>
            Calories
          </div>
          <div className={styles.caloriesKcal}>
            {totals.calories} kcal
          </div>
        </div>
        <div className={styles.macroContainer}>
          <div>
            <div className={styles.macroLabel}>
              Protein
            </div>
            <div className={styles.macroGrams}>
              {totals.protein.toFixed(1)} g
            </div>
          </div>

          <div>
            <div className={styles.macroLabel}>
              Fat
            </div>
            <div className={styles.macroGrams}>
              {totals.fat.toFixed(1)} g
            </div>
          </div>

          <div>
            <div className={styles.macroLabel}>
              Carbs
            </div>
            <div className={styles.macroGrams}>
              {totals.carbs.toFixed(1)} g
            </div>

          </div>
        </div>

        <div id="entries" className={styles.entryContainer}>
          <ul>
            {entries.length === 0 ? (
              <li className={styles.emptyDiaryMsg}>
                No diary entries yet. Click "Add Entry" above to get started!
              </li>) :
            (entries.map(entry => (
              <li>
                <div key={entry.id}>
                  <div className={styles.entryDetails}>
                    <strong>{entry.foodName}</strong>
                    <div>
                      {entry.quantity} {entry.servingUnit} 
                    </div>
                  </div>
                 
                  <Button className={styles.entryDeleteBtn} variant="danger" size="sm" onClick={() => handleDeletion(entry)}> Delete </Button>
                  
                </div>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </>
    )
}