import { Component, OnInit } from '@angular/core';
import { IAlumnos } from "../alumnos";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
  })
  export class ListaAlumnos implements OnInit {
    formulario!:FormGroup

    alumnos: IAlumnos[] = [];
    nuevoAlumno: IAlumnos = {
      matricula: 'xx',
      nombre: 'xx',
      correo: 'xx',
      materia: 'xx'
    }

    ngOnInit(): void {
      this.cargarAlumno()
      this.formulario=new FormGroup({
        matricula: new FormControl(''),
        nombre: new FormControl(''),
        correo: new FormControl(''),
        materia: new FormControl(''),

      })
    }

    muestraAlumnos(): void {
      this.nuevoAlumno.matricula=this.formulario.value.matricula
      this.nuevoAlumno.nombre=this.formulario.value.nombre
      this.nuevoAlumno.correo=this.formulario.value.correo
      this.nuevoAlumno.materia=this.formulario.value.materia
}
    cargarAlumno(): void {

}

}