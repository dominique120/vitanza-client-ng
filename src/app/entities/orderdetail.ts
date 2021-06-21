import { Product } from "./product";

export class OrderDetail{
  PK: string; //orderId
  SK: string; // orderDetailID
  GSI2PK: string; //productid
  Qty: number;
  oPrice: number;
  Name: string;
  dateAdded: string;


  product:Product;
}
