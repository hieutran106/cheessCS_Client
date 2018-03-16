import { User } from './user.model';
import {Http,Request, RequestMethod} from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

const HOST = "http://localhost";
const PORT = 3500;

@Injectable()
export class RestService {
    baseUrl: string;
    constructor(private http: Http, private user: User) {
        this.baseUrl =`${HOST}:${PORT}/`;
    }
    authenticate(user:string, pass:string): Observable<boolean> {
        let request:Request = new Request({
            method: RequestMethod.Post,
            url: this.baseUrl+"login",
            body: {username: user, password:pass}
        });
        console.log(request);
        return this.http.request(request).map( res => {
            console.log("aa");
            let r = res.json();
            console.log(r);
            if (r.success) {
                this.user.token=r.token;
                this.user.displayName=r.displayName;
                this.user.winMatch=r.winMatch;
                this.user.totalMatch=r.totalMatch;
            }
            return r.success;
        });
    }
    getNextMove(): Observable<any> {
        let request = new Request({
            method: RequestMethod.Get,
            url: this.baseUrl+"engine",
            body: {board:'examaple',fullMove:3}
        });
        if (this.user.token!=null) {
            request.headers.set("Authorization",`Bearer<${this.user.token}>`)
        }
        return this.http.request(request).map(
            response => response.json()
        );
    }
}
