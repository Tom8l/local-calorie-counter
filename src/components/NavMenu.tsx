import { Link, useLocation } from "react-router";
import { useState } from "react";
import styles from "./NavMenu.module.css"
import { generateDate } from "../utils/date";
import { importEntries, exportEntries } from "../db/entries";

type NavMenuProps = {
    onEntriesImported: () => void;
};

export function NavMenu({ onEntriesImported }: NavMenuProps) {

    const [navWidth, setNavWidth] = useState(0);
    const location = useLocation();

    const showEntryTools = ["/"].includes(location.pathname);

    const openNav = () => {
        setNavWidth(240);
    }

    const closeNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setNavWidth(0);
    }


     const handleExport = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const json = await exportEntries();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `calorie-counter-entries-${generateDate(0)}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    const handleImport = async (
        event: React.ChangeEvent<HTMLInputElement>,
        ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const json = await file.text();
            const count = await importEntries(json);

            window.alert(`Imported ${count} entries.`);
            onEntriesImported();
        } catch {
        window.alert("Could not import this file.");
        }
    } 

    return (
        <>
        <div className={styles.sideNav} style={{width:`${navWidth}px`}}>
            <a href="#" className={styles.closeNav} onClick={closeNav}>&#9776;</a>
            <Link to="/">Diary</Link>
            <Link to="add-food">Manage Foods</Link>

            {showEntryTools && (
                <>
                    <label>
                        Import Entries
                        <input
                            type="file"
                            accept="application/json,.json"
                            onChange={handleImport}
                            className={styles.importInput}
                        />
                    </label>
                    <a href="#" onClick={handleExport}>Export Entries</a>
                </>
            )}

        </div>

        <span style={{fontSize:"36px", cursor: "pointer", position: "absolute", left:"10px"}} onClick={openNav}>&#9776;</span>
        </>
    )
}







