export interface Route {
    locationID: string;
    city: string,
    information?: string;
    route: any;
    createdBy: string;
    createdAt: number;
    goodPoints: number;
    badPoints: number;
    truckLenght: number; // Meters
    truckHeight: number; // Meters
}
