import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const [username, password, name = username] = process.argv.slice(2);
if (!username || !password) {
  console.error("Usage: npm run caller:add-user -- <username> <password> [display name]");
  process.exit(1);
}
const file = path.resolve("config/caller-users.json");
const users = JSON.parse(fs.readFileSync(file, "utf8"));
if (users.some((user) => user.username === username)) throw new Error("This username already exists");
const salt = crypto.randomBytes(16).toString("hex");
const passwordHash = crypto.scryptSync(password, salt, 64).toString("hex");
users.push({ username, name, salt, passwordHash, disabled: false });
fs.writeFileSync(file, `${JSON.stringify(users, null, 2)}\n`);
console.log(`Caller user added: ${username}`);
