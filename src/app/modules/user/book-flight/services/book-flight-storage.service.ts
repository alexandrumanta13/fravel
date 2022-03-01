import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { TopDestinations } from '../types';
import { BookFlightService } from './book-flight.service';

@Injectable({
  providedIn: 'root'
})
export class BookFlightStorageService {

  constructor(private _httpClient: HttpClient, private _BookFlightSerivce: BookFlightService) { }

  storeTopDestinatinos(destinations: TopDestinations[]) {
    this._httpClient
      .put(
        environment.FIREBASE_ENDPOINT + 'top_destinations.json',
        destinations
      )
      .subscribe();
  }

  fetchTopDestinations() {
    return this._httpClient
      .get<TopDestinations[]>(
        environment.FIREBASE_ENDPOINT + 'top_destinations.json',
      )
      .pipe(
        tap(destinations => {
          this._BookFlightSerivce.setTopDestinations(destinations);
        })
      )
      .subscribe();
  }
}
