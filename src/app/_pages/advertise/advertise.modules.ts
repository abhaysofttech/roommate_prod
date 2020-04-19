import { AdvertiseRoutingModule } from './advertise-routing.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewAdvertiseComponent, RentDetailsComponent, AmenitiesDetailsComponent, AddressComponent, SearchComponent, AdvertisementComponent, AdvertisementDetailsComponent, MyAdvertisementComponent, MyAdvertisementDetailsComponent, ImageGalleryComponent, ImagePreviewComponent, CloseAdvertisementComponent, ImageUploadComponent } from '.';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
    declarations: [
        NewAdvertiseComponent,
        RentDetailsComponent,
        AmenitiesDetailsComponent,
        AddressComponent,
        SearchComponent,
        AdvertisementComponent,
        AdvertisementDetailsComponent,
        MyAdvertisementComponent,
        MyAdvertisementDetailsComponent,
        ImageUploadComponent,
        ImageGalleryComponent,
        ImagePreviewComponent,
        CloseAdvertisementComponent

    ],

    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        AdvertiseRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAWasxIddWK4mSe7YBixfrsuAiwDhxVQEs',
            libraries: ['places']
        })
    ]
})
export class AdvertiseModule { }