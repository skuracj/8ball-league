import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {FirebaseTestingModule} from '../shared/utilities/firebase-testing.module';

describe('AuthService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [FirebaseTestingModule]
	}));

	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
