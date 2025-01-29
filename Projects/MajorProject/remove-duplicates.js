import fs from 'fs';

// Read the package-lock.json file
const packageLockPath = './package-lock.json';
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));

// Function to remove duplicates
const removeDuplicates = (obj) => {
    const seen = new Set();
    const result = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!seen.has(key)) {
                seen.add(key);
                result[key] = obj[key];
            }
        }
    }

    return result;
};

// Remove duplicates in the dependencies section
if (packageLock.dependencies) {
    packageLock.dependencies = removeDuplicates(packageLock.dependencies);
}

// Write the updated package-lock.json file
fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2));

console.log('Duplicates removed from package-lock.json');