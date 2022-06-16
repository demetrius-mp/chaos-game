import { getRandomPointInsideTriangle } from '$lib/triangle';
import type { Triangle, Point } from '$lib/types';

export class GameState {
	private currentPoint: Point;
	constructor(private triangle: Triangle, private seedPoint: Point) {
		this.currentPoint = seedPoint;
	}

	public getTriangle(): Triangle {
		return this.triangle;
	}

	public getSeedPoint(): Point {
		return this.seedPoint;
	}

	public getCurrentPoint(): Point {
		return this.currentPoint;
	}

	public setCurrentPoint(point: Point) {
		this.currentPoint = point;
	}

	public setSeedPoint(point: Point) {
		this.seedPoint = point;
	}

	public setRandomSeedPoint(): Point {
		const randomSeedPoint = getRandomPointInsideTriangle(this.triangle);
		this.seedPoint = randomSeedPoint;
		this.currentPoint = randomSeedPoint;

		return randomSeedPoint;
	}

	public reset(triangle: Triangle, seedPoint: Point) {
		this.triangle = triangle;
		this.seedPoint = seedPoint;
		this.currentPoint = seedPoint;
	}
}
