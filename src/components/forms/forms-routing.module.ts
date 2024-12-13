import { RouterModule, Routes } from "@angular/router";
import { FormsComponent } from "./forms.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        component: FormsComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule { }