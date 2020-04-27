import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from 'src/app/_shared/shared.module';
import { RoomMateRoutingModule } from './roommate-routing.module';
import { SearchRoommateComponent } from '.';

@NgModule({
    declarations: [
       SearchRoommateComponent,
    ],

    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RoomMateRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAWasxIddWK4mSe7YBixfrsuAiwDhxVQEs',
            libraries: ['places']
        })
    ]
})
export class RoomMateModule { }