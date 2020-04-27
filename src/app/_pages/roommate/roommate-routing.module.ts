import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchRoommateComponent } from '.';


const routes: Routes = [
    {
        path: 'search-roommate',
        component: SearchRoommateComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomMateRoutingModule { }