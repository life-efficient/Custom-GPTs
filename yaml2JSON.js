// import yaml from 'js-yaml';
// import fs from 'fs';
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
const actionDir = './assistant-chat/agents/actions/docs/action.yml';
const doc = yaml.load(fs.readFileSync(`${actionDir}`, 'utf8'));
// save to file
fs.writeFileSync(`${actionDir}`.replace('.yml', '.json'), JSON.stringify(doc, null, 2));

// add export default to export as js object for use in react project
fs.appendFileSync(`${actionDir}`.replace('.yml', '.js'), `export default ${JSON.stringify(doc, null, 4)};`);
