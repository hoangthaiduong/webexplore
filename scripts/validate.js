const fs=require('fs');
const data=JSON.parse(fs.readFileSync('src/data/websites.json','utf8'));
const cats=['AI & Machine Learning','Social Media','Games','Development','Education','Design & Media','Productivity','Entertainment','Search & Research','Utilities','Business & Finance','Technology'];
const ids=new Set(),domains=new Set(),hosts=new Set(),errors=[];
const {URL}=require('url');
for(const w of data){if(ids.has(w.id))errors.push('duplicate id '+w.id);ids.add(w.id);if(domains.has(w.domain))errors.push('duplicate domain '+w.domain);domains.add(w.domain);if(!/^https:\/\//.test(w.url))errors.push('bad URL '+w.url);const host=new URL(w.url).hostname.toLowerCase();if(hosts.has(host))errors.push('duplicate hostname '+host);hosts.add(host);if(w.domain!==host)errors.push('domain field mismatch '+w.domain);if(!cats.includes(w.category))errors.push('bad category '+w.category);if(!w.name||!w.description||!w.tags?.length)errors.push('missing field '+w.id);}
if(cats.some(c=>!data.some(w=>w.category===c)))errors.push('empty category');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS: ${data.length} records; ${ids.size} unique IDs; ${domains.size} unique domain keys and ${hosts.size} unique hostnames; all 12 categories populated; URL/category/required-field checks passed.`);
