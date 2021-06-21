import { Customer } from "./customer";

export class Note {
  PK: string; //client Id
  SK: string; // note id
  GSI1PK: string; // status
  GSI1SK: string; // date
  Note: string;
  dateAdded: string;

  customer: Customer;
}
