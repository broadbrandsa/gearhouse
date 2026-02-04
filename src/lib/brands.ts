import fs from 'fs';
import path from 'path';
import { Brand } from '@/types/brand';

const brandsDirectory = path.join(process.cwd(), 'src/content/brands');

export function getAllBrands(): Brand[] {
    const fileNames = fs.readdirSync(brandsDirectory);
    const allBrands = fileNames.map((fileName) => {
        const fullPath = path.join(brandsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const brand: Brand = JSON.parse(fileContents);
        return brand;
    });

    return allBrands.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getBrandBySlug(slug: string): Brand | undefined {
    try {
        const fullPath = path.join(brandsDirectory, `${slug}.json`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return undefined;
    }
}
