export function generateDate(dayOffset: number) {
    var date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth()+1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd}`;
}


export function shiftDateString(dateString: string, dayOffset: number) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + dayOffset);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth()+1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${MM}-${dd}`;
}