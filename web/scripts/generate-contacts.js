#!/usr/bin/env node

const fs = require('fs')
const parse = require('csv-parse')
const path = require('path')

const csv_path = path.join(__dirname, '../data/contacts.csv')
const json_paths = [
  path.join(__dirname, '../src/data/contacts.json'),
  path.join(__dirname, '../api/data/contacts.json'),
]

const input = fs.readFileSync(csv_path);

parse(input, {
  columns: true,
  skip_empty_lines: true
}, (err, output) => {
  if (err) throw err;

  const data = {}

  output.forEach(row => {
    const school = row.school

    if (!data.hasOwnProperty(school)) data[school] = []

    data[school].push(row)
  })

  json_paths.forEach(json_path => {
    fs.writeFileSync(json_path, JSON.stringify(data, null, 2))
  })
})
