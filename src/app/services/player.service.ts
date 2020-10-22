import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from 'angularfire2/firestore';
import {Player} from '../models/Player';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playersCollection: AngularFirestoreCollection<Player>;
  playerDoc: AngularFirestoreDocument<Player>;
  players$: Observable<Player[]>;
  player$: Observable<Player>;

  constructor(private afs: AngularFirestore) {
    this.playersCollection = this.afs.collection('players');
    this.playersCollection = this.afs.collection('players', ref => ref.orderBy('points', 'desc'));

    // add sorting
  }

  getPlayers(): Observable<Player[]> {
    this.players$ = this.playersCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {

            const data = action.payload.doc.data() as Player;
            data.id = action.payload.doc.id;

            return data;
          });
        }));
    return this.players$;
  }

  getPlayer(id: string): Observable<Player> {
    this.playerDoc = this.afs.doc<Player>(`players/${id}`);
    this.player$ = this.playerDoc.snapshotChanges().pipe(map(action => {
      if (action.payload && action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Player;
        // data.lastUpdate = action.payload['_document'].proto.updateTime ? action.payload['_document'].proto.updateTime : Date.now();
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.player$;
  }

  signPlayerForGame(profileId: string): void {
    const data = {
      ties: 0,
      wins: 0,
      loses: 0,
      points: 0,
      isActive: true,
      rank: null
    };
    this.afs.doc(`players/${profileId}`)
      .set(data, {merge: true});

  }

  addWinner(winner: Player[]): void {
    this.afs.doc(`players/${winner[0].id}`)
      .update({
        wins: firebase.firestore.FieldValue.increment(1),
        points: firebase.firestore.FieldValue.increment(2)
      });
  }

  addLooser(loser: Player): void {
    this.afs.doc(`players/${loser.id}`)
      .update({
        loses: firebase.firestore.FieldValue.increment(1)
      });
  }

  addDraw(players: Player[]): void {
    players.forEach(player => {
      this.afs.doc(`players/${player.id}`)
        .update({
          ties: firebase.firestore.FieldValue.increment(1),
          points: firebase.firestore.FieldValue.increment(1)
        });
    });
  }
}
