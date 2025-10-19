interface YouTubeProps {
  id: string;
  start?: number;
  width?: number;
  height?: number;
  title?: string;
}

export default function YouTube({
  id,
  start,
  width = 560,
  height = 315,
  title = 'YouTube video',
}: YouTubeProps) {
  const startParam = start ? `?start=${start}` : '';
  const src = `https://www.youtube.com/embed/${id}${startParam}`;

  return (
    <div style={{ textAlign: 'center', margin: '2em 0' }}>
      <iframe
        width={width}
        height={height}
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          maxWidth: '100%',
          height: 'auto',
          aspectRatio: '16/9',
        }}
      />
    </div>
  );
}
