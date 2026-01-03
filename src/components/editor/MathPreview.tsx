import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathPreviewProps {
  content: string;
  className?: string;
  placeholder?: string;
}

const MathPreview: React.FC<MathPreviewProps> = ({ content, className, placeholder }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (!content && placeholder) {
        containerRef.current.innerHTML = `<span class="text-slate-300">${placeholder}</span>`;
        return;
      }

      // Simple regex to find latex segments like $...$ or $$...$$
      // This is a naive implementation. For robust rendering, we might want to split string
      // by delimiters and render parts.
      // Or we can use a library like react-latex-next, but we installed katex.

      // Let's implement a simple parser that detects $...$
      // If no math delimiters are found, we just render text.
      // But we also want to preserve newlines as <br/>

      const renderText = (text: string) => {
        // We will split by $$...$$ then $...$
        // This is complex to do perfectly manually.
        // Let's iterate through the text and render segments.

        // However, for simplicity and performance in this task, let's assume
        // we check for $ and if present, we try to use katex renderToString.

        // A better approach for mixed content:
        // Split by regex.

        const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

        return parts.map((part, index) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2);
            try {
              const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
              return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <span key={index} className="text-red-500">{part}</span>;
            }
          } else if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            try {
              const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
              return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <span key={index} className="text-red-500">{part}</span>;
            }
          } else {
            // Render regular text with line breaks
            return <span key={index} className="whitespace-pre-wrap">{part}</span>;
          }
        });
      };

      // React's render cycle handles this, but here we want to modify innerHTML if we were using vanilla js
      // Since we are in React, we can return the structure.
    }
  }, [content]);

  // We'll use the logic above directly in render
  const renderContent = () => {
    if (!content) {
      return <span className="text-slate-300 italic">{placeholder}</span>;
    }

    // Regex explanation:
    // (\$\$[\s\S]*?\$\$) -> Capture group 1: Matches $$...$$ (display math)
    // | -> OR
    // (\$[\s\S]*?\$) -> Capture group 2: Matches $...$ (inline math)
    // Note: This simple regex doesn't handle escaped dollars.
    const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2);
        try {
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch (e) {
           // Fallback
           return <span key={index}>{part}</span>;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch (e) {
           return <span key={index}>{part}</span>;
        }
      } else {
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      }
    });
  };

  return (
    <div className={`preview-content ${className} font-serif`}>
      {renderContent()}
    </div>
  );
};

export default MathPreview;
