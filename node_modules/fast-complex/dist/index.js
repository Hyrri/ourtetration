var Complex = (function (exports) {
  'use strict';

  /**
   * @license
   * MIT License
   *
   * Copyright (c) 2019 Alexis Munsayac
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   *
   * @author Alexis Munsayac <alexis.munsayac@gmail.com>
   * @copyright Alexis Munsayac 2019
   */
  /* eslint-disable no-nested-ternary */
  /**
   * @typedef {Array|Float32Array|Float64Array|number} complex
   */
  /**
   * @ignore
   */
  const {
    sqrt: msqrt, max, ceil: mceil,
    floor: mfloor, abs: mabs, exp: mexp, log10: mlog10,
    log: mlog, cos: mcos, sin: msin, tan: mtan,
    asin: masin, acos: macos, atan: matan, atan2: matan2,
    cosh: mcosh, sinh: msinh, tanh: mtanh, sign: msign,
  } = Math;
  /**
   * @ignore
   */
  const masinh = x => mlog(x + msqrt(x * x + 1));
  /**
   * @ignore
   */
  const macosh = x => mlog(x + msqrt(x * x - 1));
  /**
   * @ignore
   */
  const matanh = x => mlog((1 + x) / (1 - x)) / 2;
  /**
   * @ignore
   */
  const BASE_10 = [mlog(10), 0];
  /**
   * The value 2 in complex form
   */
  const TWO = Object.freeze([2, 0]);
  /**
   * The value 1 in complex form
   */
  const ONE = Object.freeze([1, 0]);
  /**
   * The value 0 in complex form
   */
  const ZERO = Object.freeze([0, 0]);
  /**
   * The square root of -1
   */
  const I = Object.freeze([0, 1]);
  /**
   * The square root of -1
   */
  const HALF_I = Object.freeze([0, 0.5]);
  /**
   * The negative square root of -1
   */
  const NI = Object.freeze([0, -1]);
  /**
   * A NaN complex
   */
  const NAN = Object.freeze([NaN, NaN]);
  /**
   * @ignore
   */
  const EPSILON = 1e-7;
  /**
   * @ignore
   */
  const eq = (a, b) => mabs(a - b) <= EPSILON * max(1, mabs(a), mabs(b));
  /**
   * @ignore
   */
  const isNumber = x => typeof x === 'number';
  /**
   * @ignore
   */
  const unsafeL2 = c => c[0] * c[0] + c[1] * c[1];
  /**
   * @ignore
   */
  const unsafeAbs = c => msqrt(unsafeL2(c));
  /**
   * @ignore
   */
  const unsafeArg = c => matan2(c[1], c[0]);
  /**
   * @ignore
   */
  const unsafeAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  /**
   * @ignore
   */
  const unsafeSub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  /**
   * @ignore
   */
  const unsafeMul = (a, b) => [
    a[0] * b[0] - a[1] * b[1],
    a[0] * b[1] + a[1] * b[0],
  ];
  /**
   * @ignore
   */
  const unsafeDiv = (a, b) => [
    (a[0] * b[0] + a[1] * b[1]) / unsafeL2(b),
    (a[1] * b[0] - a[0] * b[1]) / unsafeL2(b),
  ];
  /**
   * @ignore
   */
  const unsafeSqrt = c => [
    msqrt((c[0] + unsafeAbs(c)) / 2),
    msqrt((-c[0] + unsafeAbs(c)) / 2) * msign(c[1]),
  ];
  /**
   * @ignore
   */
  const unsafeLn = c => [
    mlog(unsafeAbs(c)),
    unsafeArg(c),
  ];
  /**
   * @ignore
   */
  const unsafeExp = c => [
    mexp(c[0]) * mcos(c[1]),
    mexp(c[0]) * msin(c[1]),
  ];
  /**
   * @ignore
   */
  const unsafeCos = c => [mcos(c[0]) * mcosh(c[1]), -msin(c[0]) * msinh(c[1])];
  /**
   * @ignore
   */
  const unsafeSin = c => [msin(c[0]) * mcosh(c[1]), mcos(c[0]) * msinh(c[1])];
  /**
   * @ignore
   */
  const unsafeCosh = c => [mcosh(c[0]) * mcos(c[1]), msinh(c[0]) * msin(c[1])];
  /**
   * @ignore
   */
  const unsafeSinh = c => [msinh(c[0]) * mcos(c[1]), mcosh(c[0]) * msin(c[1])];
  /**
   * @ignore
   */
  const unsafeAsin = c => unsafeMul(
    NI,
    unsafeLn(
      unsafeAdd(
        unsafeMul(I, c),
        unsafeSqrt(unsafeSub(ONE, unsafeMul(c, c))),
      ),
    ),
  );
  /**
   * @ignore
   */
  const unsafeAcos = c => unsafeMul(
    NI,
    unsafeLn(
      unsafeAdd(
        c,
        unsafeSqrt(unsafeSub(unsafeMul(c, c), ONE)),
      ),
    ),
  );
  /**
   * @ignore
   */
  const unsafeAtan = c => unsafeMul(
    HALF_I,
    unsafeLn(
      unsafeDiv(
        [c[0], 1 + c[1]],
        [-c[0], 1 - c[1]],
      ),
    ),
  );
  /**
   * @ignore
   */
  const unsafeAsinh = (c) => {
    const r = unsafeMul(c, c);
    r[0] += 1;
    return unsafeLn(unsafeAdd(c, unsafeSqrt(r)));
  };
  /**
   * @ignore
   */
  const unsafeAcosh = (c) => {
    const r = unsafeMul(c, c);
    r[0] -= 1;
    return unsafeLn(unsafeAdd(c, unsafeSqrt(r)));
  };
  /**
   * @ignore
   */
  const unsafeAtanh = c => unsafeMul(
    unsafeLn(unsafeDiv(
      unsafeAdd(ONE, c),
      unsafeSub(ONE, c),
    )),
    [0.5, 0],
  );
  /**
   * Checks if a value is a valid complex value.
   */
  const isComplex = x => (x instanceof Array && isNumber(x[0]) && isNumber(x[1]))
    || x instanceof Float32Array
    || x instanceof Float64Array;
  /**
   * Creates a zero complex value (different from ZERO)
   */
  const zero = () => [0, 0];
  /**
   * Solves the conjugate of a given complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const conjugate = c => (
    (isComplex(c) && [c[0], -c[1]])
    || (isNumber(c) && [c, 0])
    || NAN
  );
  /**
   * Negates the given complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const negate = c => (
    (isComplex(c) && [-c[0], -c[1]])
    || (isNumber(c) && [-c, 0])
    || NAN
  );

  /**
   * Adds two complex
   * @param {!complex} a
   * @param {!complex} b
   * Returns NaN complex if one of the given values is not a complex.
   */
  const add = (a, b) => (
    (isComplex(a) && (
      (isComplex(b) && unsafeAdd(a, b))
      || (isNumber(b) && [a[0] + b, a[1]])
    ))
    || (isNumber(a) && (
      (isComplex(b) && [a + b[0], b[1]])
      || (isNumber(b) && [a + b, 0])
    ))
    || NAN
  );

  /**
   * Subtracts two complex
   * @param {!complex} a
   * @param {!complex} b
   * Returns NaN complex if one of the given values is not a complex.
   */
  const sub = (a, b) => (
    (isComplex(a) && (
      (isComplex(b) && unsafeSub(a, b))
      || (isNumber(b) && [a[0] - b, a[1]])
    ))
    || (isNumber(a) && (
      (isComplex(b) && [a - b[0], b[1]])
      || (isNumber(b) && [a - b, 0])
    ))
    || NAN
  );

  /**
   * Multiplies two complex
   * @param {!complex} a
   * @param {!complex} b
   * Returns NaN complex if one of the given values is not a complex.
   */
  const mul = (a, b) => (
    (isComplex(a) && (
      (isComplex(b) && unsafeMul(a, b))
      || (isNumber(b) && [a[0] * b, a[1] * b])
    ))
    || (isNumber(a) && (
      (isComplex(b) && [a * b[0], a * b[1]])
      || (isNumber(b) && [a * b, 0])
    ))
    || NAN
  );

  /**
   * Divides two complex
   * @param {!complex} a
   * @param {!complex} b
   * Returns NaN complex if one of the given values is not a complex.
   */
  const div = (a, b) => (
    (isComplex(a) && (
      (isComplex(b) && unsafeDiv(a, b))
      || (isNumber(b) && [a[0] / b, a[1] / b])
    ))
    || (isNumber(a) && (
      (isComplex(b) && [a / b[0], a / b[1]])
      || (isNumber(b) && [a * b, 0])
    ))
    || NAN
  );

  /**
   * Returns the reciprocal of a complex
   * @param {!complex} c
   * Returns NaN complex if the given value is not a complex.
   */
  const reciprocal = c => (isComplex(c)
    && [
      c[0] / unsafeL2(c),
      -c[1] / unsafeL2(c),
    ])
    || (isNumber(c) && [1 / c, 0])
    || NAN;
  /**
   * Returns the modulus/magnitude of the complex
   * @param {!complex} c
   * @returns {number}
   * Returns NaN if the value is not a valid complex
   */
  const abs = c => (
    (isComplex(c) && unsafeAbs(c))
    || (isNumber(c) ? c : NaN)
  );

  /**
   * Returns the argument of a complex
   * @param {!complex} c
   * @returns {number}
   * Returns NaN if the value is not a valid complex.
   */
  const arg = c => (
    (isComplex(c) && unsafeArg(c))
    || (isNumber(c) ? 0 : NaN)
  );

  /**
   * Converts a radian value into a complex number.
   * @param {!number} x
   * @returns {complex}
   * Returns NaN if the value is not a number.
   */
  const euler = x => (
    (isNumber(x) && [mcos(x), msin(x)])
    || NAN
  );

  /**
   * Calculates the signum of a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const sign = c => (
    (isComplex(c) && [c[0] / unsafeAbs(c), c[1] / unsafeAbs(c)])
    || (isNumber(c) && [msign(c), 0])
    || NAN
  );

  /**
   * Calculates the square root of a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const sqrt = c => (
    (isComplex(c) && (
      (eq(c[1], 0) && [msqrt(c[0]), 0])
      || unsafeSqrt(c)
    ))
    || (isNumber(c) && [msqrt(c), 0])
    || NAN
  );

  /**
   * Calculates the exponentiation of a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const exp = c => (
    (isComplex(c) && unsafeExp(c))
    || (isNumber(c) && [mexp(c), 0])
    || NAN
  );

  /**
   * Calculates the natural logarithm of a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const ln = c => (
    (isComplex(c) && unsafeLn(c))
    || (isNumber(c) && [mlog(c), 0])
    || NAN
  );

  /**
   * Calculates the base 10 logarithm of a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const log10 = c => (
    (isComplex(c) && unsafeDiv(unsafeLn(c), BASE_10))
    || (isNumber(c) && [mlog10(c), 0])
    || NAN
  );

  /**
   * Raises the complex to the n-th complex power
   * @param {!complex} a
   * @param {!complex} b
   * @returns {complex}
   * Returns NaN complex if one of the given values is not a complex.
   */
  const pow = (a, b) => (
    (isComplex(a) && isComplex(b) && unsafeExp(unsafeMul(unsafeLn(a), b)))
    || (isNumber(a) && pow([a, 0], b))
    || (isNumber(b) && pow(a, [b, 0]))
    || NAN
  );

  /**
   * Applies a floor function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const floor = c => (
    (isComplex(c) && [mfloor(c[0]), mfloor(c[1])])
    || (isNumber(c) && [mfloor(c), 0])
    || NAN
  );

  /**
   * Applies a ceiling function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const ceil = c => (
    (isComplex(c) && [mceil(c[0]), mceil(c[1])])
    || (isNumber(c) && [mceil(c), 0])
    || NAN
  );

  /**
   * Converts polar coordinates into a complex
   * @param {!number} radius
   * @param {!number} phi
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const polar = (radius, phi) => (
    (isNumber(radius) && isNumber(phi) && [radius * mcos(phi), radius * msin(phi)])
    || NAN
  );

  /**
   * Applies a sine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const sin = c => (
    (isComplex(c) && unsafeSin(c))
    || (isNumber(c) && [msin(c), 0])
    || NAN
  );

  /**
   * Applies a cosine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const cos = c => (
    (isComplex(c) && unsafeCos(c))
    || (isNumber(c) && [mcos(c), 0])
    || NAN
  );

  /**
   * Applies a tangent function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const tan = c => (
    (isComplex(c) && unsafeDiv(unsafeSin(c), unsafeCos(c)))
    || (isNumber(c) && [mtan(c), 0])
    || NAN
  );

  /**
   * Applies a inverse sine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const asin = c => (
    (isComplex(c) && unsafeAsin(c))
    || (isNumber(c) && [masin(c), 0])
    || NAN
  );

  /**
   * Applies a inverse cosine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const acos = c => (
    (isComplex(c) && unsafeAcos(c))
    || (isNumber(c) && [macos(c), 0])
    || NAN
  );

  /**
   * Applies a inverse tangent function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const atan = c => (
    (isComplex(c) && unsafeAtan(c))
    || (isNumber(c) && [matan(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic sine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const sinh = c => (
    (isComplex(c) && unsafeSinh(c))
    || (isNumber(c) && [msinh(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic cosine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const cosh = c => (
    (isComplex(c) && unsafeCosh(c))
    || (isNumber(c) && [mcosh(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic tangent function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const tanh = c => (
    (isComplex(c) && unsafeDiv(unsafeSinh(c), unsafeCosh(c)))
    || (isNumber(c) && [mtanh(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic inverse sine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const asinh = c => (
    (isComplex(c) && unsafeAsinh(c))
    || (isNumber(c) && [masinh(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic inverse cosine function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const acosh = c => (
    (isComplex(c) && unsafeAcosh(c))
    || (isNumber(c) && [macosh(c), 0])
    || NAN
  );

  /**
   * Applies a hyperbolic inverse tangent function to a complex
   * @param {!complex} c
   * @returns {complex}
   * Returns NaN complex if the given value is not a complex.
   */
  const atanh = c => (
    (isComplex(c) && unsafeAtanh(c))
    || (isNumber(c) && [matanh(c), 0])
    || NAN
  );

  /**
   * Check if two complex are equal
   * @param {!complex} a
   * @param {!complex} b
   * @returns {boolean}
   */
  const equals = (a, b) => (
    (isComplex(a) && isComplex(b) && eq(a[0], b[0]) && eq(a[1], b[1]))
    || a === b
  );

  exports.HALF_I = HALF_I;
  exports.I = I;
  exports.NAN = NAN;
  exports.NI = NI;
  exports.ONE = ONE;
  exports.TWO = TWO;
  exports.ZERO = ZERO;
  exports.abs = abs;
  exports.acos = acos;
  exports.acosh = acosh;
  exports.add = add;
  exports.arg = arg;
  exports.asin = asin;
  exports.asinh = asinh;
  exports.atan = atan;
  exports.atanh = atanh;
  exports.ceil = ceil;
  exports.conjugate = conjugate;
  exports.cos = cos;
  exports.cosh = cosh;
  exports.div = div;
  exports.equals = equals;
  exports.euler = euler;
  exports.exp = exp;
  exports.floor = floor;
  exports.isComplex = isComplex;
  exports.ln = ln;
  exports.log10 = log10;
  exports.mul = mul;
  exports.negate = negate;
  exports.polar = polar;
  exports.pow = pow;
  exports.reciprocal = reciprocal;
  exports.sign = sign;
  exports.sin = sin;
  exports.sinh = sinh;
  exports.sqrt = sqrt;
  exports.sub = sub;
  exports.tan = tan;
  exports.tanh = tanh;
  exports.zero = zero;

  return exports;

}({}));
