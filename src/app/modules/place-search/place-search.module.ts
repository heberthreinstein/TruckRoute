import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceSearchComponent } from 'src/app/components/place-search/place-search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PlaceSearchComponent],
  exports: [PlaceSearchComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PlaceSearchModule { }
