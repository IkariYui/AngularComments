import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  agregarComentario:FormGroup;
  accion ='Agregar';
  id = 0;
  comentario:Comentario|undefined;

  constructor(private fb:FormBuilder,
              private _comentarioService:ComentarioService,
              private router:Router,
              private aRoute:ActivatedRoute,
              private toastr: ToastrService
              ){
    this.agregarComentario = this.fb.group({
      titulo:['',Validators.required],
      creador:['',Validators.required],
      texto:['',Validators.required]
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
      this.esEditar();  
  }

  esEditar(){
      if(this.id!==0){
        this.accion='Editar';
        this._comentarioService.getComentario(this.id).subscribe(data=>{
          this.comentario = data;
          this.agregarComentario.patchValue({
            titulo:data.titulo,
            texto:data.texto,
            creador:data.creador,
          })
        },error=>{
          console.log(error); 
        })
      }
  }
  agregarEditarComentario(){
    
    if(this.comentario ==undefined){
      
      //Agregar un nuevo comentario

      const comentario:Comentario ={
        titulo:this.agregarComentario.get('titulo')?.value,
        creador:this.agregarComentario.get('creador')?.value,
        texto:this.agregarComentario.get('texto')?.value,
        fechaCreacion: new Date 
      }
  
      this._comentarioService.saveComentario(comentario).subscribe(data =>{
        this.toastr.success('Comentario agregado con éxito', 'Comentario Agregado');
        this.router.navigate(['/']);
      },error=> {
        console.log(error);
      })
      
    } else{

      //Editar comentario
      const comentario:Comentario ={
        id:this.comentario.id,
        titulo:this.agregarComentario.get('titulo')?.value,
        creador:this.agregarComentario.get('creador')?.value,
        texto:this.agregarComentario.get('texto')?.value,
        fechaCreacion: this.comentario.fechaCreacion

    }
    
    this._comentarioService.updateCOmentario(this.id,comentario).subscribe(data=>{
      this.toastr.success('Comentario editado con éxito', 'Comentario editado');
      this.router.navigate(['/']);
    },
    error=> {
      console.log(error);
    })
    }
    
  }
}
