export interface Route {
    locationID: string;
    information?: string;
    points?: Array<google.maps.LatLng>;
    createdBy: string;
    createdAt: Date;
    goodPoints: number;
    badPoints: number;
    truckLenght: number; // Meters
    truckHeight: number; // Meters
}
