module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-console': 'warn',
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true, // Разрешает не указывать тип для анонимных функций
            allowHigherOrderFunctions: true, // Разрешает не указывать тип для функций высшего порядка
            allowTypedFunctionExpressions: true, // Разрешает не указывать тип, если он выводится из контекста
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:prettier/recommended', // Добавьте Prettier для HTML
      ],
      rules: {
        'prettier/prettier': [
          'warn',
          {
            tabWidth: 2,
            useTabs: false,
          },
        ],
      },
    },
  ],
};
