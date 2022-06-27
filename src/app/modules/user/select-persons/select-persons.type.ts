export interface Persons {
    total: number,
    noOfInfants: number,
    noOfAdults: number,
    noOfTotalHandLuggage: number,
    noOfTotalHoldLuggage: number,
}


export interface IBagsOptions {
    selectedAdults?: number,
    selectedChildren?: number,
    bagsSelected: number,
    bagsQueryType: string
    bagsType: string
}

export enum BagsType {
    hand = "Hand",
    hold = "Hold"
  }
  
  export enum BagsQueryType {
    adult = "Adult",
    children = "Children"
  }