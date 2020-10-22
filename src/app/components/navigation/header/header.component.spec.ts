import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MaterialModule} from 'src/app/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FirebaseTestingModule} from 'src/app/shared/utilities/firebase-testing.module';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [MaterialModule, RouterTestingModule, FirebaseTestingModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
