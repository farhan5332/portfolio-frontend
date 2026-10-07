import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { assetUrl } from '@/lib/api';

// Renders Markdown written in the admin panel. react-markdown ignores raw HTML,
// so content can never inject scripts into the page.
const components = {
  img: ({ node, src, alt, ...props }) => <img src={assetUrl(src)} alt={alt ?? ''} loading="lazy" {...props} />,
  a: ({ node, href = '', children, ...props }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    ),
};

export default function Markdown({ children, className = '' }) {
  if (!children) return null;

  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
