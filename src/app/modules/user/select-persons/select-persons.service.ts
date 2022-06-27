import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BagsQueryType, BagsType, IBagsOptions } from './select-persons.type';

@Injectable({
  providedIn: 'root'
})
export class SelectPersonsService {
  personsSelectedState$ = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  getSelectedPersonsState$(): Observable<any> {
    return this.personsSelectedState$.asObservable();
  }

  generateKiwiSerializedBags(options: IBagsOptions) {
    let noOfPersons: any = (options.bagsQueryType === BagsQueryType.adult) &&
      options.selectedAdults || options.selectedChildren;
    let bagsSelected = (options.bagsType === BagsType.hold) &&
      (options.bagsSelected * (2 * noOfPersons)) || (options.bagsSelected * noOfPersons);

    let serializableVersion = ""

    console.log(`Number of ${options.bagsQueryType}s: ${noOfPersons}`)
    console.log(`${options.bagsType}bags selected (random number: ${bagsSelected})`);

    let queue: any = [];
    let personIdx = 0;
    while (personIdx < noOfPersons && bagsSelected > 0) {
      let maxBagValue = (options.bagsType === BagsType.hold) && 2 || 1;
      let bagDiff = Math.floor(noOfPersons / maxBagValue);
      if (bagDiff >= 2) {
        queue.push([personIdx + 1, 2]);
      }
      if (bagDiff == 1) {
        queue.push([personIdx + 1, 1]);
      }
      bagsSelected -= maxBagValue;
      console.log(bagDiff);
      personIdx++;
    }

    while (personIdx < noOfPersons) {
      queue.push([personIdx + 1, 0])
      personIdx++;
    }

    while (queue.length) {
      serializableVersion += `${queue.shift().join(",")},`;
    }
    serializableVersion = serializableVersion.slice(0, -1);

    console.log(`Serialized representation: ${serializableVersion}`);
    return serializableVersion;

  }
}

