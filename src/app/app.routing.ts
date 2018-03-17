import { ChessBoardComponent } from './core/chessBoard.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "dashboard",
        component: DashBoardComponent
    },
    {
        path: "chessboard",
        component: ChessBoardComponent
    },
    { 
        path: "", 
        redirectTo: "/dashboard", 
        pathMatch: "full" 
    },
]
export const routing = RouterModule.forRoot(routes);