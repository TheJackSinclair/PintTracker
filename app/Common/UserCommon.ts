import firebase from "firebase/compat";
import {getPintsHistory, getUserDataById} from "@/app/firebase/firebaseUtils";

export interface UserData {
    email: string;
    username: string;
    added?: string[];
    addedYou?: string[];
    totalPints: number;
    memberSince: firebase.firestore.Timestamp;
}

export interface UserWithPintData {
    email: string;
    username: string;
    totalPints: number;
    memberSince: firebase.firestore.Timestamp;
    weeklyPints: number;
    monthlyPints: number;
    lifetimePints: number;
}

export const fetchFriendsPintData = async (userData: UserData | null, setFriendsData: React.Dispatch<React.SetStateAction<UserWithPintData[]>>) => {
    if (userData?.added && userData.added.length > 0) {
        try {
            const fetchPromises = userData.added.map(async (email) => {
                const friendData = await getUserDataById(email);


                if (friendData) {
                    const {totalPints} = friendData;


                    const pintsHistory = await getPintsHistory(email);

                    console.log(pintsHistory)

                    const now = new Date();
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(now.getDate() - 7);

                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(now.getMonth() - 1);


                    const weeklyPints = pintsHistory.filter((pint) => pint.timestamp.toDate() >= oneWeekAgo).length;
                    const monthlyPints = pintsHistory.filter((pint) => pint.timestamp.toDate() >= oneMonthAgo).length;


                    const lifetimePints = totalPints;

                    return {
                        email: friendData.email,
                        username: friendData.username,
                        totalPints: friendData.totalPints,
                        memberSince: friendData.memberSince,
                        weeklyPints,
                        monthlyPints,
                        lifetimePints
                    };
                }

                return null;
            });


            const results = await Promise.all(fetchPromises);


            const filteredResults: UserWithPintData[] = results.filter((data): data is UserWithPintData => data !== null);
            setFriendsData(filteredResults);
        } catch (error) {
            console.error('Failed to fetch friend data:', error);
        }
    }
};