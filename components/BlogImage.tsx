import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  maxHeight?: number;
}

export default function BlogImage({
  src,
  alt,
  caption,
  maxHeight = 600,
}: BlogImageProps) {
  // All images are clickable for enlargement by default
  const content = (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="image-link"
      title="Click to enlarge"
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: `${maxHeight}px`,
          objectFit: 'contain',
        }}
        unoptimized
      />
    </a>
  );

  return (
    <div
      className="blog-image"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {content}
      {caption && (
        <div
          style={{
            fontSize: '0.8em',
            marginTop: '4px',
            marginBottom: '32px',
            textAlign: 'center',
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
