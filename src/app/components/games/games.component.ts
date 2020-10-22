import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {GamesService} from 'src/app/services/games.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Game} from 'src/app/models/Game';
import {Subscription, Observable} from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ['id', 'players[0].displayName', 'vs', 'players[1].displayName', 'result'];
  dataSource = new MatTableDataSource<Game>();
  isGamesLoaded: boolean = false;
  gamesSub: Subscription;
  games: Game[];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesSub = this.gamesService.getGames()
      .subscribe((games: Game[]) => {
        if (!games.length) {
          this.isGamesLoaded = false;
          return;
        } else {
          this.dataSource.data = games;
          this.isGamesLoaded = true;
          // Override filterPredicate to be able to filter nested objects
          this.dataSource.filterPredicate = (data: any, filter) => {
            const dataStr = JSON.stringify(data).toLowerCase();
            return dataStr.indexOf(filter) !== -1;
          };
        }
      });
  }

  // override sorting data accessor to be able to sort nested objects
  sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'players[0].displayName': return item.players[0].displayName;
      case 'players[1].displayName': return item.players[1].displayName;
      default: return item[property];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.gamesSub.unsubscribe();
  }
}
