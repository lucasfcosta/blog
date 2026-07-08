interface LawProps {
  num: string;
  title: string;
  children: React.ReactNode;
}

export default function Law({ num, title, children }: LawProps) {
  return (
    <details className="law">
      <summary className="law-summary">
        <h2 className="law-title">
          <span className="law-number">{num}</span> {title}
        </h2>
        <span className="law-toggle" aria-hidden="true"></span>
      </summary>
      <div className="law-body">{children}</div>
    </details>
  );
}
