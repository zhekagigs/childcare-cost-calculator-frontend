from childcare import *
import pytest
from unittest.mock import patch
from datetime import date

price_a = 100.00
price_b = 50.00
attendance_days_per_week = [1, 1, 1, 1, 1, 0, 0]
year = 2024

@pytest.fixture
def price_data():
    return PriceData(attendance_days_per_week, year, per_day=price_a)

def test_buildMonthByDay( price_data):
    # Test case 1: Month with attendance

    expected_month_days_by_week = [[0, 0, 0, 0, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31]]
    month_num = 1

    expected_result = [[[1, 100], [2, 100], [3, 100], [4, 100], [5, 100], [6, 0.0], [7, 0.0]],[[8, 100], [9, 100], [10, 100], [11, 100], [12, 100], [13, 0.0], [14, 0.0]],[[15, 100], [16, 100], [17, 100], [18, 100], [19, 100], [20, 0.0], [21, 0.0]],[[22, 100], [23, 100], [24, 100], [25, 100], [26, 100], [27, 0.0], [28, 0.0]],[[29, 100], [30, 100], [31, 100], [0, 0.0], [0, 0.0], [0, 0.0], [0, 0.0]]]
    result = price_data.buildMonthByDay(1, attendance_days_per_week, year)
    assert result == expected_result
    assert price_data.eachMonthByDay[1] == expected_result


def test_happy_path():

    freya = Child(name="Freya", price_per_day=price_a, date_of_birth=date(2020, 3, 3), attendance=[1, 1, 1, 1, 1, 0, 0], school_year=year)

    expected = {'perTerm': None, 
                'perWeek': None, 
                'perYear': 26200.0, 
                'sumsEachMonth': {1: 2300.0, 2: 2100.0, 3: 2100.0, 4: 2200.0, 5: 2300.0, 6: 2000.0, 7: 2300.0, 8: 2200.0, 9: 2100.0, 10: 2300.0, 11: 2100.0, 12: 2200.0}, 
                'perTerms': {1: 6500.0, 2: 6500.0, 3: 6600.0, 4: 6600.0}, 'baseCostsEachMonth': {1: 2300.0, 2: 2100.0, 3: 2100.0, 4: 2200.0, 5: 2300.0, 6: 2000.0, 7: 2300.0, 8: 2200.0, 9: 2100.0, 10: 2300.0, 11: 2100.0, 12: 2200.0}, 
                'taxBenefitMonthly': {}, 
                'thirtyHoursFree': {}}

    assert freya.costs.toDict() == expected


def test_30hours():
    """
    Jan.
    23 days = 2300 a month
    9 days x £100 = £900
    Jan is correct.
    Feb 2024.
    should be paying for 9 days plus two days of holiday
    """
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    for i in range(1, 13):
        freya.add_discount(ThirtyHoursFree(i, year, freya.attendance))
    freya.apply_discounts()
    print(freya.costs.toDict())
    expected = {'perTerm': None, 
                'perWeek': None, 
                'perYear': 14000.0, 
                'sumsEachMonth': {1: 900.0, 2: 1200.0, 3: 900.0, 4: 1400.0, 5: 1300.0, 6: 800.0, 7: 1100.0, 8: 2200.0, 9: 800.0, 10: 1200.0, 11: 900.0, 12: 1300.0}, 
                'perTerms': {1: 3000.0, 2: 3500.0, 3: 4100.0, 4: 3400.0}, 'baseCostsEachMonth': {1: 2300.0, 2: 2100.0, 3: 2100.0, 4: 2200.0, 5: 2300.0, 6: 2000.0, 7: 2300.0, 8: 2200.0, 9: 2100.0, 10: 2300.0, 11: 2100.0, 12: 2200.0}, 
                'taxBenefitMonthly': {}, 
                'thirtyHoursFree': {1: 900.0, 2: 1200.0, 3: 900.0, 4: 1400.0, 5: 1300.0, 6: 800.0, 7: 1100.0, 8: 2200.0, 9: 800.0, 10: 1200.0, 11: 900.0, 12: 1300.0}}

    assert freya.costs.toDict() == expected

def test_Taxbenefit():
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    sasha = Child("Sasha", 50, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    print_out(freya, sasha)
    freya.add_discount(TaxBenefit())
    sasha.add_discount(TaxBenefit())

def test_30hoursWithTaxBenefit():
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    sasha = Child("Sasha", 50, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    print_out(freya, sasha)
    pass

def test_eligibility_30Hours():
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    sasha = Child("Sasha", 50, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    print_out(freya, sasha)
    pass

def test_eligibility_TaxBenefit():
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    sasha = Child("Sasha", 50, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    print_out(freya, sasha)
    pass

def test_15Hours():
    freya = Child("Freya", 100, date(2020, 3, 3), [1, 1, 1, 1, 1, 0, 0])
    sasha = Child("Sasha", 50, date(2021, 11, 3), [1, 1, 1, 1, 1, 0, 0])
    print_out(freya, sasha)
    pass

def print_out(freya, sasha):
    print("Base each months: " + str(freya.costs.base_each_month.values()))
    print("With 30 free hours each months: " + str(freya.costs.thirty_hours_free.values()))
    print("With tax benefit: " + str(freya.costs.tax_benefit_monthly.values()))

    print("Base each months: " + str(sasha.costs.base_each_month.values()))
    print("With 30 free hours each months: " + str(sasha.costs.thirty_hours_free.values()))
    print("With tax benefit: " + str(sasha.costs.tax_benefit_monthly.values()))


test_30hours()