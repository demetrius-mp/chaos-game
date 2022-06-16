<script lang="ts">
	import {
		addComputedPointsToChart,
		addInitialTriangleToChart,
		addSeedPointToChart,
		clearChart
	} from '$lib/chart';
	import { makeEquilateralTriangle, getRandomPointInsideTriangle } from '$lib/triangle';
	import type { Triangle, Point, GameState } from '$lib/types';
	import { getNextPoints } from '$lib/game';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	const triangle: Triangle = makeEquilateralTriangle();
	const seedPoint: Point = getRandomPointInsideTriangle(triangle);
	const currentState: GameState = {
		triangle,
		seedPoint,
		currentPoint: seedPoint
	};

	const MAX_NUMBER_OF_POINTS_TO_ADD = 5000;
	function handleAddPoints() {
		if (numberOfPointsToAdd > MAX_NUMBER_OF_POINTS_TO_ADD) {
			alert(`Too many points! Max is ${MAX_NUMBER_OF_POINTS_TO_ADD}.`);
			numberOfPointsToAdd = MAX_NUMBER_OF_POINTS_TO_ADD;
		}

		const points = getNextPoints({
			numberOfPoints: numberOfPointsToAdd,
			state: currentState
		});
		addComputedPointsToChart(chart, points);
	}

	function handleResetChart() {
		clearChart(chart);

		const newSeedPoint = getRandomPointInsideTriangle(triangle);
		currentState.seedPoint = newSeedPoint;
		currentState.currentPoint = newSeedPoint;

		addInitialTriangleToChart(chart, currentState.triangle);
		addSeedPointToChart(chart, currentState.seedPoint);
	}

	let canvas: HTMLCanvasElement;
	let chart: Chart;
	onMount(() => {
		Chart.register(...registerables);

		chart = new Chart(canvas, {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Initial Triangle',
						data: [],
						backgroundColor: 'rgb(255, 99, 132)'
					},
					{
						label: 'Seed Point',
						data: [],
						backgroundColor: 'rgb(54, 162, 235)'
					},
					{
						label: 'Computed Points',
						data: []
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'linear',
						position: 'bottom'
					}
				},
				events: [],
				animation: false
			}
		});

		addInitialTriangleToChart(chart, currentState.triangle);
		addSeedPointToChart(chart, currentState.seedPoint);

		return () => {
			chart.destroy();
		};
	});

	let numberOfPointsToAdd = 1000;
</script>

<svelte:head>
	<title>Chaos Game</title>
</svelte:head>

<div class="container mt-3 mb-3">
	<div>
		<h1 class="lead fs-1 text-center">Chaos Game</h1>

		<div class="input-group mb-3">
			<input bind:value={numberOfPointsToAdd} type="number" class="form-control" />
			<button on:click={handleAddPoints} class="btn btn-primary">
				Add {numberOfPointsToAdd} point{numberOfPointsToAdd === 1 ? '' : 's'}
			</button>
			<button on:click={handleResetChart} class="btn btn-outline-secondary"> Reset chart </button>
		</div>
	</div>
	<canvas bind:this={canvas} width="100" height="100" />
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
