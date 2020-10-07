import { Component, OnInit } from '@angular/core';
import { ContactoModel } from 'src/app/models/contacto.model';

import  Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ContactosService } from 'src/app/services/contactos.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contacto =new ContactoModel();
  
  
  

  constructor(private contactosService:ContactosService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');

    if(id!=='nuevo'){
      this.contactosService.getContacto(id).subscribe((resp:ContactoModel)=>{
        this.contacto=resp;
        this.contacto.id=id;
      });
    }

    
  }

  guardar(form:NgForm){

    if(form.invalid){
      Swal.fire('Error','Algun campo esta incorrecto', 'info')
      return;
    }

    Swal.fire('Espere','Guardando informacion','info');
    Swal.showLoading();

    let peticion:Observable<any>;

    if(this.contacto.id){
      peticion=this.contactosService.actualizarContacto(this.contacto);
    }else{
      peticion=this.contactosService.crearContacto(this.contacto);
    }

    peticion.subscribe(resp=>{
      Swal.fire(this.contacto.nombre, 'Se actualizo correctamente', 'success');
    });
    console.log(this.contacto);
    
  }

 


}
