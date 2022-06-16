<script lang="ts">
	import { GameChart } from '$lib/GameChart';
	import { GameState } from '$lib/GameState';
	import { Game } from '$lib/Game';
	import { makeEquilateralTriangle, getRandomPointInsideTriangle } from '$lib/triangle';
	import type { Triangle, Point } from '$lib/types';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	const triangle: Triangle = makeEquilateralTriangle();
	const seedPoint: Point = getRandomPointInsideTriangle(triangle);

	const MAX_NUMBER_OF_POINTS_TO_ADD = 5000;
	function handleAddPoints() {
		if (numberOfPointsToAdd > MAX_NUMBER_OF_POINTS_TO_ADD) {
			alert(`Too many points! Max is ${MAX_NUMBER_OF_POINTS_TO_ADD}.`);
			numberOfPointsToAdd = MAX_NUMBER_OF_POINTS_TO_ADD;
		}

		game.addPoints(numberOfPointsToAdd);
	}

	function handleReset() {
		game.reset();
		game.start();
	}

	let canvas: HTMLCanvasElement;
	let game: Game;
	onMount(() => {
		Chart.register(...registerables);

		const chart = new Chart(canvas, {
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

		const gameChart = new GameChart(chart);
		const gameState = new GameState(triangle, seedPoint);
		game = new Game(gameChart, gameState);

		game.start();

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
			<button on:click={handleReset} class="btn btn-outline-secondary"> Reset </button>
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
