import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { GeoLocation } from 'src/app/modules/user/book-flight/types';
import { GeolocationService } from './geolocation.service';

@Injectable({
    providedIn: 'root'
})
export class GeolocationStorageService {

    constructor(
        private _httpClient: HttpClient,
        private _GeolocationService: GeolocationService) { }



    fetchLocation() {
        return this._httpClient.get<GeoLocation>("https://geoip-api.skypicker.com/")
            .pipe(
                tap(location => {
                    this._GeolocationService.setLocation(location);
                }),
                
            )
    }
}
