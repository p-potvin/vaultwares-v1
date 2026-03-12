import fs from 'fs';
import { execSync } from 'child_process';

const diff = execSync('git diff a541ad412a0198bbf0cc220cbca18533bca407f3 954c2bf1f36119f2b65dcff126e9098f6397cb6a -- src/components src/pages src/store src/App.tsx').toString();

const lines = diff.split('\n');
const translations: Record<string, string> = {};

let currentEn = '';
let currentFr = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('-') && !line.startsWith('---')) {
    const en = line.substring(1).trim();
    if (en && !en.startsWith('<') && !en.startsWith('{')) { // basic heuristic
        // Look ahead for corresponding +
        let j = i + 1;
        while (j < lines.length && (lines[j].startsWith('-') || lines[j].startsWith('+'))) {
            if (lines[j].startsWith('+') && !lines[j].startsWith('+++')) {
                const fr = lines[j].substring(1).trim();
                if (fr) {
                    // remove tags if any
                    const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').trim();
                    const cleanEn = stripTags(en);
                    const cleanFr = stripTags(fr);
                    if (cleanEn && cleanFr && cleanEn !== cleanFr && !cleanEn.includes('=>') && !cleanEn.includes('import')) {
                        translations[cleanEn] = cleanFr;
                    }
                    break;
                }
            }
            j++;
        }
    }
  }
}

fs.writeFileSync('src/i18n-translations.json', JSON.stringify(translations, null, 2));
console.log('Extracted translations:', Object.keys(translations).length);
