import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comentario } from '../interfaces/comentario';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private myAppUrl = 'https://localhost:44333/';
  private myApiUrl = 'api/comentario/'

  constructor(private http:HttpClient) { }

  getListComentarios():Observable<any>{
   return this.http.get(this.myAppUrl+this.myApiUrl);
  }

  deleteComentario(id:number):Observable<any>{
    return this.http.delete(this.myAppUrl+this.myApiUrl+id);
  }

  getComentario(id:number):Observable<any>{
    //const cachedData = localStorage.getItem(`comentarioCache_${id}`);
    //if (cachedData) {
      
      // Si encontramos datos en el cache, los devolvemos como un observable
      //return of(JSON.parse(cachedData));
    //}    

    // Si no hay datos en el cache, hacemos la petición al servidor
      return this.http.get(this.myAppUrl+this.myApiUrl+id);//.pipe(
        // Almacenamos los datos en el cache cuando recibimos una respuesta
      //tap(data => {
        //localStorage.setItem(`comentarioCache_${id}`, JSON.stringify(data));
      }
    
  //}

  saveComentario(comentario:Comentario):Observable <any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,comentario);
  }

  updateCOmentario(id:number, comentario:Comentario): Observable<any>{
   return this.http.put(this.myAppUrl+this.myApiUrl+id,comentario);
  }
}
