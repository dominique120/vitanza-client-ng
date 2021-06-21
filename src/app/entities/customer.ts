import { Order } from "./order"
import { Filter_installation } from "./filter_installation"
import { Note } from "./note"

export class Customer{
  PK: string; //client Id
  SK: string; //client Id

  GSI1PK: string; // full name
  GSI1SK: string; // district
  GSI2PK: string; // status
  Address1: string;
  Address2: string;
  Phone1: string;
  Phone2: string;
  Intrest: string;
  Notes: string;
  Email: string;
  inCharge: string;
  dateAdded: string;

  // Orders
  orders:Order[];

  // Filter installations
  filterInstallations: Filter_installation[];

  // Notes
  notes: Note[];

}
