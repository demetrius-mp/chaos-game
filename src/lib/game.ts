import { getPointBetween } from '$lib/point';
import { getRandomVertexFromTriangle } from '$lib/triangle';
import type { GameState, Point } from '$lib/types';

export function getNextPoints(options: { state: GameState; numberOfPoints: number }): Point[] {
	const { state, numberOfPoints } = options;

	return Array.from({ length: numberOfPoints }, () => {
		const currentVertex = getRandomVertexFromTriangle(state.triangle);
		const midpoint = getPointBetween(state.currentPoint, currentVertex);

		state.currentPoint = midpoint;

		return midpoint;
	});
}
