# Final performance changes

No public design, copy, page structure, or visual placement was intentionally changed.

- Fixed the Marathon filter so it shows only OMT Beirut Marathon and Prague Marathon.
- Reduced film sampling from 30 fps to 15 fps while keeping smooth canvas interpolation.
- Reduced total responsive frame files from 904 to 454.
- Removed the system that downloaded every film frame in the background.
- Added directional, on-demand frame loading around the current scroll position.
- Added sparse anchors for responsive fast scrolling without full-sequence downloads.
- Reduced decoded-frame memory limits.
- Re-encoded fallback MP4s into much smaller H.264 files with frequent keyframes.
- Added low-bandwidth MP4 fallback for Data Saver and 2G-class connections.
- Delayed Scene 2 and Scene 3 media loading until they approach the viewport.
- Lazy-loaded non-critical backdrop and map images.
- Split lightweight homepage metrics from the 52-entry race archive.
- Added route preloading only when the visitor hovers, focuses, or touches a navigation link.
- Versioned optimized frame and MP4 URLs to prevent browsers from serving the previous cached media.
