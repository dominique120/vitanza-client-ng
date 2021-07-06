import { ProductsService } from './../../../services/products.service';
import { Product } from '../../../entities/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[];
  newProduct: any;
  productUpdated: Product;

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  reverse: boolean = false;
  productFilter: any = { Name: '' }
  productOrder: string = "Name"
  pageNumber: number = 1

  productTypes: any = ["Filter", "Chemical"]
  statusOptions: any = ["Active", "Deactive"]

  AddProductForm = new FormGroup({
    SK: new FormControl(), // type
    GSI1PK: new FormControl(), // Names
    GSI1SK: new FormControl(), // District
    BasePrice: new FormControl(),
    Description: new FormControl(),
    Stock: new FormControl(),
    Notes: new FormControl(),
    Name: new FormControl(),
    DateAdded: new FormControl()
  });

  UpdateProductForm = new FormGroup({
    PK: new FormControl(), // ID
    SK: new FormControl(), // type
    GSI1PK: new FormControl(), // Names
    GSI1SK: new FormControl(), // District
    BasePrice: new FormControl(),
    Description: new FormControl(),
    Stock: new FormControl(),
    Notes: new FormControl(),
    Name: new FormControl(),
    Status: new FormControl(),
    DateChanged: new FormControl(),
    DateAdded: new FormControl()
  });

  faEdit = faEdit;
  faTimes = faTimes;

  constructor(private product_svc: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  showAdditionForm() {
    $("#addition-form").slideDown("slow");
  }

  closeAdditionForm() {
    $("#addition-form").slideUp("slow");
  }

  getProducts(): void {
    this.product_svc.getProcutsByStatus("Active").subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );
  }

  select(productId, type) {
    this.product_svc.selectOneProduct(productId, type).subscribe(
      (res: Product) => {
        this.productUpdated = res;
      }
    );
    $("#update-form").modal('show');
  }

  setOrder(value: string) {
    if (this.productOrder === value) {
      this.reverse = !this.reverse;
    }
  }

  addProduct(formValues) {
    let newProduct: Product = new Product();

    newProduct.SK = formValues.SK; // types
    newProduct.GSI1SK = formValues.GSI1SK;
    newProduct.GSI1PK = formValues.GSI1SK;
    newProduct.BasePrice = formValues.BasePrice;
    newProduct.Description = formValues.Description;
    newProduct.Stock = formValues.Stock;
    newProduct.Notes = formValues.Notes;
    newProduct.Name = formValues.Name;

    let statusCode = this.product_svc.insertProduct(newProduct)

    if (statusCode = 201) {
      this.products.push(this.newProduct);
      this.AddProductForm.reset();
      $("#addition-form").slideUp("slow");
      alert("Added product: " + newProduct.Name);
    } else {
      alert(newProduct.Name + " was not added!! \n\nError code: " + statusCode);
    }
  }
}
