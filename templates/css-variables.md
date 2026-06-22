# CSS Variables Reference

## Colors
| Variable            | Value       | Purpose |
|---------------------|-------------|---------|
| `--bg`              | `#0a0a0a`   | Main background |
| `--surface`         | `#111111`   | Cards and surfaces |
| `--surface2`        | `#1a1a1a`   | Elevated surfaces / headers |
| `--border`          | `#222222`   | Borders and dividers |
| `--accent`          | `#9f1239`   | Primary accent / brand color |
| `--text`            | `#ffffff`   | Primary text |
| `--text-secondary`  | `#aaaaaa`   | Secondary text |
| `--text-muted`      | `#888888`   | Muted / tertiary text |
| `--text-light`      | `#dddddd`   | Light text |

## Typography
| Variable            | Value | Purpose |
|---------------------|-------|---------|
| `--font-base`       | `16px` | Base font size (do not change) |
| `--h1`              | `clamp(...)` | Main headings |
| `--h2`              | `clamp(...)` | Section headings |
| `--h3`              | `clamp(...)` | Sub-section headings |
| `--h4`              | `clamp(...)` | Minor headings |
| `--body`            | `1.05rem` | Body text |
| `--body-large`      | `1.15rem` | Larger body text |
| `--small`           | `0.9rem` | Small text |
| `--tiny`            | `0.8rem` | Tiny text |
| `--font-primary`    | `'Space Grotesk', system-ui, sans-serif` | Main font |
| `--font-mono`       | `ui-monospace, 'Cascadia Mono', ...` | Code / monospace |

## Spacing Scale
| Variable       | Value     | Purpose |
|----------------|-----------|---------|
| `--space-xs`   | `0.5rem`  | Extra small spacing |
| `--space-sm`   | `1rem`    | Small spacing |
| `--space-md`   | `1.5rem`  | Medium spacing |
| `--space-lg`   | `2rem`    | Large spacing |
| `--space-xl`   | `3rem`    | Extra large spacing |
| `--space-2xl`  | `4rem`    | 2XL spacing |

**Usage Rule:** Always prefer these variables over hardcoded values.