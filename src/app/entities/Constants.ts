export class Constants {
  //private static base_url_port: string = "https://cors-anywhere.herokuapp.com/http://vts-alb-316342429.us-east-1.elb.amazonaws.com:80/vts/api/v1";
  private static base_url_port: string = "http://127.0.0.1:80/vts/api/v1";

  // Customers
  public static customerUrl: string = Constants.base_url_port + "/customers";
  public static customerWithId(customer_id: string){
    return Constants.base_url_port + "/customers?id=" + customer_id;
  }

  // Auth
  public static authUrl: string = Constants.base_url_port + "/auth";

  // Order Details
  public static ordeDetailWithOrderId(order_id: string){
    return  Constants.base_url_port + "/chemicals/orderdetails/by_order?id=" + order_id;
  }

  // Orders
  public static orderUrl: string = Constants.base_url_port + "/chemicals/orders";
  public static outstandingOrdersUrl: string = Constants.base_url_port + "/chemicals/orders/outstanding";
  public static orderWithId(order_id: string){
    return  Constants.base_url_port + "/chemicals/orders?id=" + order_id;
  }

  // Products
  public static productUrl: string = Constants.base_url_port + "/chemicals/products";
  public static productWithId(order_id: string){
    return  Constants.base_url_port + "/chemicals/products?id=" + order_id;
  }


}
