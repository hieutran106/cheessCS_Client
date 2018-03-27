import { User } from './model/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';

@Injectable()
export class AuthenGuard {
    constructor(private user:User,private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
        if (this.user.token==null) {
            this.router.navigate(['login']);
            return false;
        } else return true;
    }   
}