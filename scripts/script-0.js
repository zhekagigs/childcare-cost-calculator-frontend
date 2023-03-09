"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.person = void 0;
var Roles;
(function (Roles) {
    Roles[Roles["ADMIN"] = 0] = "ADMIN";
    Roles[Roles["READ_ONLY"] = 1] = "READ_ONLY";
    Roles[Roles["AUTHOR"] = 2] = "AUTHOR";
})(Roles || (Roles = {}));
// objects
exports.person = {
    name: "Nick",
    age: 14,
    nickname: "Kordo",
    hobbies: ["foot", "ball"],
    role: [2, "author"],
    dayRole: Roles.ADMIN,
    job: "musician"
};
var name = exports.person.name, age = exports.person.age;
// functions
function converter(input, converter) {
    if (converter === void 0) { converter = "as-text"; }
    if (converter === "as-text") {
        return input.toString();
    }
    else {
        return +input;
    }
}
function add(n1, n2) {
    return n1 + n2;
}
function minusAndProccess(n1, n2, callback) {
    return callback(n1 - n2);
}
function double(n) {
    return n * 2;
}
var res = minusAndProccess(10, 5, double);
var combiner;
combiner = add;
converter(12, "as-text");
var Department = /** @class */ (function () {
    function Department(name, id) {
        this.name = name;
        this.id = id;
        this.employees = [];
        this.name = name;
        this.id = id;
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInformation = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Department;
}());
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, "IT", id) || this;
        _this.admins = admins;
        _this.admins = admins;
        return _this;
    }
    ITDepartment.prototype.describe = function () {
        console.log("@@@@@");
        console.log("Department ".concat(this.id, ": ").concat(this.name));
        console.log("@@@@@");
    };
    return ITDepartment;
}(Department));
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting(id, reports) {
        var _this = _super.call(this, "Accounting", id) || this;
        _this.reports = reports;
        _this.reports = reports;
        return _this;
    }
    Accounting.prototype.doCalculations = function () {
        throw new Error("Method not implemented.");
    };
    Accounting.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return (this.instance = new Accounting("d2", []));
    };
    /**throws error if property reports is empty */
    Accounting.prototype.getMostRecentReport = function () {
        if (this.reports.length === 0) {
            throw new Error("No reports found.");
        }
        return this.reports[this.reports.length - 1];
    };
    Accounting.prototype.addReport = function (text) {
        this.reports.push(text);
    };
    Accounting.prototype.printReports = function () {
        console.log(this.reports);
    };
    /**overriding method from parent class */
    Accounting.prototype.describe = function () {
        console.log("@@@@@");
        console.log("Department ".concat(this.id, ": ").concat(this.name));
        console.log("Reports: ".concat(this.reports));
        console.log("@@@@@");
    };
    return Accounting;
}(Department));
var itDep = new ITDepartment("d1", ["Nick", "Kordo"]);
itDep.addEmployee("Nick");
itDep.addEmployee("Kordo");
itDep.describe();
var accounting = Accounting.getInstance();
accounting.addReport("Something went wrong...");
accounting.addEmployee("Beth");
accounting.addEmployee("Rick");
// accounting.printReports();
// accounting.describe();
var emptyAccounting = Accounting.getInstance(); // returns the same instance as accounting
var lastReport = emptyAccounting.getMostRecentReport();
emptyAccounting.describe();
console.log(lastReport);
var Persona = /** @class */ (function () {
    function Persona(n) {
        this.name = n;
        this.id = "2a123";
    }
    Persona.prototype.greet = function (phrase) {
        console.log("".concat(phrase, " ").concat(this.name));
    };
    return Persona;
}());
var user1;
user1 = new Persona("Nick");
var iAdd;
iAdd = function (addend, summand) {
    return addend + summand;
};
var iMult = function (factor, multiplier) {
    return factor * multiplier;
};
function operation(a, b, fn) {
    return fn(a, b);
}
operation(4, 5, iAdd);
operation(3, 2, iMult);
var Orc = /** @class */ (function () {
    function Orc() {
    }
    Orc.prototype.battleCry = function (phrase) {
        phrase.toLocaleUpperCase();
        console.log("$( phrase.toUpper )");
    };
    return Orc;
}());
//Generics
var names = [];
var msgs = [];
var fns = [];
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver() {
    }
    ConcreteObserver.prototype.Update = function (state) {
        console.log("Observer updated:" + state);
    };
    return ConcreteObserver;
}());
var ConcreteObserver2 = /** @class */ (function () {
    function ConcreteObserver2() {
    }
    ConcreteObserver2.prototype.Update = function (state) {
        console.log("Observer2 updated" + state);
    };
    return ConcreteObserver2;
}());
var ConcreteSubscriper = /** @class */ (function () {
    function ConcreteSubscriper() {
    }
    ConcreteSubscriper.prototype.Update = function (state) {
        console.log("Subscriper updated" + state);
    };
    return ConcreteSubscriper;
}());
var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        this.observers = [];
        this.state = 0;
    }
    ConcreteSubject.prototype.setState = function (sta) {
        this.state = sta;
        this.Notify();
    };
    ConcreteSubject.prototype.Add = function (obs) {
        this.observers.push(obs);
    };
    ConcreteSubject.prototype.Remove = function (obs) {
        this.observers = this.observers.filter(function (observer) { return observer !== obs; });
    };
    ConcreteSubject.prototype.Notify = function () {
        var _this = this;
        this.observers.forEach(function (observer) { return observer.Update(_this.state); });
    };
    return ConcreteSubject;
}());
var subject = new ConcreteSubject();
var observer = new ConcreteObserver();
var observer2 = new ConcreteObserver2();
var subscriper = new ConcreteSubscriper();
subject.Add(observer);
subject.Add(observer2);
subject.Add(subscriper);
subject.Notify();
subject.setState(1214124);
var MyIteratorClass = /** @class */ (function () {
    function MyIteratorClass(data) {
        this._index = 0;
        this._data = [];
        this._data = data;
    }
    MyIteratorClass.prototype.next = function () {
        var result = this._data[this._index];
        this._index++;
        if (this._index <= this._data.length) {
            return { value: result, done: false };
        }
        else {
            return { value: null, done: true };
        }
    };
    return MyIteratorClass;
}());
var someData = ["one", "two", "three"];
var iterable = new MyIteratorClass(someData);
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
function iterate(per_month) {
    var key;
    for (key in per_month) {
        var value = per_month[key];
        console.log(key, per_month[key]);
    }
}
