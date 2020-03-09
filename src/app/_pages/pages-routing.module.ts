import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    { path: 'advertise', loadChildren: () => import('./advertise/advertise.modules').then(m => m.AdvertiseModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.modules').then(m => m.ProfileModule) }

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }