const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const { execSync } = require("node:child_process");

test("package.json has start and test scripts", () => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  assert.ok(pkg.scripts);
  assert.ok(pkg.scripts.start);
  assert.ok(pkg.scripts.test);
});

test("repository includes safe environment example", () => {
  assert.ok(fs.existsSync(".env.example"));
});

test("node_modules is ignored and not tracked by git", () => {
  const ignored = execSync("git check-ignore node_modules", {
    encoding: "utf8",
  }).trim();

  assert.equal(ignored, "node_modules");

  const tracked = execSync("git ls-files node_modules", {
    encoding: "utf8",
  }).trim();

  assert.equal(tracked, "");
});
