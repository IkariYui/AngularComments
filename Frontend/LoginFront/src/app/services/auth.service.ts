import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import data from 'src/assets/data.json';

@Injectable()
export class AuthService {
  private URL = 'http://localhost:3000';
  private dataUrl = 'src/assets/data.json';

  constructor(private http:HttpClient,
    private jwtHelper:JwtHelperService 
    ) { }

  singin(user:any){
    return this.http.post(`${this.URL}/user/singin`,user);
  }

  isAuth():boolean{
    const token = sessionStorage.getItem('token');
    if( this.jwtHelper.isTokenExpired(token) ||  !sessionStorage.getItem('token')){
      return false;
    }
    return true;
  }

  getDataInfo():void{
    this.http.get("src/assets/data.json").subscribe(data =>{
      
      console.log(data);      
    })
  }
}

//Crear método de consumo del objeto json
//getDataInfo
//Public dataInfo:Any[]
//This.dataInfo
//If data != null