/**
 * Round constants of SHA-256 (FIPS 180-4 section 4.2.2): the first 32 bits of the fractional parts of
 * the cube roots of the first 64 primes.
 */
const ROUND_CONSTANTS: number[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
  0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
  0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
  0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
  0xc67178f2
];

/** Initial hash value of SHA-256 (FIPS 180-4 section 5.3.3). */
const INITIAL_HASH: number[] = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
];

/**
 * Rotate a 32-bit word right.
 *
 * @param word the 32-bit word.
 * @param bits how many bits to rotate by (1..31).
 * @returns the rotated word.
 */
function rotateRight(word: number, bits: number): number {
  return (word >>> bits) | (word << (32 - bits));
}

/**
 * Encode `text` as UTF-8 bytes, handling surrogate pairs (a lone surrogate becomes U+FFFD, exactly as
 * `TextEncoder` does).
 *
 * @param text the string to encode.
 * @returns the UTF-8 bytes.
 */
function utf8Bytes(text: string): number[] {
  const bytes: number[] = [];
  for (const character of text) {
    let codePoint: number = Number(character.codePointAt(0));
    if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
      codePoint = 0xfffd;
    }
    if (codePoint < 0x80) {
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      bytes.push(0xc0 | (codePoint >> 6), 0x80 | (codePoint & 0x3f));
    } else if (codePoint < 0x10000) {
      bytes.push(0xe0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3f), 0x80 | (codePoint & 0x3f));
    } else {
      bytes.push(
        0xf0 | (codePoint >> 18),
        0x80 | ((codePoint >> 12) & 0x3f),
        0x80 | ((codePoint >> 6) & 0x3f),
        0x80 | (codePoint & 0x3f)
      );
    }
  }
  return bytes;
}

/**
 * SHA-256 of the UTF-8 encoding of `text`, as 64 lower-case hex characters.
 *
 * Synchronous on purpose: the Keycloak session registry derives its key from the credentials, and a
 * key computed with the asynchronous `crypto.subtle.digest` would open a window between two callers'
 * lookups in which both miss and both log in. `crypto.subtle` is also absent outside secure contexts.
 *
 * @param text the string to hash.
 * @returns the hex digest.
 */
export function sha256Hex(text: string): string {
  const bytes: number[] = utf8Bytes(text);
  const bitLength: number = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) {
    bytes.push(0);
  }
  // 64-bit big-endian length; the high word is the part above 2^32 bits.
  const highBits: number = Math.floor(bitLength / 0x100000000);
  for (const word of [highBits, bitLength >>> 0]) {
    bytes.push((word >>> 24) & 0xff, (word >>> 16) & 0xff, (word >>> 8) & 0xff, word & 0xff);
  }

  const hash: number[] = INITIAL_HASH.slice();
  const schedule: number[] = new Array<number>(64);
  for (let offset: number = 0; offset < bytes.length; offset += 64) {
    for (let index: number = 0; index < 16; index++) {
      const at: number = offset + (index * 4);
      schedule[index] = (bytes[at] << 24) | (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3];
    }
    for (let index: number = 16; index < 64; index++) {
      const before15: number = schedule[index - 15];
      const before2: number = schedule[index - 2];
      const sigma0: number = rotateRight(before15, 7) ^ rotateRight(before15, 18) ^ (before15 >>> 3);
      const sigma1: number = rotateRight(before2, 17) ^ rotateRight(before2, 19) ^ (before2 >>> 10);
      schedule[index] = (schedule[index - 16] + sigma0 + schedule[index - 7] + sigma1) | 0;
    }
    let [a, b, c, d, e, f, g, h]: number[] = hash;
    for (let index: number = 0; index < 64; index++) {
      const sum1: number = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
      const choice: number = (e & f) ^ (~e & g);
      const temp1: number = (h + sum1 + choice + ROUND_CONSTANTS[index] + schedule[index]) | 0;
      const sum0: number = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
      const majority: number = (a & b) ^ (a & c) ^ (b & c);
      const temp2: number = (sum0 + majority) | 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }
    const working: number[] = [a, b, c, d, e, f, g, h];
    for (let index: number = 0; index < 8; index++) {
      hash[index] = (hash[index] + working[index]) | 0;
    }
  }
  return hash.map((word: number): string => (word >>> 0).toString(16).padStart(8, "0")).join("");
}
