/* eslint-disable @typescript-eslint/no-explicit-any */
// Rehype plugin: turn fenced ```diff blocks into per-line rows so they can be
// styled GitHub-style (green additions / red deletions). Runs BEFORE
// rehype-highlight and strips the `language-diff` class so highlight.js leaves
// it alone. next-mdx-remote v6 does not apply `components` overrides to
// markdown-generated <pre>, so we rewrite the hast tree directly here.

function nodeText(node: any): string {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('');
  return '';
}

function classList(el: any): string[] {
  const c = el?.properties?.className;
  if (Array.isArray(c)) return c.map(String);
  if (typeof c === 'string') return c.split(/\s+/).filter(Boolean);
  return [];
}

function parseLine(line: string): { kind: 'add' | 'del' | 'ctx'; marker: string; text: string } {
  const ch = line.charAt(0);
  if (ch === '+' || ch === '-') {
    let rest = line.slice(1);
    if (rest.startsWith(' ')) rest = rest.slice(1); // drop the marker's trailing space
    return { kind: ch === '+' ? 'add' : 'del', marker: ch, text: rest };
  }
  return { kind: 'ctx', marker: '', text: line };
}

function span(className: string[], value: string) {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className },
    children: [{ type: 'text', value }],
  };
}

function transformDiff(pre: any, code: any): void {
  const raw = nodeText(code).replace(/\n+$/, '');
  const lines = raw.split('\n');
  code.properties = { ...(code.properties || {}), className: ['diff-code'] };
  code.children = lines.map((line) => {
    const { kind, marker, text } = parseLine(line);
    return {
      type: 'element',
      tagName: 'span',
      properties: { className: ['diff-line', `diff-${kind}`] },
      children: [
        span(['diff-gutter'], marker || ' '),
        span(['diff-text'], text.length ? text : ' '),
      ],
    };
  });
  pre.properties = {
    ...(pre.properties || {}),
    className: [...classList(pre), 'diff-block'],
  };
}

function walk(node: any): void {
  if (!node || !Array.isArray(node.children)) return;
  for (const child of node.children) {
    if (child.type === 'element' && child.tagName === 'pre') {
      const code = child.children?.find(
        (c: any) => c.type === 'element' && c.tagName === 'code'
      );
      if (code && classList(code).some((c) => c.includes('language-diff'))) {
        transformDiff(child, code);
        continue;
      }
    }
    if (child.type === 'element' || child.type === 'root') walk(child);
  }
}

export default function rehypeDiff() {
  return (tree: any) => {
    walk(tree);
  };
}
