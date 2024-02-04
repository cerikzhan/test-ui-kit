import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const CONFIG_SRC = path.join(__dirname, '..')
const CONFIG_DIST = path.join(__dirname, '../../../../')

const CONFIG_FILE_NAME = 'default.config.json'

fs.copyFile(`${CONFIG_SRC}/${CONFIG_FILE_NAME}`, `${CONFIG_DIST}/${CONFIG_FILE_NAME}`, (err) => {
  if (err) throw err
  console.log("File copied")
})
