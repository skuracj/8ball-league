import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LandingPageComponent} from './landing-page.component';
import {byTestAttr} from 'src/app/shared/utilities/test-utils';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from 'src/app/services/auth.service';
import {MaterialModule} from 'src/app/material.module';
import {players} from 'src/app/mocks/players';
import {FirebaseTestingModule} from 'src/app/shared/utilities/firebase-testing.module';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [LandingPageComponent, DashboardComponent],
      imports: [RouterTestingModule, MaterialModule, FirebaseTestingModule],
    })
      .compileComponents();

    authService = TestBed.get(AuthService);
    spyOn(authService, 'googleSignIn').and.returnValue(Promise.resolve());

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.googleSignIn when logIn button clicked', () => {
    const logInButton = fixture.debugElement.query(byTestAttr('logInButton'));

    (<HTMLSpanElement>logInButton.nativeElement).click();

    expect(authService.googleSignIn).toHaveBeenCalled();
  });
});
