/*
 * Every time the form field is changed, sanitize its contents with the given
 * function to only allow input of a certain form.
 */
jQuery.fn.restrict = function(sanitizationFunc) {
    $(this).bind($.browser.msie ? "keyup" : "input", function(e) {
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
