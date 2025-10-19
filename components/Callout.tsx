interface CalloutProps {
  children: React.ReactNode;
  type?: 'warning' | 'info' | 'error';
}

export default function Callout({ children, type = 'warning' }: CalloutProps) {
  return (
    <div className="post-callout" data-type={type}>
      {children}
    </div>
  );
}
