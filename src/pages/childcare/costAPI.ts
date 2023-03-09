import { type } from "os";

export class Child {
  name: string = "";
  dateOfBirth: Date = new Date();
  pricePerDay: number = 0;
  daysAttending: number[] = [1, 1, 1, 1, 1, 0, 0];
  taxBenefit: boolean = false;
  thirtyHoursFree: boolean = false;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.name) this.name = initializer.name;
    if (initializer.dateOfBirth) this.dateOfBirth = initializer.dateOfBirth;
    if (initializer.pricePerDay) this.pricePerDay = initializer.pricePerDay;
    if (initializer.daysAttending)
      this.daysAttending = initializer.daysAttending;
    if (initializer.taxBenefit) this.taxBenefit = initializer.taxBenefit;
    if (initializer.thirtyHoursFree)
      this.thirtyHoursFree = initializer.thirtyHours;
  }
}

export class ChildsCost {
  perTerm: number = 0;
  perWeek: number = 0;
  perYear: number = 0;
  perTerms: any;
  sumsEachMonth: MonthToMoneyMapping;
  baseCostsEachMonth: MonthToMoneyMapping;
  taxBenefitMonthly: MonthToMoneyMapping;
  thirtyHoursFree: MonthToMoneyMapping;
  name: string = "";

  constructor(initializer: any) {
    this.perTerm = initializer.perTerm;
    this.perWeek = initializer.perWeek;
    this.perYear = initializer.perYear;
    this.sumsEachMonth = initializer.sumsEachMonth;
    this.perTerms = initializer.perTerms;
    this.baseCostsEachMonth = initializer.baseCostsEachMonth;
    this.taxBenefitMonthly = initializer.taxBenefitMonthly;
    this.thirtyHoursFree = initializer.thirtyHoursFree;
    this.name = initializer.name;
  }
}

export type MonthToMoneyMapping = {
  [monthNum: string]: number;
};

function convertToCostDataModel(data: any) {
  return new ChildsCost(data);
}

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

const urlMock = `http://localhost:3000/api/calculate-cost-mock`;
const urlLocal = `http://localhost:8080/cost`;

export const CalculateCost = {
  async get(child: Child) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(child),
    };
    try {
      const response = await fetch(urlLocal, request);
      const response_1 = await checkStatus(response);
      const data = await parseJSON(response_1);
      return convertToCostDataModel(data);
    } catch (error) {
      throwError(error);
    }
  },
};

function throwError(error: unknown) {
  console.log("ERROR: " + error);
  throw new Error(
    "There was an error retrieving the projects. Please try again."
  );
}
