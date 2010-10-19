/* These functions require the jquery.formrestrict.js functions to work!
 *
 * These functions can be used to replace the functionality of the jQuery
 * AlphaNumeric plugin. The usage of this plugin is almost identical to that of
 * the AlphaNumeric plugin.
 */

(function ($) {
    jQuery.fn.alphanumeric = function(r) {
        alphanumericHelper(this, r, true, true);
    };
    jQuery.fn.numeric = function(r) {
        alphanumericHelper(this, r, false, true);
    };
    jQuery.fn.alpha = function(r) {
        alphanumericHelper(this, r, true, false);
    };
    var alphanumericHelper = function(obj, restraints, alpha, numeric) {
        var regex = "";
        if (numeric)
            regex += "0-9";
        if (alpha) {
            if (restraints == undefined || !restraints.allcaps)
                regex += "a-z";
            if (restraints == undefined || !restraints.nocaps)
                regex += "A-Z";
        }
        if (restraints != undefined && restraints.allow != undefined)
            regex += RegExp.escape(restraints.allow);

        $(obj).regexRestrict(RegExp("[^"+regex+"]", "g"))
    };
})(jQuery);

/*
 * Function created by Colin Snover in response to an article by Simon Willison
 * on Regular Expression escaping in JavaScript:
 * http://simonwillison.net/2006/Jan/20/escape/
 */
RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
