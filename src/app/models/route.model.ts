export interface Route {
    locationID: string;
    information?: string;
    route;
    createdBy: string;
    createdAt: number;
    goodPoints: number;
    badPoints: number;
    truckLenght: number; // Meters
    truckHeight: number; // Meters
}
