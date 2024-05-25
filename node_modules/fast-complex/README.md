# fast-complex

Faster complex numbers in JavaScript

[![NPM](https://nodei.co/npm/fast-complex.png)](https://nodei.co/npm/fast-complex/)

[![](https://data.jsdelivr.com/v1/package/npm/fast-complex/badge)](https://www.jsdelivr.com/package/npm/fast-complex)
[![HitCount](http://hits.dwyl.io/lxsmnsyc/fast-complex.svg)](http://hits.dwyl.io/lxsmnsyc/fast-complex)

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/fast-complex.svg?branch=master)](https://travis-ci.org/LXSMNSYC/fast-complex) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/mkjwe462uk80axx4?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/fast-complex) |


[![codecov](https://codecov.io/gh/LXSMNSYC/fast-complex/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/fast-complex)
[![Known Vulnerabilities](https://snyk.io/test/github/LXSMNSYC/fast-complex/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LXSMNSYC/fast-complex?targetFile=package.json)

## Why

Most complex number libraries avaiable in JavaScript are pretty slow, uses classes, and sometimes immutable. `fast-complex` aims to be fast (as all complex libraries should be).

## Install

NPM

```bash
npm i fast-complex
```

CDN

* jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/rx-cancellable/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/rx-scheduler/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fast-complex/dist/index.min.js"></script>
```

* unpkg
```html
<script src="https://unpkg.com/rx-cancellable/dist/index.min.js"></script>
<script src="https://unpkg.com/rx-scheduler/dist/index.min.js"></script>
<script src="https://unpkg.com/fast-complex/dist/index.min.js"></script>
```

## Usage

### Loading the module

#### CommonJS

```js
const Complex = require('fast-complex');
```

Loading the CommonJS module provides the Complex object.

#### Browser

Loading the JavaScript file for the fast-complex provides the Complex object

## Documentation

You can read the documentation at the [official doc site](https://lxsmnsyc.github.io/fast-complex/)

## Build

Clone the repo first, then run the following to install the dependencies

```bash
npm install
```

To build the coverages, run the test suite, the docs, and the distributable modules:

```bash
npm run build
```

## Benchmarks

Benchmark against [complex.js](https://www.npmjs.com/package/complex.js)

```
abs:
complex.js#abs x 10,039,416 ops/sec ±1.67% (90 runs sampled)
fast-complex#abs x 253,710,638 ops/sec ±0.36% (93 runs sampled)
Fastest is fast-complex#abs

acos:
complex.js#acos x 2,964,673 ops/sec ±1.64% (95 runs sampled)
fast-complex#acos x 48,972,731 ops/sec ±0.81% (91 runs sampled)
Fastest is fast-complex#acos

acosh:
complex.js#acosh x 3,616,264 ops/sec ±0.72% (94 runs sampled)
fast-complex#acosh x 900,426,250 ops/sec ±0.12% (91 runs sampled)
Fastest is fast-complex#acosh

add:
complex.js#add x 4,144,553 ops/sec ±3.72% (86 runs sampled)
fast-complex#add x 34,798,287 ops/sec ±0.99% (92 runs sampled)
Fastest is fast-complex#add

arg:
complex.js#arg x 10,245,874 ops/sec ±1.10% (95 runs sampled)
fast-complex#arg x 249,870,711 ops/sec ±0.55% (92 runs sampled)
Fastest is fast-complex#arg

asin:
complex.js#asin x 2,879,374 ops/sec ±2.12% (93 runs sampled)
fast-complex#asin x 10,156,487 ops/sec ±1.72% (71 runs sampled)
Fastest is fast-complex#asin

asinh:
complex.js#asinh x 3,549,738 ops/sec ±0.60% (95 runs sampled)
fast-complex#asinh x 859,111,642 ops/sec ±0.10% (96 runs sampled)
Fastest is fast-complex#asinh

atan:
complex.js#atan x 4,704,238 ops/sec ±0.57% (96 runs sampled)
fast-complex#atan x 858,674,145 ops/sec ±0.11% (97 runs sampled)
Fastest is fast-complex#atan

atanh:
complex.js#atanh x 7,526,830 ops/sec ±0.39% (96 runs sampled)
fast-complex#atanh x 860,865,020 ops/sec ±0.28% (91 runs sampled)
Fastest is fast-complex#atanh

ceil:
complex.js#ceil x 8,943,458 ops/sec ±0.70% (90 runs sampled)
fast-complex#ceil x 887,247,178 ops/sec ±0.11% (94 runs sampled)
Fastest is fast-complex#ceil

conjugate:
complex.js#conjugate x 8,706,364 ops/sec ±0.56% (94 runs sampled)
fast-complex#conjugate x 890,126,063 ops/sec ±0.05% (97 runs sampled)
Fastest is fast-complex#conjugate

cos:
complex.js#cos x 6,182,278 ops/sec ±0.67% (94 runs sampled)
fast-complex#cos x 887,072,837 ops/sec ±0.14% (97 runs sampled)
Fastest is fast-complex#cos

cosh:
complex.js#cosh x 5,631,226 ops/sec ±5.49% (81 runs sampled)
fast-complex#cosh x 884,864,879 ops/sec ±0.21% (96 runs sampled)
Fastest is fast-complex#cosh

div:
complex.js#div x 3,544,837 ops/sec ±2.16% (92 runs sampled)
fast-complex#div x 33,865,117 ops/sec ±0.75% (90 runs sampled)
Fastest is fast-complex#div

euler:
complex.js#new(cos, sin) x 8,997,733 ops/sec ±6.60% (82 runs sampled)
fast-complex#euler x 869,767,967 ops/sec ±0.86% (89 runs sampled)
Fastest is fast-complex#euler

exp:
complex.js#exp x 6,603,115 ops/sec ±2.62% (90 runs sampled)
fast-complex#exp x 886,943,718 ops/sec ±0.14% (93 runs sampled)
Fastest is fast-complex#exp

floor:
complex.js#floor x 8,693,352 ops/sec ±1.56% (89 runs sampled)
fast-complex#floor x 837,131,468 ops/sec ±10.72% (93 runs sampled)
Fastest is fast-complex#floor

ln:
complex.js#log x 5,940,980 ops/sec ±1.11% (91 runs sampled)
fast-complex#ln x 889,932,525 ops/sec ±0.25% (95 runs sampled)
Fastest is fast-complex#ln

log10:
complex.js#log(10) x 3,534,550 ops/sec ±1.87% (91 runs sampled)
fast-complex#log10 x 901,223,154 ops/sec ±0.29% (93 runs sampled)
Fastest is fast-complex#log10

mul:
complex.js#mul x 4,046,062 ops/sec ±3.02% (87 runs sampled)
fast-complex#mul x 32,582,306 ops/sec ±1.38% (91 runs sampled)
Fastest is fast-complex#mul

negate:
complex.js#negate x 8,080,732 ops/sec ±3.24% (89 runs sampled)
fast-complex#negate x 887,635,825 ops/sec ±0.21% (96 runs sampled)
Fastest is fast-complex#negate

pow:
complex.js#pow x 3,039,429 ops/sec ±0.53% (93 runs sampled)
fast-complex#pow x 17,816,696 ops/sec ±0.86% (90 runs sampled)
Fastest is fast-complex#pow

reciprocal:
complex.js#inverse x 5,887,831 ops/sec ±6.41% (74 runs sampled)
fast-complex#reciprocal x 862,676,299 ops/sec ±0.69% (91 runs sampled)
Fastest is fast-complex#reciprocal

sign:
complex.js#sign x 7,629,057 ops/sec ±1.15% (90 runs sampled)
fast-complex#sign x 885,903,525 ops/sec ±0.17% (95 runs sampled)
Fastest is fast-complex#sign

sin:
complex.js#sin x 6,033,439 ops/sec ±1.14% (89 runs sampled)
fast-complex#sin x 885,824,855 ops/sec ±0.16% (99 runs sampled)
Fastest is fast-complex#sin

sinh:
complex.js#sinh x 6,633,315 ops/sec ±0.66% (93 runs sampled)
fast-complex#sinh x 908,339,848 ops/sec ±0.45% (95 runs sampled)
Fastest is fast-complex#sinh

sqrt:
complex.js#sqrt x 7,281,135 ops/sec ±0.67% (95 runs sampled)
fast-complex#sqrt x 233,432,387 ops/sec ±1.23% (94 runs sampled)
Fastest is fast-complex#sqrt

sub:
complex.js#sub x 4,310,852 ops/sec ±1.86% (89 runs sampled)
fast-complex#sub x 27,965,287 ops/sec ±6.10% (76 runs sampled)
Fastest is fast-complex#sub

tan:
complex.js#tan x 5,408,402 ops/sec ±1.50% (94 runs sampled)
fast-complex#tan x 894,806,714 ops/sec ±0.41% (95 runs sampled)
Fastest is fast-complex#tan

tanh:
complex.js#tanh x 5,560,661 ops/sec ±0.28% (91 runs sampled)
fast-complex#tanh x 871,009,086 ops/sec ±0.17% (98 runs sampled)
Fastest is fast-complex#tanh
```