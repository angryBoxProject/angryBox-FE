module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        es6: true,
    },
    extends: ['prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'arrow-parens': ['warn', 'as-needed'], // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
    },
};
