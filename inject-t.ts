import fs from 'fs';
import path from 'path';

const translations = JSON.parse(fs.readFileSync('src/i18n-translations.json', 'utf-8'));

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // We only process TSX files for component text
    if (filePath.endsWith('.tsx')) {
        // Add useTranslation import if not there
        if (!content.includes('useTranslation')) {
            // Find a good spot to insert import
            content = "import { useTranslation } from 'react-i18next';\n" + content;
            
            // Find the component function to insert `const { t } = useTranslation();`
            const componentRegex = /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/;
            content = content.replace(componentRegex, (match) => {
                return match + "\n  const { t } = useTranslation();\n";
            });
            modified = true;
        }

        // Extremely naive replacement of specific strings found in translations
        Object.keys(translations).forEach(en => {
            if (en.length < 3) return; // skip very short strings
            // Replace exact text between > and <
            const regex = new RegExp(`>\\s*${en.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\$&')}\\s*<`, 'g');
            if (regex.test(content)) {
                content = content.replace(regex, `>{t("${en}")}<`);
                modified = true;
            }
        });
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function walkSync(dir: string, filelist: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkSync(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    }
    return filelist;
}

const files = walkSync('src/components').concat(walkSync('src/pages'));
for (const file of files) {
    if (file.endsWith('.tsx')) {
        processFile(file);
    }
}
