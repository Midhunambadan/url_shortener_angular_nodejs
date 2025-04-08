import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { authGuard } from './guards/auth.guard';
import { noauthGuard } from './guards/noauth.guard';
import { InvalidRouteGuard } from './guards/invalid-route.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'

    },
    {
        path:'home',
        component:HomeComponent,
        // canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[noauthGuard]
    },
    {
        path:'profile',
        component:UserProfileComponent,
        canActivate:[authGuard]
    },
    // {
    //     path: '**',
    //     canActivate: [InvalidRouteGuard],
    //     component: HomeComponent // fallback if needed, but won't be shown because guard blocks it
    //   }
      
    // {
    //     path:'**',
    //     redirectTo:'home'
    // }
];
