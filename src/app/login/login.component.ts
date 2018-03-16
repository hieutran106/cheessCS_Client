import { RestService } from './../model/rest.service';
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class LoginComponent {
    username:string;
    password:string;
    formSubmitted:boolean =false;
    constructor(private restService: RestService,
    private router: Router) {

    }
    private authenticate(username:string, password:string) {
        this.restService.authenticate(username,password).subscribe(
            isLogin => {
                if (isLogin) {
                    //redirect
                    this.router.navigateByUrl("/dashboard");
                } else {
                    //Inform

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