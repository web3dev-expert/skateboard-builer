import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsComponent } from "./forms.component";
import { CommonModule } from "@angular/common";
import { FormsRoutingModule } from "./forms-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

@NgModule({
      declarations: [
        FormsComponent,
        LoginComponent,
        SignupComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsRoutingModule
      ],
      exports: [
        LoginComponent,
        SignupComponent
      ]
    })
export class FormsModule {}