import "./AddFood.css"
import { addFood, deleteFood } from "../db/foods";
import { useFoods } from "../hooks/useFoods";
import type { Food } from "../types";


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
        await deleteFood(food.id);
        reloadFoods();
    }


    return (
        <>
        <div id="main-container">

            <form onSubmit={handleSubmit} id="food-form">

                <div> Food Form </div>

                <div>
                    <label>Name</label>
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
                    <button type="submit" id="add-food-button">Add Food to Database</button>
                </div>
                

            </form>

            <div>

                <div>All Foods</div>

                {foods.map(food => (

                    <div>
                        {food.name}, {food.servingSize} {food.servingUnit} | {food.calories} kcal - {food.protein} P - {food.fat} F - {food.carbs} C <button onClick={() => handleFoodDeletion(food)}> Delete </button>
                    </div>

                ))}
            </div>

        </div>

        
        </>
    )
}





