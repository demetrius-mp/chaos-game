export interface Point {
	x: number;
	y: number;
}

export interface Triangle {
	a: Point;
	b: Point;
	c: Point;
}

export interface ChaosGameState {
	triangle: Triangle;
	seedPoint: Point;
	currentPoint: Point;
}
