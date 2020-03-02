import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewAdvertiseComponent, RentDetailsComponent, AmenitiesDetailsComponent, AddressComponent, SearchComponent, AdvertisementComponent, AdvertisementDetailsComponent, ImageGalleryComponent, ImagePreviewComponent } from '.';
import { MyAdvertisementComponent } from './my-advertisement/my-advertisement.component';
import { MyAdvertisementDetailsComponent } from './my-advertisement-details/my-advertisement-details.component';


const routes: Routes = [
    {
        path: 'newAds',
        component: NewAdvertiseComponent
    },
    {
        path: 'newAds/:id',
        component: NewAdvertiseComponent
    },
    {
        path: 'rent-details/:id',
        component: RentDetailsComponent
    },
    {
        path: 'amenities',
        component: AmenitiesDetailsComponent
    },
    {
        path: 'address/:id',
        component: AddressComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'advertisement',
        component: AdvertisementComponent
    },
    {
        path: 'advertisementDetails/:id',
        component: AdvertisementDetailsComponent
    },
    {
        path: 'myadvertisement',
        component: MyAdvertisementComponent
    },
    {
        path: 'myadvertisementDetails/:id',
        component: MyAdvertisementDetailsComponent
    },
    {
        path: 'imageGallery',
        component: ImageGalleryComponent
    },
    {
        path: 'imagePreview',
        component: ImagePreviewComponent
    }




]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertiseRoutingModule { }