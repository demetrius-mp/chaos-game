import type { Point, Triangle } from '$lib/types';
import { sample } from 'lodash-es';

export function makeEquilateralTriangle(): Triangle {
	return [
		{
			x: 0,
			y: 0
		},
		{
			x: 5,
			y: 10
		},
		{
			x: 10,
			y: 0
		}
	];
}

export function getRandomPointInsideTriangle(triangle: Triangle): Point {
	const [a, b, c] = triangle;
	const rand1 = Math.random();
	const rand2 = Math.random();
	const [random_x, random_y] = [rand1, rand2].sort((a, b) => a - b);

	const s = random_x;
	const t = random_y - random_x;
	const u = 1 - random_y;

	const x = s * a.x + t * b.x + u * c.x;
	const y = s * a.y + t * b.y + u * c.y;

	return {
		x,
		y
	};
}

export function getRandomVertexFromTriangle(triangle: Triangle): Point {
	const [a, b, c] = triangle;
	const randomVertex = sample([a, b, c]) as Point;

	return randomVertex;
}
