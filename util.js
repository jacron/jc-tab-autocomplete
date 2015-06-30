/**
 * Dependent on: a simpel local or remote service
 * to get files in a directory. The service gets a path and then
 * returns a list of files. Each file
 * has two fields: name and type.
 * Type = dir|file.
 * Name = just the file name (not the path).
 *
 *
 * Created by orion on 30-06-15.
 */
'use strict';

angular.module('jcTabAutocompleteModule')

    .service("Util", function($http) {
        var remoteForDir = 'http://acservice';

        /**
         * This API call gets all files in a dir
         * that don't start with a dot.
         *
         * @returns {*}
         * @param path
         */
        this.getFromDir = function (path) {
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

        /**
         * Returns the part of a string before the last slash.
         *
         * @param {string} s The string
         * @returns {*}
         */
        this.stripAfterSlash = function (s) {
            var pos = s.lastIndexOf('/');

            if (pos === -1 || pos === s.length - 1) {
                return s;
            }
            return s.substr(0, pos + 1);
        };

        /**
         * Returns the part of a string after the last slash.
         *
         * @param {string} s The string
         * @returns {*}
         */
        this.stripBeforeSlash = function (s) {
            var pos = s.lastIndexOf('/');

            if (pos === -1) {
                return s;
            }
            return s.substr(pos + 1);
        };

    });