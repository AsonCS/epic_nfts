/* eslint-disable prettier/prettier */
module.exports = {
	env: {
		browser: false,
		es2021: true,
		mocha: true,
		node: true,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'standard',
		'plugin:prettier/recommended',
		'plugin:node/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		'node/no-unsupported-features/es-syntax': [
			'error',
			{ ignores: ['modules'] },
		],
		'semi': 'error',
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true,
			},
		],
		'quotes': ['error', 'single'],
		'no-unused-vars': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'no-useless-constructor': 'off',
		'comma-dangle': 'off',
		'space-before-function-paren': 'off',
	},
}
