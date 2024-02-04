// @ts-nocheck

import * as fs from 'fs'
import * as path from 'path'

// Utils shamefully stolen from
// https://github.com/dominictarr/rc/blob/master/lib/utils.js

function find(...args) {
  const rel = path.join.apply(null, [].slice.call(args));
  return findStartingWith(path.dirname(process.mainModule.filename), rel);
}

function findStartingWith(start, rel) {
  const file = path.join(start, rel);
  try {
    fs.statSync(file);
    return file;
  } catch (err) {
    // They are equal for root dir
    if (path.dirname(start) !== start) {
      return findStartingWith(path.dirname(start), rel);
    }
  }
}

function parse(content) {
  if (/^\s*{/.test(content)) {
    return JSON.parse(content);
  }
  return undefined;
}

function file(...args) {
  const nonNullArgs = [].slice.call(args).filter(arg => arg != null);

  // path.join breaks if it's a not a string, so just skip this.
  for (let i = 0; i < nonNullArgs.length; i++) {
    if (typeof nonNullArgs[i] !== 'string') {
      return;
    }
  }

  const file = path.join.apply(null, nonNullArgs);
  try {
    return fs.readFileSync(file, 'utf-8');
  } catch (err) {
    return undefined;
  }
}

function json(...args) {
  const content = file.apply(null, args);
  return content ? parse(content) : null;
}

export function useFindConfig () {
  // Find the rc file path
  const rcPath = find('pro.config.json');
// Or
// const rcPath = find('/.config', '.projectrc');

// Read the contents as json
  const rcObject = json(rcPath);
  console.log(rcObject);
}

