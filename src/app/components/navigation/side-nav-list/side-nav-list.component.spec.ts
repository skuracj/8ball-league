import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideNavListComponent} from './side-nav-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from 'src/app/material.module';
import {FirebaseTestingModule} from 'src/app/shared/utilities/firebase-testing.module';
import {byTestAttr} from 'src/app/shared/utilities/test-utils';

describe('SideNavListComponent', () => {
  let component: SideNavListComponent;
  let fixture: ComponentFixture<SideNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavListComponent],
      imports: [RouterTestingModule, MaterialModule, FirebaseTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSidenavClose', () => {
    it('should emit sidenavClose when anchor tag in menu clicked', async () => {
      await fixture.whenRenderingDone();
      const anchor = fixture.debugElement.query(byTestAttr('menuItemRanking'));

      (<HTMLAnchorElement>anchor.nativeElement).click();

      expect(component.onSidenavClose).toHaveBeenCalled();

    });
  });
});
