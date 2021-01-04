import { ProductsService } from './../../../services/products.service';
import { chProduct } from '../../../entities/ch_product';
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
  products: chProduct[];
  newProduct: any;
  productUpdated: chProduct;


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
      (res: chProduct[]) => {
        this.products = res;
      }
    );
  }



  seleccionar(itemProduct: chProduct){
    console.log(itemProduct);
    this.productUpdated = itemProduct;
    $("#formularioActualizar").modal('show');
  }

  eliminar(itemProduct: chProduct){
    var respuesta = confirm("Delete " + itemProduct.ProductId_uuid + "?");
    if (respuesta == true) {
      this.product_svc.deleteProducts(itemProduct.ProductId_uuid).subscribe();
      this.products = this.products.filter(item => item.ProductId_uuid !== itemProduct.ProductId_uuid);
      alert("Se ha eliminado: "  + itemProduct.ProductId_uuid );
    }
  }

}
