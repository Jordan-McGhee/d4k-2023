import { useEffect } from 'react';

/**
 * Custom hook to dynamically update Open Graph meta tags
 * @param {Object} metaData - Object containing meta tag data
 * @param {string} metaData.title - Page title (og:title)
 * @param {string} metaData.description - Page description
 * @param {string} metaData.image - Image URL for og:image
 * @param {string} metaData.url - Page URL for og:url
 * @param {Object} metaData.video - Video object with url, type, width, height
 */
export const useMetaTags = (metaData) => {
    useEffect(() => {
        // Update document title
        if (metaData.title) {
            document.title = metaData.title;
        }

        // Update or create meta tags
        const updateMetaTag = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        if (metaData.title) updateMetaTag('og:title', metaData.title);
        if (metaData.description) updateMetaTag('og:description', metaData.description);
        if (metaData.image) updateMetaTag('og:image', metaData.image);
        if (metaData.url) updateMetaTag('og:url', metaData.url);

        // Handle video meta tags
        if (metaData.video) {
            updateMetaTag('og:video:url', metaData.video.url);
            updateMetaTag('og:video:secure_url', metaData.video.url);
            if (metaData.video.type) updateMetaTag('og:video:type', metaData.video.type);
            if (metaData.video.width) updateMetaTag('og:video:width', metaData.video.width);
            if (metaData.video.height) updateMetaTag('og:video:height', metaData.video.height);
        }

        // Cleanup: restore default meta tags on unmount
        return () => {
            // Restore default values if needed
        };
    }, [metaData]);
};
