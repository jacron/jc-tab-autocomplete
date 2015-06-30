# jc-tab-autocomplete

jcTabAutocomplete is a angular directive for autocompleting a POSIX path (like on a Mac) on pressing the TAB
##usage-example
 
    <div jc-tab-autocomplete ng-model="myInput"></div>
    
##explanation
In a terminal, you are used to tab autocompletion. 
Using this directive you get the same behaviour in an input tag.
If you press tab and there is only one file/directory that has the starting letters 
that you typed, this one
will be added to the path that you type. If there are more than one, only the letters that
match will be added.

This is a simple version. Only a path will be autocompleted. 
Spaces are accepted without double quotes (no backslashes are expected or added).

##dependencies
The directive won't work unless you supply a back-end service. 
An example of a PHP implementation of such a service is included. See index.php.
Use PHP 5.

##version
0.3
 
- changed names of some files

- new file: util

0.4 

- renamed util to tabutil

##installation
    bower install jc-tab-autocomplete

Include these three files in your webpage:

- app.js, module declaration

- tabautocomplete.js, the directive

- service.js, the real work

- util.js, the API call and some utility methods

Add the module as a dependency to your aplication, e.g.

    angular.module('myApp', [
        'jcTabAutocompleteModule'
    ]);

For the demo to work, install acservice as a vhost.
http://acservice should serve index.php.
Then go to http://acservice in your browser. If you see a usage page, jc-tab-autocomplete should work fine.