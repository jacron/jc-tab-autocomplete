/**
 * Service for jcTabAutocomplete.
 *
 * Give me a path, and I will try and complete it.
 * (Terminal-style, files only)
 *
 * Created by orion on 20-06-15.
 */
'use strict';

angular.module('jcTabAutocompleteModule')

    .service("Autocomplete", function(Util) {

        this.selectCommonMatch = function(files, count) {
            var first = files[0].name,
                to_match;
            
            if (first.length < count) {
                return false;
            }
            to_match = first.substr(0, count);

            for (var i = 0; i < files.length; i++) {
                var match = files[i].name;

                if (match.length < count) {
                    return false;
                }
                if (match.substr(0, count).indexOf(to_match) !== 0) {
                    return false;
                }
            }
            return to_match;
        };

        this.selectCommonMatches = function(files) {
            var matched,
                savedMatch = false,
                count = 1;  // start with one letter

            // Find the largest first string part that all matches have in common
            do {
                matched = this.selectCommonMatch(files, count);
                
                // there always is an end to this search
                if (!matched) { // end of the search
                    if (!savedMatch) {
                        // nothing found
                        return null;
                    }
                    else {
                        return {
                            name: savedMatch,
                            type: 'unknown'
                        };
                    }
                }
                savedMatch = matched;
                count++;
            } while (matched);
            return null;
        };

        this.selectMatches = function(matches) {
            if (matches.length === 0) {
                // Nothing found
                return null;
            }
            if (matches.length === 1) {
                // Just one found
                return matches[0];
            }
            // Several found
            return this.selectCommonMatches(matches);
        };

        this.find = function(files, to_match) {
            var matches = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].name.indexOf(to_match) === 0) {
                    matches.push(files[i]);
                }
            }
            return this.selectMatches(matches);
        };

        /**
         * Find a (part of a) file for completion
         * 
         * @param {string} input
         * @returns {*} the input plus the completion, or null
         */
        this.autoComplete = function(input) {
            var to_match = Util.stripBeforeSlash(input),
                path = Util.stripAfterSlash(input),
                files,
                file,
                completed = null;

            return Util.getFromDir(path).then(function(data){
                if (!data || typeof data === 'string') {
                    files = [];
                }
                else {
                    files = data;
                }
                file = this.find(files, to_match);
                if (file) {
                    completed = path + file.name;
                    if (file.type === 'dir') {
                        completed += '/';
                    }
                }
                return completed;
            }.bind(this));
        };
    });