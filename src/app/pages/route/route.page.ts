import { Component, OnInit } from "@angular/core";
import { RouteService } from "src/app/services/route.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertaService } from "src/app/services/alerta.service";
import { Observable } from "rxjs";
import { Route } from "src/app/models/route.model";
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: "app-route",
  templateUrl: "./route.page.html",
  styleUrls: ["./route.page.scss"],
})
export class RoutePage implements OnInit {
  route$: Observable<firebase.firestore.DocumentSnapshot>;
  map;
  url;
  directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: false,
    hideRouteList: true,
  });
  directionsService = new google.maps.DirectionsService();

  constructor(
    private routeService: RouteService,
    private activeRoute: ActivatedRoute,
    private alert: AlertaService,
    private router: Router,
    private ngNavigatorShareService: NgNavigatorShareService
  ) {}

  async ngOnInit() {
    const loading = await this.alert.loading();
    this.route$ = this.routeService.getRouteById(
      this.activeRoute.snapshot.paramMap.get("id")
    );
    this.route$.subscribe((res: any) => {
      if (res.data().route) {
        console.log(res.data());
        this.initMap(res.data().route);
        let waypointstring = "";
        res.data().route.request.waypoints.forEach((element) => {
          waypointstring =
            waypointstring + element.location.lat + "," + element.location.lng;
        });
        console.log(waypointstring);
        this.url =
          "https://www.google.com/maps/dir/?api=1" +
          "&origin=" +
          res.data().route.request.origin.location.lat +
          "," +
          res.data().route.request.origin.location.lng +
          "&destination=" +
          res.data().route.request.destination.lat +
          "," +
          res.data().route.request.destination.lng +
          "&waypoints=" +
          waypointstring +
          "&travelmode=driving";
        loading.dismiss();
      } else {
        this.alert.alert("Couldn't find route");
        this.router.navigate(["home"]);
      }
    });
  }

  initMap(route) {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 40, lng: -100 },
        zoom: 2,
      }
    );
    console.log(route);
    this.directionsService.route(route.request, (result, status) => {
      if (status == "OK") {
        this.directionsRenderer.setDirections(result);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
    this.directionsRenderer.setMap(this.map);
  }

  openGoogleMaps() {
    document.location.href = this.url;
  }

  share() {
    
    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
 
    this.ngNavigatorShareService.share({
      title: 'My Awesome app',
      text: 'hey check out my Share button',
      url: 'https://developers.google.com/web'
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

}
