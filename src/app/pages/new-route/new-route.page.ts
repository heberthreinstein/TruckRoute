import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { RouteService } from "src/app/services/route.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-new-route",
  templateUrl: "./new-route.page.html",
  styleUrls: ["./new-route.page.scss"],
})
export class NewRoutePage implements OnInit {
  map: google.maps.Map;

  startPoint;
  waypoints = [];
  destination;
  information;
  directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: true,
    hideRouteList: true,
  });

  markers: google.maps.Marker[] = [];
    truckHeight: number;
    truckLenght: number;
    userId: string;

  constructor(
    private geolocation: Geolocation,
    private routeService: RouteService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(res => this.userId = res.uid)
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.setMapCenter(resp);
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 40, lng: -100 },
        zoom: 2,
        disableDefaultUI: true,
      }
    );
    
  }

  calcRoute() {
    let directionsService = new google.maps.DirectionsService();

    this.map.unbindAll();
    const request = {
      travelMode: google.maps.TravelMode.DRIVING,
      origin: this.startPoint,
      destination: { placeId: this.destination },
      waypoints: this.waypoints,
      provideRouteAlternatives: false,
      optimizeWaypoints: true,
    };
    console.log(request);
    directionsService.route(request, (result, status) => {
      if (status == "OK") {
        this.directionsRenderer.setDirections(result);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
    this.directionsRenderer.setMap(this.map);
  }

  setMapCenter(position) {
    this.map.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    this.map.setZoom(8);
  }

  getEstablishmentAddress(place) {
    if (place.length == 0) {
      return;
    }

    this.destination = place.place_id;

    this.map.addListener("click", (mapsMouseEvent) => {
      if (!this.startPoint) {
        this.startPoint = mapsMouseEvent.latLng as google.maps.LatLng;
        this.calcRoute();
      }
    });

    // Clear out the old markers.
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    const icon = {
      url: place.icon as string,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };

    // Create a marker for each place.
    this.markers.push(
      new google.maps.Marker({
        map: this.map,
        icon,
        title: place.name,
        position: place.geometry.location,
      })
    );

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    this.map.fitBounds(bounds);
  }

  save() {
    console.log('save called')  
    this.routeService.save({
      locationID: this.destination,
      information: this.information,
      route: this.directionsRenderer.getDirections(),
      createdBy: this.userId,
      createdAt: Date.now(),
      goodPoints: 0,
      badPoints: 0,
      truckLenght: this.truckLenght,
      truckHeight: this.truckHeight
    });
  }
}
