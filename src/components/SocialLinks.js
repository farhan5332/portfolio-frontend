// Social links from the About document: [{ platform: 'github', url: 'https://...' }]
const LABELS = { github: 'GitHub', linkedin: 'LinkedIn', x: 'X', twitter: 'Twitter', youtube: 'YouTube' };

const label = (platform) =>
  LABELS[platform.toLowerCase()] ?? platform.charAt(0).toUpperCase() + platform.slice(1);

export default function SocialLinks({ socials = [], className = '' }) {
  if (!socials?.length) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-5 ${className}`}>
      {socials.map((social) => (
        <li key={social.url}>
          <a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
            {label(social.platform)}
          </a>
        </li>
      ))}
    </ul>
  );
}
