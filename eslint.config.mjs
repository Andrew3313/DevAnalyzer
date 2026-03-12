import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import { defineConfig } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'
import importX from 'eslint-plugin-import-x'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

export default defineConfig([
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			'import-x': importX,
			boundaries
		},
		rules: {
			'import-x/no-unresolved': 'error',
			'import-x/no-cycle': ['error', { maxDepth: 1 }],
			'import-x/no-duplicates': 'error',
			'import-x/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'type'
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [
						{
							pattern: 'shared/**',
							group: 'internal',
							position: 'after'
						},
						{
							pattern: 'entities/**',
							group: 'internal',
							position: 'after'
						},
						{
							pattern: 'features/**',
							group: 'internal',
							position: 'before'
						},
						{
							pattern: 'widgets/**',
							group: 'internal',
							position: 'before'
						},
						{
							pattern: 'app/**',
							group: 'internal',
							position: 'before'
						}
					],
					pathGroupsExcludedImportTypes: ['builtin', 'external']
				}
			],

			'boundaries/element-types': [
				'error',
				{
					default: 'disallow',
					rules: [
						{
							from: 'app',
							allow: [
								'widgets',
								'features',
								'entities',
								'shared'
							],
							disallow: ['app'],
							message:
								'Architecture rule: "app" can only import from widgets, features, entities and shared.'
						},
						{
							from: 'widgets',
							allow: ['features', 'entities', 'shared'],
							disallow: ['widgets', 'app'],
							message:
								'Architecture rule: "widgets" can only import from features, entities and shared. Importing within "widgets" is forbidden.'
						},
						{
							from: 'features',
							allow: ['entities', 'shared'],
							disallow: ['features', 'widgets', 'app'],
							message:
								'Architecture rule: "features" can only import from entities and shared. Importing within "features" is forbidden.'
						},
						{
							from: 'entities',
							allow: ['shared'],
							disallow: [
								'entities',
								'features',
								'widgets',
								'app'
							],
							message:
								'Architecture rule: "entities" can only import from shared. Importing within "entities" is forbidden.'
						},
						{
							from: 'shared',
							allow: ['shared'],
							disallow: [
								'entities',
								'features',
								'widgets',
								'app'
							],
							message:
								'Architecture rule: "shared" can only import from other shared modules (internal utilities/components).'
						}
					]
				}
			]
		},
		settings: {
			'import-x/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json'
				},
				node: {
					extensions: ['.ts', '.tsx']
				}
			},

			'boundaries/elements': [
				{ type: 'app', pattern: 'src/app/*' },
				{ type: 'widgets', pattern: 'src/widgets/*' },
				{ type: 'features', pattern: 'src/features/*' },
				{ type: 'entities', pattern: 'src/entities/*' },
				{ type: 'shared', pattern: 'src/shared/*' }
			]
		},
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts'
		]
	}
])
