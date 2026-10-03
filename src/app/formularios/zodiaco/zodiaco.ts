import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html'
})
export class Zodiaco {

  nombre: string = ''
  paterno: string = ''
  materno: string = ''

  dia: number = 0
  mes: number = 0
  anio: number = 0

  edad: number = 0
  actual: number = 2026
  sexo: string = ''

  resultado: number = 0
  signo: string = ''
  img: string = ''

  imprimir(): void {

     if ((this.dia)<1 || (this.dia) > 31) {
      alert('El dia deb eser entre 1 a 31');
      return;
    }

    if ((this.mes)<1 || (this.mes) > 12) {
      alert('El mes debe estar entre 1 y 12')
      return;
    }

    if ((this.anio) < 1900 || (this.anio)>2026){
      alert('El año no puede ser mas bajo q 1900 ni mayor a 2026')
      return;
    }
 
    this.edad = this.actual - (this.anio);

    this.resultado = ((this.anio) - 4) % 12;

    switch (this.resultado) {

      case 0:
        this.signo = 'Rata'
        this.img = 'Rata.png'
        break;

      case 1:
        this.signo = 'Buey'
        this.img = 'Buey.png'
        break;

      case 2:
        this.signo = 'Tigre'
        this.img = 'Tigre.png'
        break;

      case 3:
        this.signo = 'Conejo'
        this.img = 'Conejo.png'
        break;

      case 4:
        this.signo = 'Dragón'
        this.img = 'Dragon.png'
        break;

      case 5:
        this.signo = 'Serpiente'
        this.img = 'Serpiente.png'
        break;

      case 6:
        this.signo = 'Caballo'
        this.img = 'Caballo.png'
        break;

      case 7:
        this.signo = 'Cabra'
        this.img = 'Cabra.png'
        break;

      case 8:
        this.signo = 'Mono'
        this.img = 'Mono.png'
        break;

      case 9:
        this.signo = 'Gallo'
        this.img = 'Gallo.png'
        break;

      case 10:
        this.signo = 'Perro'
        this.img = 'Perro.png'
        break;

      case 11:
        this.signo = 'Puerco'
        this.img = 'Puerco.png'
        break;
    }
  }
}