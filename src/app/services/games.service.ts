import {Injectable} from '@angular/core';
import {PlayerService} from './player.service';
import {Subscription, Observable} from 'rxjs';
import {Player} from '../models/Player';
import {Game} from '../models/Game';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';

import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gamesCollection: AngularFirestoreCollection<Game>;
  gameDoc: AngularFirestoreDocument<Game>;
  games$: Observable<Game[]>;

  playersSub: Subscription;
  players: Player[];
  games: Game[] = [];

  constructor(
    private playersService: PlayerService,
    private afs: AngularFirestore
  ) {
    this.playersSub = this.playersService.getPlayers()
      .subscribe((players: Player[]) => {
        this.players = players;
      });
    this.gamesCollection = this.afs.collection('games');
  }

  getGames(): Observable<Game[]> {
    this.games$ = this.gamesCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as Game;
            data.id = action.payload.doc.id;

            return data;
          });
        })
      );
    return this.games$;
  }

  drawGames(): void {
    if (!this.players) {
      return;
    }
    this.players.forEach((outerItem: Player) => {
      this.players.forEach((innerItem: Player) => {
        if (innerItem.id !== outerItem.id && (innerItem.isActive && outerItem.isActive)) {
          this.games.push({
            players: [{
              id: outerItem.id,
              displayName: outerItem.displayName,
              photoURL: outerItem.photoURL
            }, {
              id: innerItem.id,
              displayName: innerItem.displayName,
              photoURL: innerItem.photoURL
            }], winner: [], id: '0'
          });
        }
      });
    });
    // console.log(this.games);
    console.log('Draw is done');
  }

  saveGameResult(gameId: string, winner: Player[], loser?: Player): void {
    // Update game document
    this.afs.collection('games')
      .doc(gameId)
      .set(
        {winner: winner},
        {merge: true});
  }

  saveGamesToDataBase(): void {
    this.games.forEach((game: Game) => {
      this.afs.collection('games').add({
        players: game.players,
        winner: []
      })
        .then(docRef => {
          console.log('Game saved to database');
          const id = {
            id: docRef.id
          };
          this.afs.collection('games')
            .doc(docRef.id)
            .set(id, {merge: true});
          console.log('Game ID assigned');
        });
    });
  }

}
