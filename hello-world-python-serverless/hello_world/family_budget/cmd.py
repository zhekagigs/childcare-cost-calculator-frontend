import os

# import numpy as np
# import pandas as pd
import PersonalBudget
from childcare import *


DATA_PATH = "../data/"

def main():
    freya = Child("Freya", 64.5, date(2020, 3, 3), [1, 1, 1, 1, 0, 0, 0])
    sasha = Child("Sasha", 69.5, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    for i in range(4, 13):
        freya.add_discount(ThirtyHoursFree(i, 2023, freya.attendance))
    freya.apply_discounts()

    freya.add_discount(TaxBenefit())
    sasha.add_discount(TaxBenefit())
    freya.discounts[-1].apply_discount(freya.costs)
    sasha.discounts[-1].apply_discount(sasha.costs)
    # print(os.getcwd())
    # fees_romy = PersonalBudget.NewPersonalBudget(DATA_PATH + 'romyFees.yml')
    # fees_evgeny = PersonalBudget.NewPersonalBudget(DATA_PATH + 'evgenyFees.yml')
    # fees_family = PersonalBudget.NewPersonalBudget(DATA_PATH + '/jointFees.yml')
    # profit = budget(fees_evgeny, fees_romy, fees_family)
    # totals = calculate_kids_totals([freya, sasha], profit)
    # print(totals)
    print_out(freya, sasha)


def budget(fees_evgeny: float, fees_romy, fees_family):
    fees_family += fees_romy + fees_evgeny
    profit = fees_family.salary_monthly - fees_family.monthly_fees - fees_family.savings_monthly
    return profit


def print_out(freya, sasha):
    print(freya.costs.base_each_month.values())
    print(freya.costs.thirty_hours_free.values())
    print(freya.costs.tax_benefit_monthly.values())

    print(sasha.costs.base_each_month.values())
    print(sasha.costs.thirty_hours_free.values())
    print(sasha.costs.tax_benefit_monthly.values())

    # report_avg(freya, sasha)
    # report_per_month(freya)
    # report_per_month(sasha)


def calculate_kids_totals(children, budget):
    totals = dict()
    for child in children:
        for key in child.costs.sumsEachMonth:
            if key in totals:
                totals[key] += child.costs.sumsEachMonth[key]
            else:
                totals[key] = child.costs.sumsEachMonth[key]
            print("Leftover: ", round(budget - totals[key]), "   Month number:", key)
    return totals


# def report_avg(freya, sasha):
#     avg_term_freya = avg(freya.costs.per_terms.values())
#     avg_term_sasha = avg(sasha.costs.sumsEachMonth.values())
#     df_avg = pd.DataFrame({
#         "Name": ["Freya", "Sasha"],
#         "Per Day": [freya.costs.per_day, sasha.costs.per_day],
#         "Per_Terms": [avg_term_freya, avg_term_sasha],
#         "Per_Year": [freya.costs.per_year, sasha.costs.per_year],
#         "Per_SumsEachMonth": [avg(freya.costs.sumsEachMonth.values()), avg(sasha.costs.sumsEachMonth.values())]
#     })
#     df_avg.to_csv("averages.csv")


# def report_per_month(child: Child):
#     m = calendar.month_name[1:]
#     df_months = pd.DataFrame(index=m, columns=["Base", "30HoursFree", "TaxBenefit"])

#     try:
#         df_months.loc[:, "TaxBenefit"] = np.array(list(child.costs.tax_benefit_monthly.values()))
#     except:
#         print("warning")

#     try:
#         df_months.loc[:, "Base"] = np.array(list(child.costs.base_each_month.values()))
#     except ValueError:
#         print("warning")

#     try:
#         df_months.loc[:, "30HoursFree"] = np.array(list(child.costs.thirty_hours_free.values()))
#     except ValueError:
#         print("warning")
#     finally:
#         df_months.to_csv(child.name + "_per_month.csv")


def copy_it(org_dict: dict):
    return copy.copy(list(org_dict.values()))


def avg(a):
    return sum(a) / len(a)


if __name__ == "__main__":
    main()
