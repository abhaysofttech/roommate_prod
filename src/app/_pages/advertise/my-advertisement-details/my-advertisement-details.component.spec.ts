import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyAdvertisementDetailsComponent } from './my-advertisement-details.component';

describe('MyAdvertisementDetailsComponent', () => {
  let component: MyAdvertisementDetailsComponent;
  let fixture: ComponentFixture<MyAdvertisementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdvertisementDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyAdvertisementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
