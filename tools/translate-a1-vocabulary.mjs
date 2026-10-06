import fs from 'node:fs';

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error('Használat: node tools/translate-a1-vocabulary.mjs INPUT.json OUTPUT.json');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const values = [...new Set(source.sections.flatMap(section => section.entries.map(entry => entry.en)))];
const batches = [];
let batch = [];
let batchLength = 0;
for (const value of values) {
  if (batch.length && batchLength + value.length + 1 > 3200) {
    batches.push(batch);
    batch = [];
    batchLength = 0;
  }
  batch.push(value);
  batchLength += value.length + 1;
}
if (batch.length) batches.push(batch);

const translations = {};
for (let index = 0; index < batches.length; index += 1) {
  const valuesInBatch = batches[index];
  const body = new URLSearchParams({ client:'gtx', sl:'en', tl:'hu', dt:'t', q:valuesInBatch.join('\n') });
  const response = await fetch('https://translate.googleapis.com/translate_a/single', {
    method:'POST',
    headers:{ 'content-type':'application/x-www-form-urlencoded;charset=UTF-8' },
    body
  });
  if (!response.ok) throw new Error(`A fordítási kérés sikertelen: ${response.status}`);
  const data = await response.json();
  const translatedText = data[0].map(segment => segment[0]).join('');
  const translatedLines = translatedText.split(/\r?\n/).map(value => value.trim());
  while (translatedLines.length && !translatedLines.at(-1)) translatedLines.pop();
  if (translatedLines.length !== valuesInBatch.length) {
    throw new Error(`Eltérő sorszám a(z) ${index + 1}. kötegben: ${translatedLines.length} != ${valuesInBatch.length}`);
  }
  valuesInBatch.forEach((value, valueIndex) => { translations[value] = translatedLines[valueIndex]; });
  console.log(`${index + 1}/${batches.length}: ${valuesInBatch.length} jelentés`);
  if (index < batches.length - 1) await new Promise(resolve => setTimeout(resolve, 2500));
}

fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
console.log(JSON.stringify({ uniqueMeanings:values.length, translated:Object.keys(translations).length }));
