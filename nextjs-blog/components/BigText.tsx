interface BigTextProps {
  children: React.ReactNode;
  size?: 'large' | 'xlarge' | 'huge';
  center?: boolean;
  italic?: boolean;
  bold?: boolean;
}

export default function BigText({ 
  children, 
  size = 'large', 
  center = true, 
  italic = false,
  bold = false 
}: BigTextProps) {
  const sizeStyles = {
    large: { fontSize: '1.6em' },
    xlarge: { fontSize: '2.6em', lineHeight: 1.2 },
    huge: { fontSize: '3.6em' }
  };

  const style = {
    ...sizeStyles[size],
    ...(center && { textAlign: 'center' as const }),
    ...(italic && { fontStyle: 'italic' }),
    ...(bold && { fontWeight: 'bold' }),
  };

  return (
    <p style={style}>
      {children}
    </p>
  );
}