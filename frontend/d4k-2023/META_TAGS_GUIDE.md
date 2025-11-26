# Dynamic Meta Tags Implementation Guide

## Overview
This implementation allows you to set different Open Graph meta tags for different pages in your React SPA (Single Page Application). This is useful for customizing link previews on social media and messaging apps.

## What Was Created

### 1. Custom Hook: `useMetaTags.js`
Location: `src/hooks/useMetaTags.js`

This hook dynamically updates meta tags when a page component mounts. It manages:
- `og:title` - Page title for link preview
- `og:description` - Page description
- `og:image` - Preview image (replaces the video)
- `og:url` - Page URL
- `og:video:*` - Video meta tags (optional)

### 2. Updated Menu.js
The Menu page now uses the hook to set custom meta tags when users visit `/menu`.

## How to Use

### Basic Usage (with image)
```javascript
import { useMetaTags } from "../hooks/useMetaTags";

const MyPage = () => {
    useMetaTags({
        title: 'Page Title - D4K',
        description: 'Page description goes here',
        image: './images/menu-preview.jpg',
        url: window.location.href
    });

    return (
        // Your JSX
    );
};
```

### Usage with Video
```javascript
useMetaTags({
    title: 'D4K - Home Page',
    description: 'Christmas Charity Party',
    video: {
        url: './d4kthumbnail.mp4',
        type: 'video/mp4',
        width: '640',
        height: '380'
    },
    url: window.location.href
});
```

## Implementing on Other Pages

To add custom link previews to other pages:

1. **Import the hook** at the top of your page component:
   ```javascript
   import { useMetaTags } from "../hooks/useMetaTags";
   ```

2. **Call the hook** at the beginning of your component (before any conditional rendering):
   ```javascript
   const YourPage = () => {
       useMetaTags({
           title: 'Your Custom Title - D4K',
           description: 'Your custom description',
           image: './path/to/image.jpg',
           url: window.location.href
       });
       
       return (/* JSX */);
   };
   ```

## Current Implementation

### HomePage
- Uses default meta tags from index.html (d4kthumbnail.mp4 video)

### Menu Page
- Custom meta tags with:
  - Title: "D4K - Menu - Christmas Charity Party"
  - Description: Menu browsing description
  - Image: d4klogo2025.jpg
  - No video (uses image instead)

## How It Works

1. When a user visits a page with `useMetaTags` hook, it runs on mount
2. The hook finds or creates meta tags with the specified properties
3. It updates their `content` attributes
4. When user navigates to a different page, that page's meta tags take effect
5. Link preview services like Facebook, Twitter, Discord, etc. read these updated tags

## Important Notes

- Meta tags are read by link preview services when a link is first shared
- Changes may be cached by social platforms - you may need to clear cache or use their link debugger
- The `url` parameter should match the actual URL being shared
- For social sharing to work well, ensure preview images are at least 1200x630 pixels
- Video and image tags are mutually exclusive in most platforms (image takes precedence if both exist)

## Testing Link Previews

### Facebook/Meta
- Use: https://developers.facebook.com/tools/debug/

### Twitter
- Use: https://cards-dev.twitter.com/validator

### Discord
- Simply paste the link in Discord and see the preview

### General
- Most platforms refresh cache if you:
  1. Clear their cache via their debugging tools
  2. Share the link again after making changes
