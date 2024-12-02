import { Routes } from '@angular/router';
import { FormsComponent } from '../components/forms/forms.component';
import { HomeComponent } from '../components/home/home.component';
import { LobbyComponent } from '../components/lobby/lobby.component';
import { GameFieldComponent } from '../components/game-field/game-field.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../core/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:FormsComponent
    },
    {
        path:'forms',
        component:FormsComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'lobby',
        component:LobbyComponent, canActivate:[AuthGuard]
    },
    {
        path:'game-field',
        component:GameFieldComponent, canActivate:[AuthGuard]
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
