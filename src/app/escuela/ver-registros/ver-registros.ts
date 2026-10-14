import { Component, OnInit } from "@angular/core";
import { ICinepolis } from "../cinepolis";
import { FormGroup, FormControl, FormsModule,ReactiveFormsModule,} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: "app-ver-registros",
  styleUrl: "./ver-registros.css",
  templateUrl: "./ver-registros.html",
})
export class VerRegistros implements OnInit {
  formulario!: FormGroup;
  cliente: ICinepolis[] = [];
  indiceEdicion: number = -1;
  editando: boolean = false; 

  nuevoCliente: ICinepolis = {
    nombre: "",
    compradores: 0,
    tarjeta: false,
    boletos: 0,
    valorPagar: 0,
  };

  ngOnInit(): void {
    this.cargarCliente();

    this.formulario = new FormGroup({
      nombre: new FormControl(""),
      compradores: new FormControl(""),
      tarjeta: new FormControl(false),
      boletos: new FormControl(""),
    });
  }

  cargarCliente(): void {
    const datos = localStorage.getItem("cliente");
    if (datos) {
      this.cliente = JSON.parse(datos);
    }
  }

  guardarEdicion(): void {
    this.nuevoCliente.nombre = this.formulario.value.nombre;
    this.nuevoCliente.compradores = Number(this.formulario.value.compradores);
    this.nuevoCliente.tarjeta = this.formulario.value.tarjeta;
    this.nuevoCliente.boletos = Number(this.formulario.value.boletos);

    if (
      !this.nuevoCliente.nombre.trim() ||
      this.nuevoCliente.compradores <= 0 ||
      this.nuevoCliente.boletos <= 0
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (this.nuevoCliente.boletos > this.nuevoCliente.compradores * 7) {
      alert("No se pueden comprar más de 7 boletos por persona");
      return;
    }

    let total = this.nuevoCliente.boletos * 12;

    if (this.nuevoCliente.boletos >= 6) {
      total = total - total * 0.15;
    } else if (
      this.nuevoCliente.boletos >= 3 &&
      this.nuevoCliente.boletos <= 5
    ) {
      total = total - total * 0.1;
    }

    if (this.nuevoCliente.tarjeta === true) {
      total = total - total * 0.1;
    }

    this.nuevoCliente.valorPagar = total;

    if (this.indiceEdicion !== -1) {
      this.cliente[this.indiceEdicion] = { ...this.nuevoCliente };
    }

    localStorage.setItem("cliente", JSON.stringify(this.cliente));
    this.cancelarEdicion();
    this.cargarCliente();
  }

  editarCliente(index: number): void {
    const item = this.cliente[index];
    this.formulario.patchValue({
      nombre: item.nombre,
      compradores: item.compradores,
      tarjeta: item.tarjeta,
      boletos: item.boletos,
    });
    this.indiceEdicion = index;
    this.editando = true; 
  }

  eliminarCliente(index: number): void {
    this.cliente.splice(index, 1);
    localStorage.setItem("cliente", JSON.stringify(this.cliente));
  }

  cancelarEdicion(): void {
    this.formulario.reset({
      nombre: "",
      compradores: "",
      tarjeta: false,
      boletos: "",
    });
    this.indiceEdicion = -1;
    this.editando = false; 
  }
}
