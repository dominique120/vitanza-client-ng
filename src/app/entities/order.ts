import { Customer } from "./customer"
import { OrderDetail } from "./orderdetail"

export class Order{
  PK: string; //client Id
  SK: string; // ORD|uuid
  GSI1PK: string; // ORD|uuid
  GSI1SK: string; // date
  GSI2PK: string; // status
  Notes: string;
  DateClosed: string;
  payDoc: string;
  payInfo: string;
  Total: number;
  DeliveryMethod: string;
  dateAdded: string;

  // fill with fetched customer class
  Customer: Customer;

  // Order details
  orderDetails:OrderDetail[];
}
