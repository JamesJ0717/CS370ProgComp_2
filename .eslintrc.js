module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "indent": ["error", 4],
        "space-before-function-paren": ["error", "always"],
        "semi": ["error", "never"],
        "new-cap": ["error", {
            "newIsCap": true,
            "capIsNew": false
        }],
        "require-jsdoc": "never"
    },
    "parserOptions": {
        sourceType: "module"
    }
};