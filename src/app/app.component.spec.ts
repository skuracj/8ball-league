import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SideNavListComponent} from './components/navigation/side-nav-list/side-nav-list.component';
import {MaterialModule} from './material.module';
import {HeaderComponent} from './components/navigation/header/header.component';
import {FirebaseTestingModule} from './shared/utilities/firebase-testing.module';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FirebaseTestingModule,
				MaterialModule
			],
			declarations: [
				AppComponent,
				SideNavListComponent,
				HeaderComponent
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
