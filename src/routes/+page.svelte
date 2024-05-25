<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';

	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';

	import { toggleMode, mode } from 'mode-watcher';
	// @ts-ignore
	import { pow, abs, sub } from 'fast-complex';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	function getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function asyncFor(i: number, len: number, callback: (i: number) => void): number {
		let intV = window.setInterval(() => {
			if (i < len) {
				callback(i);
				i++;
			} else {
				clearInterval(intV);
			}
		}, 0);
		return intV;
	}

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

	let divergence_map: Array<number | Array<number>>;

	let n: number = 854;
	$: nx = n;
	$: ny = parseInt((nx * (ratio_y / ratio_x)).toString());

	let fastRender: boolean = true;

	$: description = '(x, y, eps) = (' + x0 + ', ' + y0 + ', ' + eps + ')';

	function compute_tetration_divergence(
		nx: number,
		ny: number,
		max_iter: number,
		threshold: number,
		escape_radius: number
	): Array<number | Array<number>> {
		let a1 = x0 - eps;
		let d = (2 * eps) / nx;
		let b1 = y0 - eps_y;
		let e = (2 * eps_y) / ny;

		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

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
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		if (window.innerWidth < 768) {
			n = window.innerWidth - 16;
			nx = n;
			ny = parseInt((nx * (ratio_y / ratio_x)).toString());
		}

		ResetCanvas();
		divergence_map = compute_tetration_divergence(nx, ny, max_iter, threshold, escape_radius);
	});

	function ResetCanvas() {
		canvas.width = nx;
		canvas.height = ny;

		if (get(mode) == 'dark') {
			ctx.fillStyle = '#505050';
		} else {
			ctx.fillStyle = '#808080';
		}
		ctx.fillRect(0, 0, nx, ny);
	}

	function CancelRender() {
		let xAsync: number = divergence_map[0] as number;
		let yAsyncs: Array<number> = divergence_map[1] as Array<number>;
		clearInterval(xAsync);
		yAsyncs.forEach((yAsync) => {
			clearInterval(yAsync);
		});
	}
</script>

<div class="flex p-2 gap-3 flex-col md:flex-row">
	<div class="flex flex-col items-end">
		<canvas class="rounded-md" id="canvas"> </canvas>
		<div class="font-semibold text-sm md:text-md">
			{description}
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
					let link = document.createElement('a');
					link.download = 'ourtetration.png';
					link.href = canvas.toDataURL();
					link.click();
				}}>Save</Button
			>

			<Button
				class="w-fit"
				on:click={() => {
					function fallbackCopyTextToClipboard(text) {
						var textArea = document.createElement('textarea');
						textArea.value = text;

						// Avoid scrolling to bottom
						textArea.style.top = '0';
						textArea.style.left = '0';
						textArea.style.position = 'fixed';

						document.body.appendChild(textArea);
						textArea.focus();
						textArea.select();

						try {
							var successful = document.execCommand('copy');
							var msg = successful ? 'successful' : 'unsuccessful';
							console.log('Fallback: Copying text command was ' + msg);
						} catch (err) {
							console.error('Fallback: Oops, unable to copy', err);
						}

						document.body.removeChild(textArea);
					}
					function copyTextToClipboard(text) {
						if (!navigator.clipboard) {
							fallbackCopyTextToClipboard(text);
							return;
						}
						navigator.clipboard.writeText(text).then(
							function () {
								console.log('Async: Copying to clipboard was successful!');
							},
							function (err) {
								console.error('Async: Could not copy text: ', err);
							}
						);
					}
					copyTextToClipboard(`#mytetration
					${description}`);
				}}>Copy</Button
			>
		</div>
	</div>
</div>
