import * as crypto from "crypto";

/**
 * Generate a salted MD5 hash of the input string.
 * @param input - The input string to be hashed.
 * @param salt - The salt to be added to the input string.
 * @returns The salted MD5 hash.
 */

// Usage example
const password = "avavin";
const salt = "asldjd23qie2bdnjkbnaf!@#$@$";

export const md5WithSalt = (): string => {
  const hash = crypto.createHash("md5");
  // const timestampInMinutes = Math.floor(Date.now() / 1000 / 60);
  // console.log(timestampInMinutes)
  hash.update(password + "$" + salt);
  return hash.digest("hex");
};

// console.log(`Original Password: ${password}`);
// console.log(`Salt: ${salt}`);
// console.log(`Hashed Password: ${hashedPassword}`);
