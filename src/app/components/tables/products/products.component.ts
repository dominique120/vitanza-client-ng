import { ProductsService } from './../../../services/products.service';
import { Product } from './../../../entities/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

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


  faEdit = faEdit;
  faTimes = faTimes;
  constructor(private product_svc: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
  }

  mostrarFormularioAgregar(){
    $("#formulario-agregar").slideDown("slow");
  }

  cerrarFormularioAgregar(){
    $("#formulario-agregar").slideUp("slow");
  }

  getProducts(): void {
    this.product_svc.selectProducts().subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );
  }



  seleccionar(itemProduct: Product){
    console.log(itemProduct);
    this.productUpdated = itemProduct;
    $("#formularioActualizar").modal('show');
  }

  eliminar(itemProduct: Product){
    var respuesta = confirm("Delete " + itemProduct.ProductId_uuid + "?");
    if (respuesta == true) {
      this.product_svc.deleteProducts(itemProduct.ProductId_uuid).subscribe();
      this.products = this.products.filter(item => item.ProductId_uuid !== itemProduct.ProductId_uuid);
      alert("Se ha eliminado: "  + itemProduct.ProductId_uuid );
    }
  }

}
