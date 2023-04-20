const sass = require("sass");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("styles");

    eleventyConfig.addTemplateFormats("scss");
};
