import { NgModule } from '@angular/core';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'contactos',component:ContactosComponent},
  {path:'contacto/:id',component:ContactoComponent},
  {path:'**',pathMatch:'full',redirectTo:'contactos'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
