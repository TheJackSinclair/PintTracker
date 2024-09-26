import {PintEntry} from "@/app/Common/BeerCommon";

export function getLabelsAndData(pintEntries: PintEntry[]) {
    const labels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const data: number[] = new Array(7).fill(0);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    pintEntries.forEach(entry => {
        const entryDate = new Date(entry.timestamp);

        if (entryDate >= startOfWeek && entryDate <= endOfWeek) {
            const dayIndex = (entryDate.getDay() + 6) % 7;
            data[dayIndex]++;
        }
    });

    const maxPints = Math.max(...data);
    const maxPintsDay = labels[data.indexOf(maxPints)];

    return {labels, data, maxPintsDay};
}