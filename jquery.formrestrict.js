/*
 * Every time the form field is changed, sanitize its contents with the given
 * function to only allow input of a certain form.
 */
(function ($) {
    function hasInputEvent() {
        if ("oninput" in document.body) {
            return true;
        }
        else {
        // Old versions of Firefox support oninput but have no oninput property
            var ok = false,
                handler = function(){ ok = true; };
            $(window).bind('input', handler);
            $(window).trigger('input');
            $(window).unbind('input', handler);
            return ok;
        }
    };

    jQuery.fn.restrict = function(sanitizationFunc) {
        $(this).bind(hasInputEvent() ? "input" : "keyup", function(e) {
            $(this).val(sanitizationFunc($(this).val()));
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
    }
})(jQuery);
