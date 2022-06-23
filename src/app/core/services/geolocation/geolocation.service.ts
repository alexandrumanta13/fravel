import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeoLocation } from 'src/app/modules/user/book-flight/types';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  locationChanged$ = new BehaviorSubject<GeoLocation>({} as GeoLocation);
  location: GeoLocation = {} as GeoLocation;

  constructor() { }

  setLocation(location: GeoLocation) {
    this.location = location;
    this.locationChanged$.next(location);
  }

  getGeoLocation$(): Observable<GeoLocation> {
    return this.locationChanged$.asObservable();
  }

  getGeoLocation() {
    return this.location;
  }

}
