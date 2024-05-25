// asyncFor(i * j, len * len2, (newX) => {
// 	let newI = newX % len;
// 	let newJ = (newX - newI) / len2;

// 	let c_x = x[newI];
// 	let c_y = y[newJ];

// 	let c_val = [c_x, c_y];
// 	let z = [c_x, c_y];

// 	ctx.fillStyle = 'black';
// 	ctx.fillRect(newI, newJ, 1, 1);

// 	for (let k = 0; k < max_iter; k++) {
// 		z = pow(c_val, z);
// 		if (abs(z) > escape_radius) {
// 			ctx.fillStyle = 'white';
// 			ctx.fillRect(newI, newJ, 1, 1);
// 			break;
// 		}
// 	}
// });

// asyncFor(i, len, (newI) => {
// 	for (let j = 0; j < ny; j++) {
// 		let c_x = x[newI];
// 		let c_y = y[j];

// 		let c_val = [c_x, c_y];
// 		let z = [c_x, c_y];

// 		for (let k = 0; k < max_iter; k++) {
// 			z = pow(c_val, z);
// 			if (abs(z) > escape_radius) {
// 				ctx.fillStyle = 'white';
// 				ctx.fillRect(newI, j, 1, 1);
// 				break;
// 			}
// 		}
// 	}
// });

// while (i < len) {
// 	console.log(i);
// 	var j = 0;
// 	var len1 = ny;

// 	while (j < len1) {
// 		let c_x = x[i];
// 		let c_y = y[j];

// 		let c_val = [c_x, c_y];
// 		let z = [c_x, c_y];

// 		let k = 0;
// 		let len2 = max_iter;

// 		let kIntV = setInterval(() => {
// 			console.log(k);
// 			if (k < len2) {
// 				z = pow(c_val, z);
// 				if (abs(z) > escape_radius) {
// 					divergence_map[i][j] = true;
// 					ctx.fillStyle = 'white';
// 					ctx.fillRect(i, j, 1, 1);
// 					clearInterval(kIntV);
// 				}
// 			} else {
// 				clearInterval(kIntV);
// 			}
// 		}, 1);

// 		j++;
// 	}
// 	i++;
// }

// for (let i = 0; i < nx; i++) {
// 	console.log(i + ' / ' + nx);
// 	for (let j = 0; j < ny; j++) {
// 		let c_x = x[i];
// 		let c_y = y[j];

// 		let c_val = [c_x, c_y];
// 		let z = [c_x, c_y];

// 		for (let k = 0; k < max_iter; k++) {
// 			z = pow(c_val, z);
// 			if (abs(z) > escape_radius) {
// 				ctx.fillStyle = 'white';
// 				ctx.fillRect(i, j, 1, 1);
// 				break;
// 			}
// 		}
// 	}
// }

// console.log('done');
// return divergence_map;
