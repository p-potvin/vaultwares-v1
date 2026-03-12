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
            // Match exactly with whitespace padding around it if necessary, but string.replace with > \n string \n < might be needed
            // Actually, we can use a simpler approach: 
            const parts = content.split('>' + en + '<');
            if (parts.length > 1) {
                content = parts.join(`>{t("${en}")}<`);
                modified = true;
                injectedT = true;
            }

            // Also check for { 'String' } or { "String" }
            const parts2 = content.split("'" + en + "'");
            if (parts2.length > 1 && !en.includes('http') && !en.includes('bg-')) {
                // Not safe generally, skip this unless needed.
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
    if (file.endsWith('.tsx') && !file.includes('Navbar') && !file.includes('Footer') && !file.includes('Home') && !file.includes('ProductCard') && !file.includes('Blog')) {
        processFile(file);
    }
}
