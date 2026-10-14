import { Component, OnInit } from "@angular/core";
import { ICinepolis } from "../cinepolis";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cinepolis",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: "./cinepolis.css",
  templateUrl: "./cinepolis.html",
})
export class Cinepolis implements OnInit {
  formulario!: FormGroup;
  clientes: ICinepolis[] = [];

  nuevoCinepolis: ICinepolis = {
    nombre: "",
    compradores: 0,
    tarjeta: false,
    boletos: 0,
    valorPagar: 0,
  };

  ngOnInit(): void {
    this.cargarClientes();

    this.formulario = new FormGroup({
      nombre: new FormControl(""),
      compradores: new FormControl(""),
      tarjeta: new FormControl(false),
      boletos: new FormControl(""),
    });
  }

  cargarClientes(): void {
    const datos = localStorage.getItem("cliente");
    if (datos) {
      this.clientes = JSON.parse(datos);
    }
  }

  muestraCinepolis(): void {
    this.nuevoCinepolis.nombre = this.formulario.value.nombre;
    this.nuevoCinepolis.compradores = Number(this.formulario.value.compradores);
    this.nuevoCinepolis.tarjeta = this.formulario.value.tarjeta;
    this.nuevoCinepolis.boletos = Number(this.formulario.value.boletos);

    if (
      !this.nuevoCinepolis.nombre.trim() ||
      this.nuevoCinepolis.compradores <= 0 ||
      this.nuevoCinepolis.boletos <= 0
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (this.nuevoCinepolis.boletos > this.nuevoCinepolis.compradores * 7) {
      alert("No se pueden comprar más de 7 boletos por persona");
      return;
    }

    let total = this.nuevoCinepolis.boletos * 12;

    if (this.nuevoCinepolis.boletos >= 6) {
      total = total - total * 0.15;
    } else if (
      this.nuevoCinepolis.boletos >= 3 &&
      this.nuevoCinepolis.boletos <= 5
    ) {
      total = total - total * 0.1;
    }

    if (this.nuevoCinepolis.tarjeta === true) {
      total = total - total * 0.1;
    }

    this.nuevoCinepolis.valorPagar = total;

    // Guardar en el arreglo y en localStorage
    this.clientes.push({ ...this.nuevoCinepolis });
    localStorage.setItem("cliente", JSON.stringify(this.clientes));

    alert("¡Compra procesada y guardada con éxito!");
    this.formulario.reset({ tarjeta: false });
  }
}
