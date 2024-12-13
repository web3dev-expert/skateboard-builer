import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsComponent } from "./forms.component";
import { CommonModule } from "@angular/common";
import { FormsRoutingModule } from "./forms-routing.module";

@NgModule({
      declarations: [
        FormsComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsRoutingModule
      ],
      
    })
export class FormsModule {}