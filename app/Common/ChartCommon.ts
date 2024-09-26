import {PintEntry} from "@/app/Common/BeerCommon";

export function getLabelsAndData(pintEntries: PintEntry[]) {
    const labels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const data: number[] = new Array(7).fill(0);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Set to Monday of the current week
    startOfWeek.setHours(0, 0, 0, 0); // Start of Monday at midnight

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the current week (Sunday)
    endOfWeek.setHours(23, 59, 59, 999); // End of Sunday at the latest possible time

    pintEntries.forEach(entry => {
        const entryDate = new Date(entry.timestamp);

        // Only consider entries from the current week (Monday to Sunday)
        if (entryDate >= startOfWeek && entryDate <= endOfWeek) {
            const dayIndex = (entryDate.getDay() + 6) % 7; // Ensure Monday is 0 and Sunday is 6
            data[dayIndex]++;
        }
    });

    // Find the index of the day with the most pints in the current week
    const maxPints = Math.max(...data);
    const maxPintsDay = labels[data.indexOf(maxPints)];

    return {labels, data, maxPintsDay};
}