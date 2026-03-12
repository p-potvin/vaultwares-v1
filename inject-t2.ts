import fs from 'fs';
import path from 'path';

const translations = JSON.parse(fs.readFileSync('src/locales/fr.json', 'utf-8'));

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    if (filePath.endsWith('.tsx') && !content.includes('useTranslation')) {
        let injectedT = false;
        
        // Find strings in file and replace
        Object.keys(translations).forEach(en => {
            if (en.length < 3) return;
            
            // For JSX text content: >String<
            const targetText = `>${en}<`;
            const replaceText = `>{t("${en}")}<`;
            
            if (content.includes(targetText)) {
                content = content.split(targetText).join(replaceText);
                modified = true;
                injectedT = true;
            }
            
            // For JSX with newlines: >\n  String\n<
            const targetText2 = `>\n              ${en}\n            <`; // Common in formatted code
            if (content.includes(targetText2)) {
                 // Too fragile to guess whitespace, so let's just do a basic replace if we find it
            }
        });

        // if we did a replacement, we must inject useTranslation
        if (injectedT) {
            content = "import { useTranslation } from 'react-i18next';\n" + content;
            const componentRegex = /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/;
            content = content.replace(componentRegex, (match) => {
                return match + "\n  const { t } = useTranslation();\n";
            });
        }
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
    if (file.endsWith('.tsx') && !file.includes('Navbar')) {
        processFile(file);
    }
}
