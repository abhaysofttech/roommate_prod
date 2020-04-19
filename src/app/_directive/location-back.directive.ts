import { Directive, HostListener } from '@angular/core';
import {Location} from '@angular/common';

@Directive({
  selector: '[appLocationBack]'
})
export class LocationBackDirective {

  constructor(private location: Location) { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

}
