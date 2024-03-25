// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';

import { execSync } from 'child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };
const result1 = execSync(
  'bin/poetry.js __fixtures__/poetry1.csv',
  // @ts-ignore
  options,
);
const result2 = execSync(
  'bin/poetry.js __fixtures__/poetry2.csv',
  // @ts-ignore
  options,
);
const rows1 = result1.trim().split('\n');
const rows2 = result2.trim().split('\n');

test('step1', () => {
  assert.strictEqual(rows1[0], 'Author: Федор Тютчев, Title: Silentium !');
  assert.strictEqual(rows2[0], 'Author: Афанасий Фет, Title: Я пришел к тебе с приветом ...');
});

test('step2', () => {
  assert.strictEqual(rows1[1], 'Strophes: 3, Strings in each strophe: 6');
  assert.strictEqual(rows2[1], 'Strophes: 4, Strings in each strophe: 4');
});

test('step3', () => {
  assert.strictEqual(rows1[2], 'Unions: 12');
  assert.strictEqual(rows2[2], 'Unions: 10');
});

test('step4', () => {
  assert.strictEqual(rows1[3], 'Words: 70, Signs: 27');
  assert.strictEqual(rows2[3], 'Words: 71, Signs: 24');
});

test('step5', () => {
  assert.strictEqual(rows1[4], 'Words percentage: 64.2%, Unions percentage: 11.0%, Signs percentage: 24.8%');
  assert.strictEqual(rows2[4], 'Words percentage: 67.6%, Unions percentage: 9.5%, Signs percentage: 22.9%');
});
