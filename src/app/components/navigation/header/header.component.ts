import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	playerId: string;
	playerSub: Subscription;

	@Output() public sidenavToggle = new EventEmitter();

	constructor(public authService: AuthService) {}

	async ngOnInit(): Promise<void> {
		this.playerSub = await this.authService.player$.subscribe(player => {
			if (!player) {
				return;
			} else {
				this.playerId = player.id;
			}
		});
	}

	public onToggleSidenav = () => {
		this.sidenavToggle.emit();
	}

	ngOnDestroy(): void {
		this.playerSub.unsubscribe();
	}
}
