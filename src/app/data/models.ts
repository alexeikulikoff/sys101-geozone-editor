

export interface Point{
	x: number;
	y: number;
}
export interface Zone{
	name: string;
	position: Point[];
}

export interface Layer{
	name: string;
	zones: Zone[];
}
