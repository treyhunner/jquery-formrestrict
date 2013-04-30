/*
 * Every time the form field is changed, sanitize its contents with the given
 * function to only allow input of a certain form.
 */
(function ($) {
    'use strict';

    var inputEvents = "input";
    if (!("oninput" in document || "oninput" in $("<input>")[0])) {
        inputEvents += " keypress keyup";
    }

    jQuery.fn.restrict = function(sanitizationFunc) {

        return this.each(function(){
            // the element(s) to be restricted
            var $this = $(this);

            $this.bind(inputEvents, function() {
                var val = $this.val();
                var sanitizedVal = sanitizationFunc(val);

                if (val !== sanitizedVal) {
                    $this.val(sanitizedVal);
                }
            });
        });
    };

    /*
     * Every time the form field is changed, modify its contents by eliminating
     * matches for the given regular expression within the field.
     */
    jQuery.fn.regexRestrict = function(regex){
        var sanitize = function(text) {
            return text.replace(regex, '');
        };
        $(this).restrict(sanitize);
    };
})(jQuery);
