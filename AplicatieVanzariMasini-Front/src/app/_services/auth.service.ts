import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService} from "@auth0/angular-jwt"

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = 'https://localhost:44329/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      //waiting for token to arrive from server
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
         this.decodedToken = this.jwtHelper.decodeToken(user.token);
         console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
