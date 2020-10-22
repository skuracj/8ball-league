export interface Player {
	id: string;
	displayName: string;
	photoURL?: string;
	nickName?: string;
	customPhotoURL?: string;
	loses?: number;
	points?: number;
	rank?: number;
	ties?: number;
	wins?: number;
	isActive?: boolean;
}
