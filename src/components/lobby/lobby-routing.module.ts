import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LobbyComponent } from "./lobby.component";
import { ProfileComponent } from "../profile/profile.component";
import { AuthGuard } from "../../core/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: LobbyComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate:[AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LobbyRoutingModule { }