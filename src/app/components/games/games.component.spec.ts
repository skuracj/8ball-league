import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GamesComponent} from './games.component';
import {MaterialModule} from 'src/app/material.module';
import {FirebaseTestingModule} from 'src/app/shared/utilities/firebase-testing.module';
import {games} from 'src/app/mocks/games';

describe('GamesComponent', () => {
	let component: GamesComponent;
	let fixture: ComponentFixture<GamesComponent>;

	beforeEach((() => {
		TestBed.configureTestingModule({
			declarations: [GamesComponent],
			imports: [MaterialModule, FirebaseTestingModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GamesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', async () => {
    component.games = games;
    await component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

		expect(component).toBeTruthy();
	});
});
