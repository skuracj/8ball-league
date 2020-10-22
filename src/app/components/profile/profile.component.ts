import {Component, OnInit, OnDestroy} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';
import {Player} from 'src/app/models/Player';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GamesService} from 'src/app/services/games.service';
import {Game} from 'src/app/models/Game';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileId: string;
  playerGames: Game[];
  playerProfile: Player;
  playerSub: Subscription;
  gamesSub: Subscription;

  constructor(private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.profileId = this.activatedRoute.snapshot.params['id'];
    this.playerSub = this.playerService.getPlayer(this.profileId)
      .subscribe(profile => {
        this.playerProfile = profile;
      });
    this.gamesSub = this.gamesService.getGames()
      .subscribe(games => {
        this.playerGames = games.filter(game => game.players.some(player => player.id === this.profileId));
      }
      );
  }

  joinGame(): void {
    this.playerService.signPlayerForGame(this.profileId);
  }

  filterPlayedGames(): Game[] {
    if (!this.playerGames) {
      return;
    }
    return this.playerGames.filter(x => x.winner.length !== 0);
  }

  filterGamesToPlay(): Game[] {
    if (this.playerGames) {
      return this.playerGames.filter(x => x.winner.length === 0);
    }
  }

  ngOnDestroy(): void {
    this.playerSub.unsubscribe();
    this.gamesSub.unsubscribe();
  }

}
