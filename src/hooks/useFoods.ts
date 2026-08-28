import { useState, useEffect } from "react";
import type { Food } from "../types";
import { getFoods } from "../db/foods";


export function useFoods() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        async function loadFoods() {
            const data = await getFoods();
            setFoods(data);
        }

        loadFoods();
    }, [reloadKey]);

    const reloadFoods = () => {
        setReloadKey(value => value + 1);
    };

    return {foods, reloadFoods};
}
