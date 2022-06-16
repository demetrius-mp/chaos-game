export interface Point {
	x: number;
	y: number;
}

export type Triangle = [Point, Point, Point];

export interface GameState {
	triangle: Triangle;
	seedPoint: Point;
	currentPoint: Point;
}
