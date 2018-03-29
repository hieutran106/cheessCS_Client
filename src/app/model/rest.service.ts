import { Move } from './move.model';
import { User } from './user.model';
import {Http,Request, RequestMethod} from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';


@Injectable()
export class RestService {
    baseUrl: string;
    constructor(private http: Http, private user: User) {
        this.baseUrl =environment.API_URL;
        console.log(this.baseUrl);
    }
    authenticate(user:string, pass:string): Observable<boolean> {
        let request:Request = new Request({
            method: RequestMethod.Post,
            url: this.baseUrl+"api/engine/login",
            body: {username: user, password:pass}
        });

        return this.http.request(request).map( res => {
            let r = res.json();
            if (r.success) {
                this.user.token=r.token;
                this.user.email=r.email;
                this.user.username=r.username;
            }
            return r.success;
        });
    }
    getNextMove(fen:string,difficulty:number): Observable<any> {
        let request = new Request({
            method: RequestMethod.Post,
            url: this.baseUrl+"api/engine/getbestmove",
            body: {
                fen:fen,
                token:this.user.token,
                difficulty:difficulty
            }
        });
        return this.http.request(request).map(
            response => {
                return response.json();
            }
        );
    }
}
