<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { pow, abs, sub } from 'fast-complex';

	import { writable, get } from 'svelte/store';

	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Accordion from '$lib/components/ui/accordion';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode, mode } from 'mode-watcher';

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive).
	 * The value is no lower than min (or the next integer greater than min
	 * if min isn't an integer) and no greater than max (or the next integer
	 * lower than max if max isn't an integer).
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// import * as workerpool from 'workerpool';

	// const pool = workerpool.pool();

	// const newPow = (a: Array<number>, b: Array<number>) => {
	// 	const { sqrt: msqrt, exp: mexp, log: mlog, cos: mcos, sin: msin, atan2: matan2 } = Math;
	// 	const NAN = Object.freeze([NaN, NaN]);
	// 	const isNumber = (x) => typeof x === 'number';
	// 	const isComplex = (x) =>
	// 		(x instanceof Array && isNumber(x[0]) && isNumber(x[1])) ||
	// 		x instanceof Float32Array ||
	// 		x instanceof Float64Array;
	// 	const unsafeExp = (c) => [mexp(c[0]) * mcos(c[1]), mexp(c[0]) * msin(c[1])];
	// 	const unsafeMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
	// 	const unsafeLn = (c) => [mlog(unsafeAbs(c)), unsafeArg(c)];
	// 	const unsafeL2 = (c) => c[0] * c[0] + c[1] * c[1];
	// 	const unsafeAbs = (c) => msqrt(unsafeL2(c));
	// 	const unsafeArg = (c) => matan2(c[1], c[0]);
	// 	return (
	// 		(isComplex(a) && isComplex(b) && unsafeExp(unsafeMul(unsafeLn(a), b))) ||
	// 		(isNumber(a) && pow([a, 0], b)) ||
	// 		(isNumber(b) && pow(a, [b, 0])) ||
	// 		NAN
	// 	);
	// };

	// import { Complex } from 'complex.js';
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let ratio_x: number = 16;
	let ratio_y: number = 9;

	let under_digit: number = 5;
	let d: number = 10 ** under_digit;

	let x0: number = Math.floor(Math.random() * getRandomInt(-1, 1) * d) / d;
	let y0: number = Math.floor(Math.random() * getRandomInt(-1, 1) * d) / d;

	let eps: number = Math.floor(Math.random() * d) / d;
	$: eps_y = eps * (ratio_y / ratio_x);

	let max_iter: number = 500;
	let escape_radius: number = 1e10;
	let threshold: number = 1e-10;

	let divergence_map: Array<number>;

	let n: number = 854;
	$: nx = n;
	$: ny = parseInt((nx * (ratio_y / ratio_x)).toString());

	let fastRender: Boolean = true;

	function compute_tetration_divergence(
		nx: number,
		ny: number,
		max_iter: number,
		threshold: number,
		escape_radius: number
	) {
		let a1 = x0 - eps;
		let d = (2 * eps) / nx;
		let b1 = y0 - eps_y;
		let e = (2 * eps_y) / ny;

		// let x = Array.from({ length: nx }, (_, i) => a1 + i * d);
		// let y = Array.from({ length: ny }, (_, i) => b1 + i * e);

		// tSum += performance.now() - tStart;
		// tTry++;
		// viewer = tSum / tTry;

		//  eps: 0.005 viewer: 16720.433333333334 tTime: 60 tCount:
		function asyncFor(i: number, len: number, callback: (i: number) => void) {
			let intV = setInterval(() => {
				if (i < len) {
					callback(i);
					i++;
				} else {
					clearInterval(intV);
				}
			}, 0);
			return intV;
		}

		// eps: 0.005 viewer: 16024.966666666667 tTime: 60 tCount:
		function newAsyncFor(i: number, len: number, callback: (i: number) => void) {
			setTimeout(() => {
				if (i < len) {
					callback(i);
					newAsyncFor(i + 1, len, callback);
				}
			}, 0);
		}

		// eps: 0.005 viewer: 16609.44262295082 tTime: 61 tCount:
		function retinaAsyncFor(i: number, len: number, callback: (i: number) => void) {
			return requestAnimationFrame(() => {
				if (i < len) {
					callback(i);
					retinaAsyncFor(i + 1, len, callback);
					// tCount++;
				}
			});
		}

		// setInterval(() => {
		// 	tSum += performance.now() - tStart;
		// 	tTime++;
		// 	viewer = tCount / tTime;
		// }, 1000);

		ctx = canvas.getContext('2d');

		let xAsync: number;
		let yAsyncs: Array<number> = [];

		if (fastRender) {
			xAsync = asyncFor(0, nx * 4, (newI) => {
				let yAsync = asyncFor(0, ny * 4, (newJ) => {
					let r_x = getRandomInt(0, nx);
					let r_y = getRandomInt(0, ny);

					let c_x = a1 + r_x * d;
					let c_y = b1 + r_y * e;

					let c_val = [c_x, c_y];
					let z = [c_x, c_y];

					ctx.fillStyle = 'black';
					ctx.fillRect(r_x, r_y, 1, 1);

					for (let k = 0; k < max_iter; k++) {
						z = pow(c_val, z);
						if (abs(z) > escape_radius) {
							ctx.fillStyle = 'white';
							ctx.fillRect(r_x, r_y, 1, 1);
							break;
						}
						if (abs(sub(z, c_val)) < threshold) {
							ctx.fillStyle = 'black';
							ctx.fillRect(r_x, r_y, 1, 1);
							break;
						}
					}
				});
				yAsyncs.push(yAsync);
			});
		} else {
			xAsync = asyncFor(0, nx, (newI) => {
				let yAsync = asyncFor(0, ny, (newJ) => {
					let c_x = a1 + newI * d;
					let c_y = b1 + newJ * e;

					let c_val = [c_x, c_y];
					let z = [c_x, c_y];

					ctx.fillStyle = 'black';
					ctx.fillRect(newI, newJ, 1, 1);

					for (let k = 0; k < max_iter; k++) {
						z = pow(c_val, z);
						if (abs(z) > escape_radius) {
							ctx.fillStyle = 'white';
							ctx.fillRect(newI, newJ, 1, 1);
							break;
						}
						if (abs(sub(z, c_val)) < threshold) {
							ctx.fillStyle = 'black';
							ctx.fillRect(newI, newJ, 1, 1);
							break;
						}
					}
				});
				yAsyncs.push(yAsync);
			});
		}

		return [xAsync, yAsyncs];
	}

	onMount(() => {
		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');

		ResetCanvas();

		divergence_map = compute_tetration_divergence(nx, ny, max_iter, threshold, escape_radius);
	});
	function ApplyN() {
		canvas.width = nx;
		canvas.height = ny;
	}

	function ResetCanvas() {
		canvas.width = nx;
		canvas.height = ny;

		if (get(mode) == 'dark') {
			// dark gray
			ctx.fillStyle = '#505050';
		} else {
			// classic grey
			ctx.fillStyle = '#808080';
		}
		ctx.fillRect(0, 0, nx, ny);
	}

	function CancelRender() {
		let xAsync = divergence_map[0];
		let yAsyncs = divergence_map[1];
		clearInterval(xAsync);
		yAsyncs.forEach((yAsync) => {
			clearInterval(yAsync);
		});
	}
</script>

<div class="flex p-2 gap-3">
	<div class="flex flex-col items-end">
		<canvas class="rounded-md" id="canvas"> </canvas>
		<div>
			(x, y, eps) = ({x0}, {y0}, {eps})
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex flex-row gap-2 items-center justify-between">
			<Label class="font-semibold text-lg mt-1">Our Tetration</Label>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>

		<Separator class="my-1" />

		<div class="flex flex-row gap-2 items-center">
			<Label class="font-semibold">x0</Label>
			<Input bind:value={x0} type="number" />
			<Separator orientation="vertical"></Separator>
			<Label class="font-semibold">y0</Label>
			<Input bind:value={y0} type="number" />
		</div>
		<div class="flex flex-row gap-2 items-center">
			<Label class="font-semibold">eps</Label>
			<Input bind:value={eps} type="number" />
		</div>

		<Separator class="my-1" />
		<div class="flex flex-row gap-2 items-center">
			<Label class="font-semibold">n</Label>
			<Input bind:value={n} type="number" />
		</div>
		<div class="flex flex-row gap-2 items-center">
			<Label class="font-semibold">ratio</Label>
			<Input bind:value={ratio_x} type="number" />
			<Input bind:value={ratio_y} type="number" />
			<Button on:click={ResetCanvas} variant="destructive">Apply</Button>
		</div>
		<p class="text-xs text-muted-foreground">Changing n or ratio resets screen.</p>

		<Separator class="my-1" />
		<div class="flex flex-row gap-2">
			<Button
				class="w-full"
				on:click={() => {
					CancelRender();
					divergence_map = compute_tetration_divergence(nx, ny, max_iter, threshold, escape_radius);
				}}>Start Render</Button
			>
			<Button class="w-full" on:click={CancelRender}>Cancel Render</Button>
			<Button class="w-full" on:click={ResetCanvas} variant="destructive">Reset</Button>
		</div>

		<Separator class="my-1" />
		<div class="items-top flex space-x-2">
			<Checkbox bind:checked={fastRender} />
			<div class="grid gap-1.5 leading-none">
				<Label for="terms1" class="leading-none font-semibold">
					Use random_render (fast ∧ noisy)
				</Label>
				<p class="text-xs text-muted-foreground">It renders random coordinate.</p>
			</div>
		</div>

		<Separator class="my-1" />

		<Accordion.Root>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>
					<Label class="font-semibold">Advanced Preference</Label>
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="flex flex-col gap-2">
						<div class="flex flex-row gap-2 items-center">
							<Label class="font-semibold">max_iter</Label>
							<Input bind:value={max_iter} type="number" />
						</div>
						<div class="flex flex-row gap-2 items-center">
							<Label class="font-semibold">escape_radius</Label>
							<Input bind:value={escape_radius} type="number" />
						</div>
						<div class="flex flex-row gap-2 items-center">
							<Label class="font-semibold">threshold</Label>
							<Input bind:value={threshold} type="number" />
						</div>
						<div class="flex flex-row gap-2 items-center">
							<Label class="font-semibold">eps_y</Label>
							<Input disabled bind:value={eps_y} type="number" />
						</div>
						<div class="flex flex-row gap-2 items-center">
							<Label class="font-semibold">nx</Label>
							<Input disabled bind:value={nx} type="number" />
							<Separator orientation="vertical"></Separator>
							<Label class="font-semibold">ny</Label>
							<Input disabled bind:value={ny} type="number" />
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<div class="flex flex-row gap-2">
			<Button
				class="w-full"
				on:click={() => {
					navigator.clipboard.writeText('복사할 텍스트');
				}}>Copy</Button
			>
			<Button
				class="w-full"
				on:click={() => {
					let link = document.createElement('a');
					link.download = 'ourtetration.png';
					link.href = document.getElementById('canvas').toDataURL();
					link.click();
				}}>Save</Button
			>
		</div>
	</div>
</div> -->
