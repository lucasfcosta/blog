import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), '..', '_posts');
const reveriesDirectory = path.join(process.cwd(), '..', '_reveries');

export interface Post {
  slug: string;
  title: string;
  author: string;
  place: string;
  flag: string;
  date: string;
  tags?: string;
  content: string;
  excerpt?: string;
}

export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.markdown'))
      .map((fileName) => {
        // Extract slug from filename (remove date prefix and extension)
        const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|markdown)$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        // Extract date from filename
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
        const date = dateMatch ? dateMatch[1] : '';
        
        return {
          slug,
          date,
          title: matterResult.data.title || '',
          author: matterResult.data.author || '',
          place: matterResult.data.place || '',
          flag: matterResult.data.flag || '',
          tags: matterResult.data.tags || '',
          content: matterResult.content,
          excerpt: matterResult.data.excerpt || '',
        } as Post;
      });

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getAllReveries(): Post[] {
  try {
    const fileNames = fs.readdirSync(reveriesDirectory);
    const allReveriesData = fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.markdown'))
      .map((fileName) => {
        // Extract slug from filename (remove date prefix and extension)
        const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|markdown)$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(reveriesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        // Extract date from filename
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
        const date = dateMatch ? dateMatch[1] : '';
        
        return {
          slug,
          date,
          title: matterResult.data.title || '',
          author: matterResult.data.author || '',
          place: matterResult.data.place || '',
          flag: matterResult.data.flag || '',
          tags: matterResult.data.tags || '',
          content: matterResult.content,
          excerpt: matterResult.data.excerpt || '',
        } as Post;
      });

    // Sort reveries by date (newest first)
    return allReveriesData.sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error('Error reading reveries:', error);
    return [];
  }
}

// Format date exactly like Jekyll does
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  // Add ordinal suffix (st, nd, rd, th)
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';
  
  return `${day}${suffix} of ${month}, ${year}`;
}