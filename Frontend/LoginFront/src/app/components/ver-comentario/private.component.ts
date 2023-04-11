import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  imgBanner="https://cdn-media-1.freecodecamp.org/images/1*PNlbgb05IwSxOhAz0aA2rg.png";
  id:number;
  comentario:Comentario|undefined;

  constructor(private aRoute: ActivatedRoute,
         private _comentarioService:ComentarioService){
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;

    
  }

  ngOnInit(): void {
    this.getComentario();
      
  }

  getComentario(){
    this._comentarioService.getComentario(this.id).subscribe(data =>{
      this.comentario=data;
    })
  }

}