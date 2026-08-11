#!/usr/bin/env node
/**
 * Scan a post for AI writing tells.
 *
 *   node .claude/skills/avoid-ai-writing/scan.js posts/en/some-post.md
 *
 * Strips YAML frontmatter and fenced code blocks first: the skill treats code
 * and quoted material as flag-don't-fix, and mermaid diagrams would otherwise
 * pollute the vocabulary statistics.
 *
 * The detector only sees what a regex can see. It does not catch the tells that
 * matter most in long-form posts — negation pivots ("It is not X. It is Y."),
 * bold-label paragraph leads, uniform rhythm. Read SKILL.md and judge those by
 * hand; this is the mechanical half.
 *
 * Note for Hungarian posts: the word tables and the function-word entropy
 * signal are English-tuned. Structural findings still apply; vocabulary and
 * entropy findings do not.
 */
const fs = require('node:fs');
const path = require('node:path');
const AIDetector = require(path.join(__dirname, 'detector', 'patterns.js'));

const file = process.argv[2];
if (!file) {
  console.error('usage: scan.js <file.md>');
  process.exit(2);
}

const raw = fs.readFileSync(file, 'utf8');
const text = raw
  .replace(/^---[\s\S]*?\n---\n/, '')
  .replace(/```[\s\S]*?```/g, '');

const result = AIDetector.analyzeText(text);

console.log(`${file}`);
console.log(`  score      ${result.score} (${result.label})`);
console.log(`  class      ${result.document_classification}`);
console.log(`  human      ${(result.class_probabilities.human * 100).toFixed(1)}%`);
console.log(`  words      ${result.stats.wordCount}`);

if (!result.issues.length) {
  console.log('  issues     none');
} else {
  console.log(`  issues     ${result.issues.length}`);
  for (const issue of result.issues) {
    console.log(`    [${issue.severity}] ${issue.type}: ${issue.text}`);
    if (issue.suggestion) console.log(`             -> ${issue.suggestion}`);
  }
}

process.exit(result.document_classification === 'HUMAN_ONLY' ? 0 : 1);
