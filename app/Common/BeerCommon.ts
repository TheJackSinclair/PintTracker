export interface BeerData {
    name: string;
    style: string;
    brewery: string;
    beer_name_full: string;
    description: string;
    abv: string;  // Assume string, check if parsing to number is needed
    min_ibu: string;  // Assume string, check if parsing to number is needed
    max_ibu: string;  // Assume string, check if parsing to number is needed
    astringency: number;
    body: number;
    alcohol: number;
    bitter: number;
    sweet: number;
    sour: number;
    salty: number;
    fruits: number;
    hoppy: number;
    spices: number;
    malty: number;
    review_aroma: number;
    review_appearance: number;
    review_palate: number;
    review_taste: number;
    review_overall: number;
    number_of_reviews: number;
}

export interface PintEntry {
    timestamp: Date;  // This will be converted from Firestore Timestamp
    name: string;
    full_name: string;
    abv: number;
    style: string;
}