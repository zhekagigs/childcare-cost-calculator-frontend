export {};

interface MonthToMoneyMapping extends Object{
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
  "12": number;
};

const march: MonthNumbers = "3";

type MonthNumbers = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

class MonthOMoney implements MonthToMoneyMapping {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
  "12": number;
  constructor(data: Object) {
    Object.assign(this, data);
  } 

  toArray(): Array<number> {
    return Object.values(this);
  }
}



const per_month = {
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
  "12": 2583,
};

type CostPerMonth = {
  [month: string]: number;
}

const curMonth = new Date().getMonth()

console.log(curMonth);

const perMonth: CostPerMonth = {
  jan : 2706,
  feb : 2460,
  mar : 2829,
  apr : 2460,
  may : 2829,
  jun : 2706,
  jul : 2583,
  aug : 2829,
  sep : 2583,
  oct : 2706,
  nov : 2706,
  dec : 2583,
}

const perMonthClass: MonthOMoney = new MonthOMoney(per_month)

console.log(perMonthClass.toArray());

function iterate(per_month: MonthToMoneyMapping) {
  let key: keyof { [x: string]: number; };
  let result: number[] = [];

  for (key in per_month) {
    const value = per_month[key];
    result.push(value);
  }
  return result;
}

console.log(iterate(per_month))