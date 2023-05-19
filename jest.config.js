/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
};
