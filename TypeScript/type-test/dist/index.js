"use strict";
var Single = /** @class */ (function () {
    function Single(name) {
        this.name = '';
        this.name = name;
    }
    Single.getInctance = function () {
        if (!Single.instance)
            Single.instance = new Single('singleton');
        return Single.instance;
    };
    return Single;
}());
var single = Single.getInctance();
console.log(single);
