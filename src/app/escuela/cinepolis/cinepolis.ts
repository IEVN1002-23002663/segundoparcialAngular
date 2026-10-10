import { Component, OnInit } from '@angular/core';
import { ICinepolis } from "../cinepolis";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit {

  formulario!: FormGroup;

    nuevoCinepolis: ICinepolis = {
    nombre: ' ',
    compradores: 0,
    tarjeta: false,
    boletos: 0,
    valorPagar: 0
  };

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(''),
      tarjeta: new FormControl(false),
      boletos: new FormControl('')
    });

  }

  muestraCinepolis(): void {

    this.nuevoCinepolis.nombre = this.formulario.value.nombre;
    this.nuevoCinepolis.compradores = this.formulario.value.compradores;
    this.nuevoCinepolis.tarjeta = this.formulario.value.tarjeta;
    this.nuevoCinepolis.boletos = this.formulario.value.boletos;

    if (this.nuevoCinepolis.boletos > this.nuevoCinepolis.compradores * 7) {
      alert('No se pueden comprar más de 7 boletos por persona');
      return;
    }

    this.nuevoCinepolis.valorPagar = this.nuevoCinepolis.boletos * 12;

    if (this.nuevoCinepolis.boletos >= 6 ) {
      this.nuevoCinepolis.valorPagar =
        this.nuevoCinepolis.valorPagar -
        (this.nuevoCinepolis.valorPagar * 0.15);
    }

    if (this.nuevoCinepolis.boletos >= 3 && this.nuevoCinepolis.boletos <= 5) {
      this.nuevoCinepolis.valorPagar =
        this.nuevoCinepolis.valorPagar -
        (this.nuevoCinepolis.valorPagar * 0.10);
    }

    if (this.nuevoCinepolis.tarjeta == true) {
      this.nuevoCinepolis.valorPagar =
        this.nuevoCinepolis.valorPagar -
        (this.nuevoCinepolis.valorPagar * 0.10);
  }


}
}