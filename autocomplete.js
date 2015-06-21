/**
 * Service for jcTabAutocomplete.
 *
 * Give me a path, and I will try and complete it.
 * (Terminal-style)
 *
 * Dependent on: a simpel local or remote service
 * to get files in a directory. The service gets a path and then
 * returns a list of files. Each file
 * has two fields: name and type.
 * Type = dir|file.
 * Name = just the file name (not the path).
 *
 * NB This file contains the module declaration voor jcDirectives.
 *
 * Created by orion on 20-06-15.
 */
'use strict';

angular.module('jcTabAutocompleteModule')

    .service("Autocomplete", function($http) {
        var auto = this;

        var remoteForDir = 'http://acservice';

        /**
         * This API call gets all files in a dir
         * that don't start with a dot.
         *
         * @returns {*}
         * @param path
         */
        auto.getFromDir = function(path) {
            var req = $http.get(remoteForDir, {
                params: {
                    req: 'allfiles',
                    path: path
                }
            });
            return req.then(function (res) {
                    return res.data;
                },
                function (res) {
                    //console.log(res);
                });

        };

        auto.stripAfterSlash = function(s) {
            var pos = s.lastIndexOf('/');

            if (pos === -1 || pos === s.length - 1) {
                return s;
            }
            return s.substr(0, pos + 1);
        };

        auto.stripBeforeSlash = function(s) {
            var pos = s.lastIndexOf('/');

            if (pos === -1) {
                return s;
            }
            return s.substr(pos + 1);
        };

        auto.selectCommonMatch = function(files, count) {
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

        auto.selectCommonMatches = function(files) {
            var matched,
                savedMatch = false,
                count = 1;  // start with one letter

            // Find the largest first string part that all matches have in common
            do {
                matched = auto.selectCommonMatch(files, count);
                
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

        auto.selectMatches = function(matches) {
            if (matches.length === 0) {
                // Nothing found
                return null;
            }
            if (matches.length === 1) {
                // Just one found
                return matches[0];
            }
            // Several found
            return auto.selectCommonMatches(matches);
        };

        auto.find = function(files, to_match) {
            var matches = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].name.indexOf(to_match) === 0) {
                    matches.push(files[i]);
                }
            }
            return auto.selectMatches(matches);
        };

        auto.autoComplete = function(invoer) {
            var to_match = auto.stripBeforeSlash(invoer),
                path = auto.stripAfterSlash(invoer),
                files,
                file,
                completed = null;

            return auto.getFromDir(path).then(function(data){
                if (!data || typeof data === 'string') {
                    files = [];
                }
                else {
                    files = data;
                }
                file = auto.find(files, to_match);
                if (file) {
                    completed = path + file.name;
                    if (file.type === 'dir') {
                        completed += '/';
                    }
                }
                return completed;
            });
        };
    });