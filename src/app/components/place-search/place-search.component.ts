import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';

@Component({
    selector: 'app-place-search',
    template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext style="color: #000; padding: 12px 20px; border: 1px solid #ccc; width: 400px"
        >
    `,
})

export class PlaceSearchComponent implements OnInit {
    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place) {
        this.setAddress.emit(place);
    }

}
