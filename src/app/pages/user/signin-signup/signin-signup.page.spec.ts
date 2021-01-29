import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigninSignupPage } from './signin-signup.page';

describe('SigninSignupPage', () => {
  let component: SigninSignupPage;
  let fixture: ComponentFixture<SigninSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
