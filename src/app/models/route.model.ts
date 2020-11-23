export interface Route {
    locationID: string;
    title: string;
    city: string;
    information?: string;
    route: any;
    createdBy: string;
    createdAt: number;
    goodPoints: number;
    badPoints: number;
    truckLenght: number; // Meters
    truckHeight: number; // Meters
}
