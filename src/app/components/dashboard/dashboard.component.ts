import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {PlayerService} from 'src/app/services/player.service';
import {Player} from 'src/app/models/Player';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['rank', 'player', 'wins', 'loses', 'ties', 'points'];
  dataSource = new MatTableDataSource<Player>();
  playersSub: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playersSub = this.playerService.getPlayers()
      .subscribe((players: Player[]) => {
        this.dataSource.data = players.filter(player => {
          return player.isActive === true;
        }
        );
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.playersSub.unsubscribe();
  }

}
