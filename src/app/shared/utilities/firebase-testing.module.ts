import {NgModule} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {players} from 'src/app/mocks/players';
import {games} from 'src/app/mocks/games';

import {of, BehaviorSubject, from} from 'rxjs';
import {getSnapShotChanges} from './test-utils';





const gamesMock = from(games);
const playersMock = from(players);


const gamesCollectionStub = {
	valueChanges: jasmine.createSpy('valueChanges').and.returnValue(gamesMock)
};

const AngularFirestoreMocks = {
	auth: of({uid: players[0].id}),
	collection: jasmine.createSpy('collection').and.returnValue({
		games: games,
		players: players,
		snapshotChanges: function (): any {return getSnapShotChanges([...games], true); }
	}),
	doc: () => {

			// snapshotChanges: function (): any {return getSnapShotChanges([...players], true, true); }
			return {snapshotChanges: () => of()};
	},

};

const userMock = {
	uid: players[0].id,
};

const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this guy

const fakeSignInHandler = (provider): Promise<any> => {
	fakeAuthState.next(userMock);
	return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
	fakeAuthState.next(null);
	return Promise.resolve();
};

const angularFireAuthStub = {
	authState: fakeAuthState,
	auth: {
		signInWithPopup: jasmine.createSpy('signInWithPopup').and.callFake(fakeSignInHandler),
		signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
	}
};

@NgModule({
	declarations: [],
	exports: [
		RouterTestingModule,
		BrowserAnimationsModule
	],
	imports: [
		RouterTestingModule,
		BrowserAnimationsModule
	],
	providers: [AuthService,
		{provide: AngularFirestore, useValue: AngularFirestoreMocks},
		{provide: AngularFireAuth, useValue: angularFireAuthStub}
	]
})
export class FirebaseTestingModule {
}
