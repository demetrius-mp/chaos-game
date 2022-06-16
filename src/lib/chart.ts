import { getTrianglePointsAsArray } from '$lib/triangle';
import type { Point, Triangle } from '$lib/types';
import type { Chart } from 'chart.js';

export function addComputedPointsToChart(chart: Chart, points: Point[]) {
	chart.data.datasets.forEach((dataset) => {
		if (dataset.label === 'Computed Points') {
			dataset.data = dataset.data.concat(points);
		}
	});

	chart.update('none');
}

export function addInitialTriangleToChart(chart: Chart, triangle: Triangle) {
	chart.data.datasets.forEach((dataset) => {
		if (dataset.label === 'Initial Triangle') {
			dataset.data = getTrianglePointsAsArray(triangle);
		}
	});

	chart.update('none');
}

export function addSeedPointToChart(chart: Chart, point: Point) {
	chart.data.datasets.forEach((dataset) => {
		if (dataset.label === 'Seed Point') {
			dataset.data = [point];
		}
	});

	chart.update('none');
}

export function clearChart(chart: Chart) {
	chart.data.datasets.forEach((dataset) => {
		dataset.data = [];
	});

	chart.update('none');
}
