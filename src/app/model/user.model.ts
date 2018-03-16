import { Injectable } from '@angular/core';

@Injectable()
export class User {
    username:string;
    token: string;
    //user info
    displayName:string;
    winMatch:number;
    totalMatch: number;

}