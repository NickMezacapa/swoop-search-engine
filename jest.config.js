/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
};
