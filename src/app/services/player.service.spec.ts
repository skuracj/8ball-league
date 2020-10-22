import {TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {FirebaseTestingModule} from '../shared/utilities/firebase-testing.module';

describe('PlayerService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [FirebaseTestingModule]
	}));

	it('should be created', () => {
		const service: PlayerService = TestBed.get(PlayerService);
		expect(service).toBeTruthy();
	});
});
