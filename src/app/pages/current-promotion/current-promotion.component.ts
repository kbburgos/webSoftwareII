import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../core/services/product/producto.service";
import { Products } from "../../core/interface/products";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CategoriaService } from "../../core/services/categoria/categoria.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-current-promotion",
  templateUrl: "./current-promotion.component.html",
  styleUrls: ["./current-promotion.component.css"],
  providers: [MessageService],
})

/**
 * @classdesc Container class of CurrentPromotionComponent.
 * @desc Creation Date: 08/18/2020
 * @class 
 * @public
 * @version 2.0.0
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */
export class CurrentPromotionComponent implements OnInit {
  form: FormGroup;
  display: boolean = false;
  bandera: boolean = false;
  mensaje: boolean = false;
  slide: boolean = false;
  ProductEdit: Products;
  imagen: any;
  productos: Products[];
  colsdata: Products[];
  categoria: string = 'B9MwktyLd7z4onQIKKAw';
  Urls: any = [];
  allfiles: any = [];
  previewUrl: any = '';
  producSlide: any = [];
  data: any = '';
 

  cols = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripcion" },
    { field: "precio", header: "Precio" },
    { field: "stock", header: "Stock" },
  ];

  constructor(
    private productosService: ProductoService,
    private formBuilder: FormBuilder,
    private caterogiasService: CategoriaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.clearState();
    this.colsdata = [];
    this.productos = [];

    this.cargar();
  }


   /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading products from firebase. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  cargar() {
    this.spinner.show();
    let pro = this.productosService.getProductos().subscribe(
      (item: any) => {
        console.log(item);
        this.filtrado(item);
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        pro.unsubscribe();
        this.showMessage("Error al cargar las promociones", "error", "Error!");
      }
    );
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for filter the promotions from firebase. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON promotions
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  filtrado(coleccion) {
    let temporal: any[] = [];
    coleccion.map((item) => {
      if (item.idCategoria == "B9MwktyLd7z4onQIKKAw" && item.isActivo) {
        temporal.push(item);
      }
    });
    this.data = coleccion;
    this.productos = temporal;
    this.spinner.hide();
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method build a form and create valid inputs. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      descripcion: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      precio: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      stock: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method display the dialogue to edit the promotion. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  showDialogProduct(productos) {
    this.display = true;
    this.ProductEdit = Object.assign({}, productos);
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method gets the concent from the client to edit a promotion. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */
  confirmar() {
    let producto: Products = {
      idProducto: this.ProductEdit.idProducto,
      descripcion: this.ProductEdit.descripcion,
      foto: this.ProductEdit.foto,
      idCategoria: this.categoria,
      nombre: this.ProductEdit.nombre,
      isActivo: true,
      precio: this.ProductEdit.precio,
      stock: this.ProductEdit.stock,
      slide: this.ProductEdit.slide,
    };

    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que desea editar la promoción?",
      accept: () => {
        console;
        this.update(producto),
          (err: any) => {
            console.log(err);
            this.showMessage("Error al editar la promoción", "error", "Error!");
          };
        this.display = false;
        this.clearState();
      },
    });
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method confirm if the client wants to delete promotions. When the client confirm the promotion change the isActive field to false. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */  

  confirmarEliminar(producto: Products) {
    this.confirmationService.confirm({
      message: "¿Est&aacute; seguro que deseas eliminar la promoción?",
      accept: () => {
        this.eliminarProduct(producto),
          (err: any) => {
            console.log(err);
            this.showMessage(
              "Error al eliminar la promoción",
              "error",
              "Error!"
            );
          };
      },
    });
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method update a promotion. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  update(producto: Products) {
    producto.idCategoria = this.categoria;
    this.productosService.updateProduct(producto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al editar la promoción", "error", "Error!");
      };
    this.clearState();
    this.showMessage("Promoción activa", "success", "Activa!");
  }

  newPromotion() {
    this.bandera = true;
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method upload the image of promotions. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  onFileUpload(event) {
    this.spinner.show();
    const files = event.files;
    this.fileProgress(files);
    this.spinner.hide();
  }

  fileProgress(file: any) {
    for (let i = 0; i < file.length; i++) {
      var mimeType = file[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      this.allfiles.push(file[i]);
      const reader = new FileReader();
      (reader.onload = (fileData) => {
        this.previewUrl = reader.result;
        this.Urls.push(this.previewUrl);
      }),
        (err: any) => {
          console.log(err);
          this.showMessage("Error al cargar las imágenes", "error", "Error!");
        };
      reader.readAsDataURL(file[i]);
    }
  }

  save() {
    this.addProduct();
  }




  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method delete promotions from firebase. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  eliminarProduct(producto: Products) {
    producto.isActivo = false;
    this.productosService.updateProduct(producto),
      (err: any) => {
        console.log(err);
        this.showMessage("Error al eliminar la promoción", "error", "Error!");
      };
    this.showMessage("Promoción inactiva", "success", "Inactiva!");
    this.clearState();
  }

  clearState() {
    this.display = false;
    this.previewUrl = null;
    this.Urls = [];
    this.form.reset();
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method add the promotion. <br> Creation Date: 08/18/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */
  addProduct() {
    let producto: Products = {
      descripcion: this.form.get("descripcion").value,
      foto: this.previewUrl,
      idCategoria: this.categoria,
      nombre: this.form.get("nombre").value,
      isActivo: true,
      precio: this.form.get("precio").value,
      stock: this.form.get("stock").value,
      slide: this.Urls,
    };

    this.productosService
      .pushProductos(producto)
      .then((data: any) => {
        console.log("Guardado");
        this.display = false;
        this.bandera = false;
        this.clearState();
        this.showMessage(
          "Promoción creado exitósamente",
          "success",
          "Agregado!"
        );
      })
      .catch((err: any) => {
        this.bandera = false;
        this.showMessage("Error al crear la promoción", "error", "Error!");
        console.log(err);
      });
  }

  showSlide(producto: any[]) {
    this.producSlide = producto;
    this.slide = true;
  }

  showMessage(mensaje: string, tipo: string, titulo: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensaje,
      life: 4000,
    });
  }
}
