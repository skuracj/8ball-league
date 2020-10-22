import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Component({
	selector: 'app-side-nav-list',
	templateUrl: './side-nav-list.component.html',
	styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
	playerId: string;
	@Output() sidenavClose = new EventEmitter();

	constructor(public authService: AuthService) {}

	async ngOnInit(): Promise<void> {
		await this.authService.player$.subscribe( player => {
			if (!player) {
				return;
			} else {
				this.playerId = player.id;
			}
		});
	}

	public onSidenavClose(): void {
		this.sidenavClose.emit();
	}

	public logOut(): void {
		this.authService.signOut();
		this.onSidenavClose();
	}

	public logIn(): void {
		this.authService.googleSignIn();
		this.onSidenavClose();

	}

}
