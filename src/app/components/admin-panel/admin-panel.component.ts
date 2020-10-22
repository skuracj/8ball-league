import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {GamesService} from 'src/app/services/games.service';
import {Game} from 'src/app/models/Game';
import {Subscription} from 'rxjs';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {Player} from 'src/app/models/Player';
import {PlayerService} from 'src/app/services/player.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  columnsToDisplay = ['id', 'players[0].displayName', 'players[1].displayName', 'draw', 'result'];
  dataSource = new MatTableDataSource<Game>();
  gamesSub: Subscription;
  games: Game[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private gamesService: GamesService,
    private playersService: PlayerService) {}

  ngOnInit(): void {
    this.gamesSub = this.gamesService.getGames()
      .subscribe((games: Game[]) => {
        this.dataSource.data = games;
        // Override filterPredicate to be able to filter nested objects
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addResult(gameId: string, winner: Player[], loser?: Player): void {
    if (!gameId || !winner) {
      return;
    }

    this.gamesService.saveGameResult(gameId, winner);

    if (winner.length > 1) {
      this.playersService.addDraw(winner);
    } else {
      this.playersService.addLooser(loser);
      this.playersService.addWinner(winner);
    }
  }

  saveGamesToDatabase(): void {
    this.gamesService.saveGamesToDataBase();
  }

  drawGames(): void {
    this.gamesService.drawGames();
  }

  getDisplayName(item, index): any {
    return item.players[index].displayName;
  }

  ngOnDestroy(): void {
    this.gamesSub.unsubscribe();
  }
}
