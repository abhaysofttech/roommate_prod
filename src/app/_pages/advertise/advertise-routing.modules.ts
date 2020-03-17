import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewAdvertiseComponent, RentDetailsComponent, AmenitiesDetailsComponent, AddressComponent, SearchComponent, AdvertisementComponent, AdvertisementDetailsComponent, ImageGalleryComponent, ImagePreviewComponent, MyAdvertisementComponent, MyAdvertisementDetailsComponent } from '.';
import { CloseAdvertisementComponent } from './close-advertisement/close-advertisement.component';

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
        path: 'amenities/:id',
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
        path: 'imageGallery/:id',
        component: ImageGalleryComponent
    },
    {
        path: 'imagePreview',
        component: ImagePreviewComponent
    },
    {
        path: 'closeAds/:id',
        component: CloseAdvertisementComponent
    }




]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertiseRoutingModule { }