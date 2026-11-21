import { createHash } from "crypto";
import { sha256Hex } from "./sha256";

/**
 * @param text the input.
 * @returns node's own SHA-256 hex of the UTF-8 encoding of `text`.
 */
function referenceSha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/** The bundled synchronous SHA-256 the session registry derives its key with. */
describe("sha256Hex", (): void => {
  it("matches the FIPS 180-4 test vectors", (): void => {
    expect(sha256Hex("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(sha256Hex("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")).toBe(
      "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
    );
  });

  it("matches node's crypto on every length around the block boundaries", (): void => {
    for (let length: number = 0; length <= 200; length++) {
      const text: string = "x".repeat(length);
      expect(sha256Hex(text)).toBe(referenceSha256(text));
    }
  });

  it("encodes 1-, 2-, 3- and 4-byte UTF-8 characters and NUL like node", (): void => {
    const text: string = "aü€\u{1F600}\0z";
    expect(sha256Hex(text)).toBe(referenceSha256(text));
  });

  it("encodes a lone surrogate as U+FFFD, exactly like node", (): void => {
    const text: string = "a\ud800b";
    expect(sha256Hex(text)).toBe(referenceSha256(text));
    expect(sha256Hex(text)).toBe(sha256Hex("a�b"));
  });
});
