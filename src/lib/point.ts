import type { Point } from '$lib/types';

export function getPointBetween(p1: Point, p2: Point): Point {
	const x = (p1.x + p2.x) / 2;
	const y = (p1.y + p2.y) / 2;

	return {
		x,
		y
	};
}
