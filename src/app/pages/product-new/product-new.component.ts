import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  public form: FormGroup;
  private estado: string = "";
  private departamento: string = "";
  private fileData: File = null;
  previewUrl: any = null;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private fileProgress(fileInput: any) {
    this.fileData = <File>fileInput;
    this.preview();
  }

  private preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onFileUpload(event) {
   // this.spinner.show();
    this.fileProgress(event.files[0]);
   // this.spinner.hide();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
      codigo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      marca: new FormControl("", [Validators.required, Validators.minLength(1)]),
      modelo: new FormControl("", [Validators.required, Validators.minLength(1)]),
      serie: new FormControl("", [Validators.required, Validators.minLength(1)]),
      proveedor: new FormControl("", [Validators.required])
    });
  }

  guardarEstado(estado: string) {
    this.estado = estado;
    console.log(this.estado)
  }

  guardarDepartamento(depa: string) {
    this.departamento = depa;
    console.log(this.departamento)
  }

  guardarEquipo() {
    //this.spinner.show();
    /*let equipo: Equipo = {
      codigo: this.form.get("codigo").value,
      componentes: [],
      estado: this.estado,
      idArea: this.departamento,
      idProveedor: this.form.get("proveedor").value,
      idRegistroHistorico: "1",
      idRegistroTecnico: "1",
      imagen: this.previewUrl,
      marca: this.form.get("marca").value,
      modelo: this.form.get("modelo").value,
      nombre: this.form.get("nombre").value,
      serie: this.form.get("serie").value
    };
    console.log(equipo)
    this.equipoService.guardarEquipos(equipo).then(
      (data: any) => {
        console.log(data);
        this.spinner.hide();
      }
    ).catch(
      (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    )*/
    console.log("Hello MEN")
  }

}
