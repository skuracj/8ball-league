import {Component} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

	constructor(private authService: AuthService) {}

	logIn(): void {
		this.authService.googleSignIn();
	}
}
