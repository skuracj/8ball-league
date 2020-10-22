import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPanelComponent} from './admin-panel.component';
import {MaterialModule} from 'src/app/material.module';
import {FirebaseTestingModule} from 'src/app/shared/utilities/firebase-testing.module';
import {games} from 'src/app/mocks/games';
import {MatTableDataSource} from '@angular/material';
import {GamesService} from 'src/app/services/games.service';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let gamesService: GamesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
      imports: [MaterialModule, FirebaseTestingModule]
    })
      .compileComponents();

    gamesService = TestBed.get(GamesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    component.dataSource = new MatTableDataSource();
    component.dataSource.data = games;
    await component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    // console.log(component.games);
    expect(component).toBeTruthy();
  });
});
