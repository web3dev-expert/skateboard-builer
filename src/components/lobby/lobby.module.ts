import { NgModule } from "@angular/core";
import { LobbyComponent } from "./lobby.component";
import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
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
import { MatDialogModule } from "@angular/material/dialog"
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/modules/shared.module";
import { ProfileComponent } from "../profile/profile.component";

@NgModule({
      declarations: [
        LobbyComponent,
        GiochiComponent,
        ClassificheComponent,
        TrofeiComponent,
        StatisticheComponent,
        AssistenzaComponent,
        AboutUsComponent,
        PunteggiComponent,
        ProfileComponent
      ],
      imports: [
        LobbyRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatIconModule,
        RouterModule,
        SharedModule
            ],
      exports: [
        GiochiComponent,
        ClassificheComponent,
        TrofeiComponent,
        StatisticheComponent,
        AssistenzaComponent,
        AboutUsComponent,
        PunteggiComponent,
        ProfileComponent
              ],
      providers: [
        provideHttpClient(),
      ]
    })
export class LobbyModule {}

