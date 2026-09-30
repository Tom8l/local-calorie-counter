import styles from "./AddFood.module.css"
import { addFood, deleteFood } from "../db/foods";
import { useFoods } from "../hooks/useFoods";
import type { Food } from "../types";
import { Button } from "../components/Button";

export function AddFood() {

    const {foods, reloadFoods} = useFoods();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);

        const name = String(formData.get("name"));
        const brand = String(formData.get("brand") ?? "") || null;
        const servingUnit = formData.get("servingUnit");
        const servingSize = Number(formData.get("servingSize"));
        const calories = Number(formData.get("calories"));
        const protein = Number(formData.get("protein"));;
        const fat = Number(formData.get("fat"));;
        const carbs = Number(formData.get("carbs"));;

        if (!name) {
            alert("Please enter a food name.");
            return;
        }

        if (!["g", "ml", "piece"].includes(String(servingUnit))) {
            alert("Please pick a serving unit.");
            return;
        }

        const food = {
            id: crypto.randomUUID(),
            name,
            brand,
            servingSize,
            servingUnit: String(servingUnit) as "g" | "ml" | "piece",
            calories,
            protein,
            fat,
            carbs,
            createdAt: Date.now(),
            source: "custom" as "custom",
        };

        await addFood(food);
        form.reset();
        reloadFoods();
    }


    const handleFoodDeletion = async (food: Food) => {

        const confirmed = window.confirm(`Delete ${food.name} from database?`);

        if (confirmed) {
            await deleteFood(food.id);
            reloadFoods();
        }
    }


    return (
        <>
        <div className={styles.mainContainer}>

            <form onSubmit={handleSubmit} className={styles.foodForm}>

                <div> Food Form </div>

                <div>
                    <label>Name *</label>
                    <input name="name"></input>
                </div>
                <div>
                    <label>Brand</label>
                    <input name="brand"></input>
                </div>
                <div>
                    <label>Serving Unit</label>
                    <select name="servingUnit">
                        <option>g</option>
                        <option>ml</option>
                        <option>piece</option>
                    </select>
                </div>
                <div>
                    <label>Serving Size</label>
                    <input name="servingSize"></input>
                </div>
                <div>
                    <label>Calories (kcal)</label>
                    <input name="calories"></input>
                </div>
                <div>
                    <label>Protein (g)</label>
                    <input name="protein"></input>
                </div>
                <div>
                    <label>Fat (g)</label>
                    <input name="fat"></input>
                </div>
                <div>
                    <label>Carbs (g)</label>
                    <input name="carbs"></input>
                </div>

                <div>
                    <Button type="submit" className="addFoodButton">Add Food</Button>
                </div>
            </form>

            <div>
                <div className={styles.foodDbMsg}>{foods.length != 0 ? `Your Foods` : `No foods yet, go ahead and add one!`}</div>

                <ul className={styles.foodList}>
                    
                    {foods.map(food => (
                        <li>
                            <div key={food.id}>
                                <div className={styles.foodInfo}>
                                    <div>
                                        {food.name}
                                        <span className={styles.brandName}>{food.brand != null ? food.brand : ""}</span>
                                    </div>

                                    <div className={styles.nutrientInfo}>
                                        {food.calories} kcal

                                    </div>
                                    <div>
                                        <span className={styles.macroInfo}>Protein: {food.protein} g</span>
                                        <span className={styles.macroInfo}>Fat: {food.fat} g</span>
                                        <span className={styles.macroInfo}>Carbs: {food.carbs} g</span>
                                    </div>
                                </div>
                                <Button className={styles.foodDeleteBtn} size="sm" variant="danger" onClick={() => handleFoodDeletion(food)}> Delete </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        
        </>
    )
}





