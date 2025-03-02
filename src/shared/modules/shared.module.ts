import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
      declarations: [
        SpinnerComponent
      ],
      imports: [
        CommonModule,
        ToastrModule.forRoot(),
      ],
      exports: [
        SpinnerComponent
      ],
      providers: [
        provideHttpClient()
      ]
    })
export class SharedModule {}

