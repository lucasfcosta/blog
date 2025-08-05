import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  maxHeight?: number;
  marginBottom?: number;
  href?: string;
}

export default function BlogImage({ 
  src, 
  alt, 
  caption, 
  maxHeight, 
  marginBottom = -18,
  href 
}: BlogImageProps) {
  const imageStyle = {
    marginBottom: `${marginBottom}px`,
    ...(maxHeight && { maxHeight: `${maxHeight}px` }),
  };

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
        ...imageStyle,
      }}
      unoptimized // Required for static export
    />
  );

  const content = href ? (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="image-link"
    >
      {imageElement}
    </a>
  ) : imageElement;

  return (
    <div className="blog-image">
      {content}
      {caption && (
        <div style={{ 
          fontSize: '0.8em', 
          marginBottom: '32px', 
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}