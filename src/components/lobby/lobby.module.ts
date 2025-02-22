import { NgModule } from "@angular/core";
import { LobbyComponent } from "./lobby.component";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { GiochiComponent } from "../giochi/giochi.component";
import { ClassificheComponent } from "../classifiche/classifiche.component";
import { TrofeiComponent } from "../trofei/trofei.component";
import { StatisticheComponent } from "../statistiche/statistiche.component";
import { AssistenzaComponent } from "../assistenza/assistenza.component";
import { AboutUsComponent } from "../about-us/about-us.component";
import { PunteggiComponent } from "../punteggi/punteggi.component";
import { LobbyRoutingModule } from "./lobby-routing.module";
import { ErrorInterceptor } from "../../core/error.interceptor";
import { AuthInterceptor } from "../../core/auth.interceptor";

@NgModule({
      declarations: [
        LobbyComponent,
        GiochiComponent,
        ClassificheComponent,
        TrofeiComponent,
        StatisticheComponent,
        AssistenzaComponent,
        AboutUsComponent,
        PunteggiComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        LobbyRoutingModule
            ],
      exports: [
        GiochiComponent,
        ClassificheComponent,
        TrofeiComponent,
        StatisticheComponent,
        AssistenzaComponent,
        AboutUsComponent,
        PunteggiComponent
              ],
      providers: [
        provideHttpClient(),
      ]
    })
export class LobbyModule {}

