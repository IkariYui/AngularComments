import { Component, OnInit,  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  listComentarios: Comentario[] =[] 

  constructor(private comentarioService:ComentarioService,
              private toastr: ToastrService){}

  ngOnInit(): void{
    this.getComentarios();

  }

  getComentarios(){ 
    this.comentarioService.getListComentarios().subscribe(data =>{
      this.listComentarios = data;
    }, error =>{
      console.log(error);
    })
    
    
  }

  eliminarComentario(id:any){

    console.log(id);
    this.comentarioService.deleteComentario(id).subscribe(data=> {
      this.getComentarios();
      this.toastr.success('Comentario eliminado con éxito', 'Comentario eliminado');
    }, error => {
      console.log(error);
    }
    )
  }
}
