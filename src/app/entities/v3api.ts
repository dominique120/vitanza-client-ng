export class v3Api {
  public static auth = "https://a20gat4r39.execute-api.us-east-1.amazonaws.com/auth";
  public static delete_item = "https://v7p5ev9w6h.execute-api.us-east-1.amazonaws.com/delete-item";
  public static get_item = "https://q1ad4g4yi0.execute-api.us-east-1.amazonaws.com/get-item";
  public static update_item = "https://kq3635jygd.execute-api.us-east-1.amazonaws.com/update-item";
  public static new_item = "https://d9dhjyl9tb.execute-api.us-east-1.amazonaws.com/new-item";
  public static query = "https://cc0c87e7vc.execute-api.us-east-1.amazonaws.com/query-expression-2";
}

export class query_body {
  expression: string;
  key_name: string;
  expression_values: any;
  projection: string;
}

export class update_body {
  contents: any;
  primarykey: any;
}

export class auth_body {
  username:string;
  password:string;
}
