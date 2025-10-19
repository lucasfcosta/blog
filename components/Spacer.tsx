interface SpacerProps {
  size?: 'small' | 'medium' | 'large';
  height?: number;
}

export default function Spacer({ size = 'medium', height }: SpacerProps) {
  let spacingHeight = '1rem';

  if (height) {
    spacingHeight = `${height}px`;
  } else {
    switch (size) {
      case 'small':
        spacingHeight = '0.5rem';
        break;
      case 'medium':
        spacingHeight = '1rem';
        break;
      case 'large':
        spacingHeight = '2rem';
        break;
    }
  }

  return <div style={{ height: spacingHeight }} />;
}
