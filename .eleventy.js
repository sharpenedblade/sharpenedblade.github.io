const sass = require("sass");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("fonts");

    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function(inputContent) {
            let result = sass.compileString(inputContent);

            return async (data) => {
                return result.css;
            };
        }
    });
};
