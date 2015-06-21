# jc-tab-autocomplete

jcTabAutocomplete is a directive for autocompleting a POSIX path (like on a Mac) on pressing the TAB
##usage-example
 
    <div jc-tab-autocomplete ng-model="myInput"></div>
    
##explanation
In a terminal, you are used to tab autocompletion. Using this directive you get the same behaviour in an input tag.

##dependencies
The directive won't work unless you supply a back-end service. An example of a PHP implementation of such a service is included. See sample API.php.

##installation
bower install jc-tab-autocomplete
