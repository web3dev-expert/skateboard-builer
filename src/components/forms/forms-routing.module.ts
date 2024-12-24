import { RouterModule, Routes } from "@angular/router";
import { FormsComponent } from "./forms.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

export const routes: Routes = [
    {
        path: '',
        component: FormsComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }, 
          ],
    },
    {
        path: '**',
        component: SignupComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule { }