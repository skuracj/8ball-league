import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {GamesComponent} from './components/games/games.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'ranking', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'games', component: GamesComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
