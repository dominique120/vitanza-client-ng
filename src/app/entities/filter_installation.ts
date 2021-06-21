import { Customer } from "./customer";
import { Filter_change } from "./filter_change"
import { Product } from "./product";

export class Filter_installation {
  PK: string; //client Id
  SK: string; // FLI|uuid
  GSI1PK: string; // FLI|uuid
  GSI1SK: string; // date
  Notes: string;
  Address: string;
  payDoc: string;
  Type: string;
  Who: string;
  Total: number;
  payInfo: string;
  dateAdded: string;

  filterChanges: Filter_change[];

  productType: Product;

  customer: Customer;
}
