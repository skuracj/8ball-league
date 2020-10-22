import {TestBed} from '@angular/core/testing';

import {GamesService} from './games.service';
import {FirebaseTestingModule} from '../shared/utilities/firebase-testing.module';

describe('GamesService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [FirebaseTestingModule]
	}));

	it('should be created', () => {
		const service: GamesService = TestBed.get(GamesService);
		expect(service).toBeTruthy();
	});
});
