const fs = require('fs');
const path = require('path');

const brandsDir = path.join(process.cwd(), 'src/content/brands');

try {
    const files = fs.readdirSync(brandsDir);
    console.log(`Found ${files.length} files in ${brandsDir}`);

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(brandsDir, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                JSON.parse(content);
                console.log(`✅ ${file}: Valid JSON`);
            } catch (err) {
                console.error(`❌ ${file}: Invalid JSON - ${err.message}`);
            }
        }
    });
} catch (err) {
    console.error(`Error reading directory: ${err.message}`);
}
