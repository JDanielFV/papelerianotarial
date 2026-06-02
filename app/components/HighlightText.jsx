import React from 'react';

/**
 * Renders trusted content that may contain <strong> tags.
 * Safer than raw dangerouslySetInnerHTML for our design system.
 * Only allows <strong>.
 */
export default function HighlightText({ html, className, as: Component = 'p', ...rest }) {
  // Very simple sanitizer for our known content (only <strong> and text)
  const safeHtml = (html || '').replace(/<(?!\/?(strong)\b)[^>]*>/gi, '');

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
      {...rest}
    />
  );
}
