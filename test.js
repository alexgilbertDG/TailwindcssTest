var Purgecss = require('purgecss');
var purgeHtml = require('purgecss-from-html');

const __ = new Purgecss({
    content: ["index.html"],
    css: ['./main.css'],
    extractors: [
        {
            extractor: purgeHtml,
            extensions: ["html"]
        }
    ]
})
const result = __.purge()

console.log(result[0].css)