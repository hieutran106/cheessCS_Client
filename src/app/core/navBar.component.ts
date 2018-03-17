import { User } from './../model/user.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: "cNavbar",
    templateUrl: "navBar.component.html"
})
export class NavbarComponent {
    constructor(private user: User,private router: Router) {

    }
    logout() {
        this.user.token=null;
        this.router.navigateByUrl("/login");
    }
}