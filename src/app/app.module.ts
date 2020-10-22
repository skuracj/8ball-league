import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../../src/environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {PlayerService} from './services/player.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {SideNavListComponent} from './components/navigation/side-nav-list/side-nav-list.component';
import {HeaderComponent} from './components/navigation/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthService} from './services/auth.service';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GamesComponent} from './components/games/games.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    AdminPanelComponent,
    SideNavListComponent,
    HeaderComponent,
    NotFoundComponent,
    ProfileComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [PlayerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
