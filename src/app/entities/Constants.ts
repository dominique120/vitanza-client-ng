export class Constants {
  //private static base_url_port: string = "https://cors-anywhere.herokuapp.com/http://vts-alb-316342429.us-east-1.elb.amazonaws.com:80/vts/api/v1";
  private static base_url_port: string = "http://192.168.1.72:80/vts/api/v1";
  private static base_url_port_v2: string = "http://192.168.1.72:80/vts/api/v2";




/*
  V2 API with new database design
*/

// AP 1
public static clientWithStatus(status:string){
  return Constants.base_url_port_v2 + "/client?status=" + status
}

// AP 2
public static clientById(id:string){
  return Constants.base_url_port_v2 + "/client?id=" + id
}

// AP 3
public static ordersByClient(clientid:string){
  return Constants.base_url_port_v2 + "/order?clientid=" + clientid
}

// AP 4
public static filtersByClient(clientid:string){
  return Constants.base_url_port_v2 + "/filter?clientid=" + clientid
}

// AP 5
public static ordersByStatus(status:string){
  return Constants.base_url_port_v2 + "/order?status=" + status
}

// AP 6
public static getFilter(clientid:string, filterid:string){
  return Constants.base_url_port_v2 + "/filter?clientid=" + clientid + "&filterid=" + filterid
}

// AP 7
public static getOrder(clientid:string, orderid:string){
  return Constants.base_url_port_v2 + "/order?clientid=" + clientid + "&orderid=" + orderid
}

// AP 8
public static detailsByOrder(orderid:string){
  return Constants.base_url_port_v2 + "/orderdetail?orderid=" + orderid
}

// AP 9
public static getProduct(productid:string, category:string){
  return Constants.base_url_port_v2 + "/product?productid=" + productid + "&category=" + category
}

// AP 10
public static getCurrentStock(category:string){
  return Constants.base_url_port_v2 + "/product?category=" + category
}

// AP 11
public static notesByStatus(status:string){
  return Constants.base_url_port_v2 + "/note?status=" + status
}

// AP 12
public static changesByFilter(filterid:string){
  return Constants.base_url_port_v2 + "/filterchange?filterid=" + filterid
}

// AP 13
public static changesByStatusDates(status:string,start:string,end:string){
  return Constants.base_url_port_v2 + "/filterchange?status=" + status + "?start=" + start + "?end=" + end
}





  // Customers
  public static customerUrl: string = Constants.base_url_port + "/customers";
  public static customerWithId(customer_id: string){
    return Constants.base_url_port + "/customers?id=" + customer_id;
  }
  public static deactivateCustomerWithId(customer_id: string){
    return Constants.base_url_port + "/customers/deactivate?id=" + customer_id;
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
