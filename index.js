var gutil = require("gulp-util");
var through = require("through2");
var escapeRegexp = require('lodash.escaperegexp');

module.exports = function (tags) {

    var startTag = tags.startTag;
    var endTag = tags.endTag;

    return through.obj(transform);

    function transform(file, enc, callback) {
        var text = file.contents.toString();

        var blocks = findAllDebugBlocks(startTag, endTag, text);

        if (blocks.length > 0) {
            blocks.reverse().forEach(function (indexes) {
                text = text.substring(0, indexes[0] - 1) + text.substring(indexes[1] + 12);
            });

            file.contents = new Buffer(text);
            this.push(file);
        }
        callback();
    };

    function findAllDebugBlocks(tagStart, tagEnd, text) {
        var blocks = [];
        var startTags = findAllIndexes(tagStart, text);
        var endTags = findAllIndexes(tagEnd, text);

        if (startTags.length !== endTags.length) {
            throw "Uneven amount of start and end tags detected!";
        }

        for (var x = 0; x < startTags.length; x++) {
            blocks.push([startTags[x], endTags[x]]);
        }

        return blocks;
    }

    function findAllIndexes(expression, text) {
        var match = null;
        var indexes = [];
        var expr = "(\/\/" + escapeRegexp(expression) + ")";
        var re = new RegExp(expr, "g");
        while ((match = re.exec(text)) !== null) {
            indexes.push(match.index);
        }
        return indexes;
    }

}
