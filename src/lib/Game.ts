import type { GameChart } from '$lib/GameChart';
import type { GameState } from '$lib/GameState';
import { getPointBetween } from '$lib/point';
import { getRandomVertexFromTriangle } from '$lib/triangle';
import type { Point } from '$lib/types';

export class Game {
	constructor(private chart: GameChart, private state: GameState) {}

	public start() {
		this.chart.addInitialTriangle(this.state.getTriangle());
		this.chart.addSeedPoint(this.state.getSeedPoint());
	}

	private getNextPoints(amount: number): Point[] {
		const triangle = this.state.getTriangle();

		return Array.from({ length: amount }, () => {
			const currentVertex = getRandomVertexFromTriangle(triangle);
			const currentPoint = this.state.getCurrentPoint();
			const midpoint = getPointBetween(currentPoint, currentVertex);

			this.state.setCurrentPoint(midpoint);

			return midpoint;
		});
	}

	public addPoints(amount: number) {
		const points = this.getNextPoints(amount);

		this.chart.addComputedPoints(points);
	}

	public reset() {
		this.chart.clear();
		this.state.setRandomSeedPoint();
	}
}
