export interface BeerData {
    name: string;
    style: string;
    brewery: string;
    beer_name_full: string;
    description: string;
    abv: string;
    min_ibu: string;
    max_ibu: string;
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
    timestamp: Date;
    name: string;
    full_name: string;
    abv: number;
    style: string;
}