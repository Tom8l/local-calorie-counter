



export interface Food {
    id: string;
    name: string;
    brand: string | null;

    calories: number;
    protein: number;
    fat: number;
    carbs: number;

    servingSize: number;
    servingUnit: "g" | "ml" | "piece";

    createdAt: number;
    source: "custom" | "imported";

}


export interface Entry {
    id: string;

    date: string;

    foodId?: string;
    foodName: string;

    quantity: number;
    servingUnit: string;

    calories: number;
    protein: number;
    fat: number;
    carbs: number;

    createdAt: number;
}