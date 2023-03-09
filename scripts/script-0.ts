import { RandomUUIDOptions } from "crypto";

enum Roles {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
// objects
export const person = {
  name: "Nick",
  age: 14,
  nickname: "Kordo",
  hobbies: ["foot", "ball"],
  role: [2, "author"],
  dayRole: Roles.ADMIN,
  job: "musician",
};

const { name, age } = person;

// functions
function converter(
  input: number | string,
  converter: "as-text" | "as-number" = "as-text"
) {
  if (converter === "as-text") {
    return input.toString();
  } else {
    return +input;
  }
}

function add(n1: number, n2: number): number {
  return n1 + n2;
}

function minusAndProccess(
  n1: number,
  n2: number,
  callback: (num: number) => number
) {
  return callback(n1 - n2);
}

function double(n: number): number {
  return n * 2;
}

let res = minusAndProccess(10, 5, double);

let combiner: (a: number, b: number) => number;
combiner = add;
converter(12, "as-text");

abstract class Department {
  protected employees: string[] = [];

  constructor(public name: string, protected readonly id: string) {
    this.name = name;
    this.id = id;
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super("IT", id);
    this.admins = admins;
  }

  describe(this: ITDepartment): void {
    console.log("@@@@@");
    console.log(`Department ${this.id}: ${this.name}`);
    console.log("@@@@@");
  }
}

class Accounting extends Department {
  private static instance: Accounting;

  private constructor(id: string, private reports: string[]) {
    super("Accounting", id);
    this.reports = reports;
  }

  doCalculations() {
    throw new Error("Method not implemented.");
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new Accounting("d2", []));
  }

  /**throws error if property reports is empty */
  getMostRecentReport() {
    if (this.reports.length === 0) {
      throw new Error("No reports found.");
    }
    return this.reports[this.reports.length - 1];
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
  /**overriding method from parent class */
  describe(this: Accounting): void {
    console.log("@@@@@");
    console.log(`Department ${this.id}: ${this.name}`);
    console.log(`Reports: ${this.reports}`);
    console.log("@@@@@");
  }
}

const itDep = new ITDepartment("d1", ["Nick", "Kordo"]);
itDep.addEmployee("Nick");
itDep.addEmployee("Kordo");
itDep.describe();

const accounting = Accounting.getInstance();
accounting.addReport("Something went wrong...");
accounting.addEmployee("Beth");
accounting.addEmployee("Rick");
// accounting.printReports();
// accounting.describe();

const emptyAccounting = Accounting.getInstance(); // returns the same instance as accounting
let lastReport = emptyAccounting.getMostRecentReport();
emptyAccounting.describe();
console.log(lastReport);

// INTERFACES

interface Person {
  name: string;
  readonly id: string;
  greet(phrase: string): void;
}

class Persona implements Person {
  name: string;
  id: string;

  constructor(n: string) {
    this.name = n;
    this.id = "2a123";
  }
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Person;

user1 = new Persona("Nick");

interface addFn {
  (a: number, b: number): number;
}

let iAdd: addFn;

iAdd = (addend: number, summand: number) => {
  return addend + summand;
};

let iMult = (factor: number, multiplier: number) => {
  return factor * multiplier;
};

function operation(a: number, b: number, fn: addFn) {
  return fn(a, b);
}

operation(4, 5, iAdd);
operation(3, 2, iMult);

interface Optional {
  msg?: string;
  error?: string;
  battleCry?(phrase: string): void;
}

class Orc implements Optional {
  battleCry(phrase: string): void {
    phrase.toLocaleUpperCase();
    console.log(`$( phrase.toUpper )`);
  }
}

//Generics

const names: Array<Orc> = [];
let msgs: Array<string> = [];

let fns: Array<(text: unknown) => void> = [];

//observer

interface Observer {
  Update(state: number): void;
}

interface Subject {
  Add(obs: Observer): void;
  Remove(obs: Observer): void;
  Notify(): void;
}

class ConcreteObserver implements Observer {
  Update(state: number): void {
    console.log("Observer updated:" + state);
  }
}

class ConcreteObserver2 implements Observer {
  Update(state: number): void {
    console.log("Observer2 updated" + state);
  }
}

class ConcreteSubscriper implements Observer {
  Update(state: number): void {
    console.log("Subscriper updated" + state);
  }
}

class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;

  setState(sta: number) {
    this.state = sta;
    this.Notify();
  }

  Add(obs: Observer): void {
    this.observers.push(obs);
  }
  Remove(obs: Observer): void {
    this.observers = this.observers.filter((observer) => observer !== obs);
  }
  Notify(): void {
    this.observers.forEach((observer) => observer.Update(this.state));
  }
}

const subject = new ConcreteSubject();
const observer = new ConcreteObserver();
const observer2 = new ConcreteObserver2();
const subscriper = new ConcreteSubscriper();

subject.Add(observer);
subject.Add(observer2);
subject.Add(subscriper);

subject.Notify();

subject.setState(1214124);

class MyIteratorClass implements Iterator<any> {
  private _index: number = 0;
  private _data: any[] = [];

  constructor(data: any[]) {
    this._data = data;
  }

  next(): IteratorResult<any> {
    const result = this._data[this._index];
    this._index++;
    if (this._index <= this._data.length) {
      return { value: result, done: false };
    } else {
      return { value: null, done: true };
    }
  }
}
const someData = ["one", "two", "three"];
const iterable = new MyIteratorClass(someData);
// console.log(iterable.next());
// console.log(iterable.next());
// console.log(iterable.next());
// console.log(iterable.next());


