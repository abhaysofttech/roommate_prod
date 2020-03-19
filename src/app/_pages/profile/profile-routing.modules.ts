import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailsComponent } from '.';
import { NotificationComponent } from './notification/notification.component';
const routes: Routes = [
    {
        path: '',
        component: ProfileDetailsComponent
    },
    {
        path:'notification',
        component:NotificationComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }