import { RestService } from './../model/rest.service';
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class LoginComponent {
    username:string;
    password:string;
    formSubmitted:boolean =false;
    isInvalidAuthen = false;
    registerUrl:string;
    constructor(private restService: RestService,
    private router: Router) {
        this.registerUrl=environment.REGISTER_URL;
    }
    private authenticate(username:string, password:string) {
        this.restService.authenticate(username,password).subscribe(
            isLogin => {
                if (isLogin) {
                    //redirect                
                    this.router.navigateByUrl("/dashboard");
                } else {
                    //Inform
                    this.isInvalidAuthen=true;
                }
            }
        );
    }
    submitForm(form: NgForm) {
        this.formSubmitted=true;
        if (form.valid) {
            this.authenticate(this.username,this.password);
        }
    }
}