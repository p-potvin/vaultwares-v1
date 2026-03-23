import i18n from '../i18n';
import { BlogPost } from '../types/blog';

/**
 * Retrieves all blog posts for the currently selected language from the i18n resources.
 * It assumes the 'posts' object exists in the translation files.
 * @returns {BlogPost[]} An array of blog posts, sorted by date descending.
 */
export const getAllPosts = (): BlogPost[] => {
    // Get the entire 'posts' object for the current language.
    // Using { returnObjects: true } is key here.
    const postsData = i18n.t('posts', { returnObjects: true }) as Record<string, Omit<BlogPost, 'id'>>;

    // Handle cases where translations might be missing or i18n hasn't loaded
    if (!postsData || typeof postsData !== 'object') {
        return [];
    }

    const posts = Object.entries(postsData).map(([id, postData]) => ({
        id,
        ...postData,
    }));

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};