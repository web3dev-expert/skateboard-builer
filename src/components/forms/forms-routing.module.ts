import { RouterModule, Routes } from "@angular/router";
import { FormsComponent } from "./forms.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

export const routes: Routes = [
    {
        path: '',
        component: FormsComponent,
        pathMatch: 'full'
    },
    {
        path: 'forms/login',
        component: LoginComponent
    },
    {
        path: 'forms/signup',
        component: SignupComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule { }