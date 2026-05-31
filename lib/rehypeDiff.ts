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

function lineKind(line: string): 'add' | 'del' | 'ctx' {
  const ch = line.charAt(0);
  if (ch === '+') return 'add';
  if (ch === '-') return 'del';
  return 'ctx';
}

function transformDiff(pre: any, code: any): void {
  const raw = nodeText(code).replace(/\n+$/, '');
  const lines = raw.split('\n');
  code.properties = { ...(code.properties || {}), className: ['diff-code'] };
  code.children = lines.map((line) => ({
    type: 'element',
    tagName: 'span',
    properties: { className: ['diff-line', `diff-${lineKind(line)}`] },
    children: [{ type: 'text', value: line.length ? line : ' ' }],
  }));
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
