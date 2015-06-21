# jc-tab-autocomplete

jcTabAutocomplete is a angular directive for autocompleting a POSIX path (like on a Mac) on pressing the TAB
##usage-example
 
    <div jc-tab-autocomplete ng-model="myInput"></div>
    
##explanation
In a terminal, you are used to tab autocompletion. Using this directive you get the same behaviour in an input tag.

##dependencies
The directive won't work unless you supply a back-end service. An example of a PHP implementation of such a service is included. See index.php.

##installation
    bower install jc-tab-autocomplete

Include these three files in your webpage:

- jcdirectives.js

- autocomplete.js

- tabautocomplete.js

Add the module as a dependency to your aplication, e.g.

    angular.module('myApp', [
        'jcTabAutocompleteModule'
    ]);

For the demo to work, install acservice as a vhost.
http://acservice should serve index.php.
Then go to http://acservice in your browser. If you see a usage page, jc-tab-autocomplete should work fine.