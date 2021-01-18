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
}
