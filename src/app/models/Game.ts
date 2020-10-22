import {Player} from './Player';

export interface Game {
	id?: string;
	players: Player[];
	winner: Player[] | string | string[];
}
