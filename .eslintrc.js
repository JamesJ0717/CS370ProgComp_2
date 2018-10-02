module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "indent": ["error", 4, {
            "MemberExpression": "off",
            "ObjectExpression": "off",
            "CallExpression": "off"
        }],
        "space-before-function-paren": ["error", "always"],
        "semi": ["error", "never"],
        "new-cap": ["error", {
            "newIsCap": true,
            "capIsNew": false
        }]
    },
    "parserOptions": {
        sourceType: "module"
    }
};