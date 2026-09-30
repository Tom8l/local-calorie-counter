import { useEffect, useState } from "react";
import type { Entry } from "../types";
import { getEntriesByDate } from "../db/entries";

export function useEntries(date: string, entriesVersion: number) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        async function loadEntries() {
            const data = await getEntriesByDate(date);
            setEntries(data);
        }

        loadEntries();
    }, [date, reloadKey, entriesVersion]);

    const reloadEntries = () => {
        setReloadKey(value => value + 1);
    };

    return { entries, reloadEntries };
}