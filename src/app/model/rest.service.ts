import { Move } from './move.model';
import { User } from './user.model';
import {Http,Request, RequestMethod} from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

const HOST = "http://localhost";
const PORT = 9782;

@Injectable()
export class RestService {
    baseUrl: string;
    constructor(private http: Http, private user: User) {
        this.baseUrl =`${HOST}:${PORT}/`;
    }
    authenticate(user:string, pass:string): Observable<boolean> {
        let request:Request = new Request({
            method: RequestMethod.Post,
            url: this.baseUrl+"api/engine/login",
            body: {username: user, password:pass}
        });

        return this.http.request(request).map( res => {
            console.log("aa");
            let r = res.json();
            console.log(r);
            if (r.success) {
                this.user.token=r.token;
                this.user.email=r.email;
            }
            return r.success;
        });
    }
    getNextMove(fen:string): Observable<any> {
        let request = new Request({
            method: RequestMethod.Post,
            url: this.baseUrl+"api/engine/getbestmove",
            body: {
                fen:fen,
                token:this.user.token
            }
        });
        return this.http.request(request).map(
            response => {
                return response.json();
            }
        );
    }
}
