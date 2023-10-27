"use strict";
var _plugin = /*#__PURE__*/ _interop_require_default(require("tailwindcss/plugin"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
module.exports = (0, _plugin.default)(function containerQueries(param) {
    var matchUtilities = param.matchUtilities, matchVariant = param.matchVariant, theme = param.theme;
    var _theme;
    var values = (_theme = theme("containers")) !== null && _theme !== void 0 ? _theme : {};
    function parseValue(value) {
        var _value_match;
        var _value_match_;
        var numericValue = (_value_match_ = (_value_match = value.match(/^(\d+\.\d+|\d+|\.\d+)\D+/)) === null || _value_match === void 0 ? void 0 : _value_match[1]) !== null && _value_match_ !== void 0 ? _value_match_ : null;
        if (numericValue === null) return null;
        return parseFloat(value);
    }
    matchUtilities({
        "@container": function(value, param) {
            var modifier = param.modifier;
            return {
                "container-type": value,
                "container-name": modifier
            };
        }
    }, {
        values: {
            DEFAULT: "inline-size",
            normal: "normal"
        },
        modifiers: "any"
    });
    var sort = function(aVariant, zVariant) {
        var a = parseFloat(aVariant.value);
        var z = parseFloat(zVariant.value);
        if (a === null || z === null) return 0;
        // Sort values themselves regardless of unit
        if (a - z !== 0) return a - z;
        var _aVariant_modifier;
        var aLabel = (_aVariant_modifier = aVariant.modifier) !== null && _aVariant_modifier !== void 0 ? _aVariant_modifier : "";
        var _zVariant_modifier;
        var zLabel = (_zVariant_modifier = zVariant.modifier) !== null && _zVariant_modifier !== void 0 ? _zVariant_modifier : "";
        // Explicitly move empty labels to the end
        if (aLabel === "" && zLabel !== "") {
            return 1;
        } else if (aLabel !== "" && zLabel === "") {
            return -1;
        }
        // Sort labels alphabetically in the English locale
        // We are intentionally overriding the locale because we do not want the sort to
        // be affected by the machine's locale (be it a developer or CI environment)
        return aLabel.localeCompare(zLabel, "en", {
            numeric: true
        });
    };
    matchVariant("@", function() {
        var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", modifier = (arguments.length > 1 ? arguments[1] : void 0).modifier;
        var parsed = parseValue(value);
        return parsed !== null ? "@container ".concat(modifier !== null && modifier !== void 0 ? modifier : "", " (min-width: ").concat(value, ")") : [];
    }, {
        values: values,
        sort: sort
    });
    var maxVariantFn = function() {
        var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", modifier = (arguments.length > 1 ? arguments[1] : void 0).modifier;
        var parsed = parseValue(value);
        return parsed !== null ? "@container ".concat(modifier !== null && modifier !== void 0 ? modifier : "", " (max-width: ").concat(value, ")") : [];
    };
    matchVariant("@max", maxVariantFn, {
        values: values,
        sort: sort
    });
    matchVariant("atMax", maxVariantFn, {
        values: values,
        sort: sort
    });
}, {
    theme: {
        containers: {}
    }
});
