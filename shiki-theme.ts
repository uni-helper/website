/**
 * Shiki theme that resolves through the design system's code tokens. One theme
 * is used for both modes; the tokens change with the page theme, so the code
 * palette stays audited without duplicating hex values here.
 */
export const uniHelperShikiTheme = {
  name: 'uni-helper',
  type: 'dark',
  colors: {
    'editor.background': 'var(--code-bg)',
    'editor.foreground': 'var(--code-fg)',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--code-muted)' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'variable.function',
        'meta.function-call',
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
      ],
      settings: { foreground: 'var(--code-function)' },
    },
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
        'keyword.operator.new',
        'storage',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: 'var(--code-keyword)' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'string.regexp',
        'string.other',
        'string.unquoted',
      ],
      settings: { foreground: 'var(--code-string)' },
    },
    {
      scope: [
        'constant',
        'constant.numeric',
        'constant.language',
        'constant.character',
        'constant.other',
      ],
      settings: { foreground: 'var(--code-number)' },
    },
    {
      scope: [
        'variable',
        'variable.other',
        'variable.parameter',
        'variable.other.readwrite',
        'meta.object-literal.key',
        'support.type.property-name',
      ],
      settings: { foreground: 'var(--code-variable)' },
    },
    {
      scope: [
        'punctuation',
        'punctuation.separator',
        'punctuation.definition',
        'keyword.operator',
        'meta.brace',
      ],
      settings: { foreground: 'var(--code-punctuation)' },
    },
  ],
}
