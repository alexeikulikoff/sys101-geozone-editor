

export interface Point{
	x: number;
	y: number;
}
export interface Zone{
	name: string;
	position: Point[];
}

export interface MyLayer{
	name: string;
	zones: Zone[];
}
