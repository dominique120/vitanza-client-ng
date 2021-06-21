import { Customer } from "./customer";

export class Filter_change {
  PK: string; //FLI|uuid
  SK: string; // FLC|uuid
  GSI1PK: string; // Status
  GSI1SK: string; // datechange
  GSI2PK: string; // CLI|uuid
  Notes: string;
  Who: string;
  payDoc: string;
  Total: number;
  payInfo: string;
  dateAdded: string;

  customer: Customer;
}
