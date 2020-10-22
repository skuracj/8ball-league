import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument
} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Player} from '../models/Player';


@Injectable({providedIn: 'root'})
export class AuthService {
	player$: Observable<any>;

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router
	) {
		this.player$ = this.afAuth.authState.pipe(
			switchMap(player => {
				if (player) {
					return this.afs.doc<Player>(`players/${player.uid}`).valueChanges();
				} else {
					this.router.navigate(['/']);
					return of(null);
				}
			})
		);

	}


	async googleSignIn(): Promise<void> {

		const provider = new auth.GoogleAuthProvider();
		provider.setCustomParameters({
			hd: 'mobiquityinc.com'
		});
		const credential = await this.afAuth.auth.signInWithPopup(provider);
		this.router.navigate([`/profile/${credential.user.uid}`]);

		return this.updateUserData(credential.user);
	}

	async signOut(): Promise<boolean> {
		await this.afAuth.auth.signOut();
		return this.router.navigate(['/']);
	}

	private updateUserData(player): Promise<void> {
		const playerRef: AngularFirestoreDocument = this.afs.doc<Player>(`players/${player.uid}`);
		const name = player.displayName.split(' ');
		const data = {
			id: player.uid,
			displayName: name[0],
			photoURL: player.photoURL
		};

		return playerRef.set(data, {merge: true});
	}
}
