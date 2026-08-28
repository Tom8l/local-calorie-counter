







export async function resetDatabase() {
    await indexedDB.deleteDatabase("calorie-tracker-db");
}