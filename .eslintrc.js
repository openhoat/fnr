const baseDir = __dirname

module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['src/back/test/**/*.[jt]s', 'src/front/test/**/*.spec.[jt]s'],
      rules: {
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      extends: ['plugin:playwright/playwright-test'],
      files: ['src/front/test/**/*.spec.[jt]s'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 12,
    project: ['./src/tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: baseDir,
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'sonarjs',
    'sort-keys-shorthand',
  ],
  root: true,
  rules: {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        classes: ['public-static-field', 'public-instance-method'],
        default: ['signature', 'field', 'method'],
      },
    ],
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-template-curly-in-string': 'error',
    'prefer-template': 'error',
    'require-await': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sonarjs/elseif-without-else': 'error',
    'sonarjs/no-inverted-boolean-check': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-keys-shorthand/sort-keys-shorthand': [
      'error',
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
        shorthand: 'first',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
