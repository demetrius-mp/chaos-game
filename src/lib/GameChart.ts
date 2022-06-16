import type { Point, Triangle } from '$lib/types';
import type { Chart } from 'chart.js';

export class GameChart {
	constructor(private chart: Chart) {}

	public addComputedPoints(points: Point[]) {
		this.chart.data.datasets.forEach((dataset) => {
			if (dataset.label === 'Computed Points') {
				dataset.data = dataset.data.concat(points);
			}
		});

		this.chart.update('none');
	}

	public addInitialTriangle(triangle: Triangle) {
		this.chart.data.datasets.forEach((dataset) => {
			if (dataset.label === 'Initial Triangle') {
				dataset.data = triangle;
			}
		});

		this.chart.update('none');
	}

	public addSeedPoint(point: Point) {
		this.chart.data.datasets.forEach((dataset) => {
			if (dataset.label === 'Seed Point') {
				dataset.data = [point];
			}
		});

		this.chart.update('none');
	}

	public clear() {
		this.chart.data.datasets.forEach((dataset) => {
			dataset.data = [];
		});

		this.chart.update('none');
	}
}
