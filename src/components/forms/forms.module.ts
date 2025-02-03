import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsComponent } from "./forms.component";
import { CommonModule } from "@angular/common";
import { FormsRoutingModule } from "./forms-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { FormsLabelComponent } from "./components/forms-label/forms-label.component";
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from "@angular/common/http";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
@NgModule({
      declarations: [
        FormsComponent,
        LoginComponent,
        SignupComponent,
        FormsLabelComponent,
        SpinnerComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsRoutingModule,
        ToastrModule.forRoot(),
      ],
      exports: [
        LoginComponent,
        SignupComponent,
        FormsLabelComponent,
        SpinnerComponent
      ],
      providers: [
        provideHttpClient()
      ]
    })
export class FormsModule {}

