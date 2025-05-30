const fs = require('fs-extra');
const path = require('path');

// CONFIGURATION - Edit this path to match your Obsidian export directory
const DEFAULT_EXPORT_PATH = '/home/cameron/Documents/Vault/ObsidianVault/output'; // <-- CHANGE THIS

// Default destination directories (relative to script location)
const DEFAULT_ASSETS_DIR = './content/Assets';
const DEFAULT_BLOGS_DIR = './content/blogs';
const DEFAULT_NOTES_DIR = './content/notes';

/**
 * Parse command line arguments
 */
function parseArguments() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`Usage: node obsidian_import_script.js [--note|--blog] [custom_path]`);
        console.log(`  --note: Import as notes (saves to notes/ directory)`);
        console.log(`  --blog: Import as blog posts (saves to blogs/ directory)`);
        console.log(`  custom_path: Custom export directory path (optional)`);
        console.log(`\nExamples:`);
        console.log(`  node obsidian_import_script.js --blog /path/to/obsidian/export`);
        console.log(`  node obsidian_import_script.js --note`);
        process.exit(1);
    }
    
    let outputType = 'blog'; // default
    let exportPath = DEFAULT_EXPORT_PATH;
    
    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === '--note') {
            outputType = 'note';
        } else if (arg === '--blog') {
            outputType = 'blog';
        } else if (!arg.startsWith('--')) {
            // Assume it's a custom path
            exportPath = arg;
        }
    }
    
    return { outputType, exportPath };
}

/**
 * Get destination directories based on output type
 */
function getDestinationDirs(outputType) {
    const assetsDir = DEFAULT_ASSETS_DIR;
    const contentDir = outputType === 'note' ? DEFAULT_NOTES_DIR : DEFAULT_BLOGS_DIR;
    
    return { assetsDir, contentDir };
}

/**
 * Clean filename by removing spaces and special characters
 */
function cleanFilename(filename) {
    return filename
        .replace(/\s+/g, '') // Remove all whitespace
        .replace(/[^\w.-]/g, ''); // Keep only word characters, dots, and hyphens
}

/**
 * Extract first paragraph from markdown content
 */
function extractFirstParagraph(content) {
    // Remove YAML frontmatter blocks only from the beginning of the document
    // This handles multiple consecutive frontmatter blocks at the start
    let withoutFrontmatter = content.replace(/^(?:---[\s\S]*?---\s*)+/, '');
    
    // Split by double newlines to get paragraphs
    const paragraphs = withoutFrontmatter.split(/\n\s*\n/);
    
    // Find first non-empty paragraph that's not just a title
    for (let paragraph of paragraphs) {
        const cleaned = paragraph.trim();
        if (cleaned && !cleaned.startsWith('#') && cleaned.length > 10) {
            // Remove markdown formatting for description
            const description = cleaned
                .replace(/!\[\[.*?\]\]/g, '') // Remove wikilink images
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
                .replace(/[*_`]/g, '') // Remove formatting
                .replace(/\n/g, ' ') // Replace newlines with spaces
                .trim();
            
            // Return YAML-safe version
            return escapeYamlString(description);
        }
    }
    
    return 'No description available';
}

/**
 * Convert wikilinks to markdown image links
 */
function convertWikilinks(content, imagePaths) {
    return content.replace(/!\[\[([^\]]+)\]\]/g, (match, imageName) => {
        // Handle image with or without extension
        const cleanImageName = imageName.trim();
        
        // Find matching image file (case insensitive, with or without extension)
        const matchingImage = imagePaths.find(imgPath => {
            const imgFileName = path.basename(imgPath);
            const imgNameWithoutExt = path.parse(imgFileName).name;
            
            return imgFileName.toLowerCase() === cleanImageName.toLowerCase() ||
                   imgNameWithoutExt.toLowerCase() === cleanImageName.toLowerCase();
        });
        
        if (matchingImage) {
            const finalImageName = path.basename(matchingImage);
            return `![](../Assets/${finalImageName})`;
        }
        
        // If no matching image found, keep the original but convert to standard markdown
        console.warn(`Warning: Image not found for wikilink: ${cleanImageName}`);
        return `![${cleanImageName}](../Assets/${cleanImageName})`;
    });
}

/**
 * Escape YAML string values
 */
function escapeYamlString(str) {
    // If string contains problematic characters, wrap in double quotes and escape internal quotes
    if (/[:"'#@&*!|>%{}\[\]\\`]/.test(str) || str.includes('\n') || str.trim() !== str) {
        return '"' + str.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }
    return str;
}

/**
 * Generate YAML frontmatter
 */
function generateFrontmatter(title, description, outputType) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Escape title for YAML safety (description is already escaped in extractFirstParagraph)
    const safeTitle = escapeYamlString(title);
    
    const layout = outputType === 'note' ? 'note.liquid' : 'blogpost.liquid';
    
    return `---
title: ${safeTitle}
date: ${today}
description: ${description}
layout: ${layout}
---

`;
}

/**
 * Process a single markdown file
 */
async function processMarkdownFile(filePath, exportDir, outputType, contentDir, assetsDir) {
    console.log(`Processing: ${path.basename(filePath)}`);
    
    try {
        // Read the markdown file
        let content = await fs.readFile(filePath, 'utf8');
        
        // Remove YAML frontmatter blocks only from the beginning of the document
        // This handles multiple consecutive frontmatter blocks at the start
        content = content.replace(/^(?:---[\s\S]*?---\s*)+/, '');
        
        // Generate title from filename
        const originalFilename = path.parse(filePath).name;
        const title = originalFilename.replace(/[_-]/g, ' ').trim();
        
        // Extract first paragraph for description
        const description = extractFirstParagraph(content);
        
        // Find all images in the export directory
        const allFiles = await fs.readdir(exportDir);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
        const imagePaths = allFiles
            .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => path.join(exportDir, file));
        
        // Convert wikilinks to markdown links
        const convertedContent = convertWikilinks(content, imagePaths);
        
        // Generate frontmatter
        const frontmatter = generateFrontmatter(title, description, outputType);
        
        // Combine frontmatter with content
        const finalContent = frontmatter + convertedContent;
        
        // Create clean filename for output
        const cleanName = cleanFilename(originalFilename) + '.md';
        const outputPath = path.join(contentDir, cleanName);
        
        // Ensure content directory exists
        await fs.ensureDir(contentDir);
        
        // Write the processed markdown file
        await fs.writeFile(outputPath, finalContent);
        console.log(`✓ Saved: ${cleanName}`);
        
        // Copy images to Assets directory
        if (imagePaths.length > 0) {
            await fs.ensureDir(assetsDir);
            
            for (const imagePath of imagePaths) {
                const imageName = path.basename(imagePath);
                const destPath = path.join(assetsDir, imageName);
                await fs.copy(imagePath, destPath, { overwrite: true });
                console.log(`✓ Copied image: ${imageName}`);
            }
        }
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

/**
 * Main function
 */
async function main() {
    // Parse command line arguments
    const { outputType, exportPath } = parseArguments();
    const { assetsDir, contentDir } = getDestinationDirs(outputType);
    
    console.log(`Output type: ${outputType}`);
    console.log(`Importing from: ${exportPath}`);
    console.log(`Destination: ${contentDir} and ${assetsDir}\n`);
    
    try {
        // Check if export directory exists
        if (!await fs.pathExists(exportPath)) {
            console.error(`Error: Export directory does not exist: ${exportPath}`);
            console.log(`Please provide a valid export directory path.`);
            process.exit(1);
        }
        
        // Read all files in export directory
        const files = await fs.readdir(exportPath);
        const markdownFiles = files
            .filter(file => path.extname(file).toLowerCase() === '.md')
            .map(file => path.join(exportPath, file));
        
        if (markdownFiles.length === 0) {
            console.log('No markdown files found in export directory.');
            return;
        }
        
        console.log(`Found ${markdownFiles.length} markdown file(s)\n`);
        
        // Process each markdown file
        for (const filePath of markdownFiles) {
            await processMarkdownFile(filePath, exportPath, outputType, contentDir, assetsDir);
        }
        
        console.log(`\n✅ Import completed! Processed ${markdownFiles.length} file(s) as ${outputType}s.`);
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}