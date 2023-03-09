"use strict";
exports.__esModule = true;
;
var march = "3";
var MonthOMoney = /** @class */ (function () {
    function MonthOMoney(data) {
        Object.assign(this, data);
    }
    MonthOMoney.prototype.toArray = function () {
        return Object.values(this);
    };
    return MonthOMoney;
}());
var per_month = {
    "1": 2706,
    "2": 2460,
    "3": 2829,
    "4": 2460,
    "5": 2829,
    "6": 2706,
    "7": 2583,
    "8": 2829,
    "9": 2583,
    "10": 2706,
    "11": 2706,
    "12": 2583
};
var curMonth = new Date().getMonth();
console.log(curMonth);
var perMonth = {
    jan: 2706,
    feb: 2460,
    mar: 2829,
    apr: 2460,
    may: 2829,
    jun: 2706,
    jul: 2583,
    aug: 2829,
    sep: 2583,
    oct: 2706,
    nov: 2706,
    dec: 2583
};
var perMonthClass = new MonthOMoney(per_month);
console.log(perMonthClass.toArray());
function iterate(per_month) {
    var key;
    var result = [];
    for (key in per_month) {
        var value = per_month[key];
        result.push(value);
    }
    return result;
}
console.log(iterate(per_month));
