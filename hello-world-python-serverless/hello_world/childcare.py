import abc
import calendar
import copy
from datetime import date

from typing import List

SCHOOL_HOLIDAYS_2024 = [
    (1, [1,2,3]),
    (2, [12, 13, 14, 15, 16]),
    (3, [29]),
    (4, [1, 2, 3, 4, 5, 8, 9, 10, 11, 12]),
    (5, [27, 28, 29, 30, 31]),
    (6, [1, 2]),
    (7, [25, 26, 29, 30, 31]),
    (8, range(1, 31)),
    (9, []),
    (10, [28,29,30,31]),
    (11, [1]),
    (12, [23,24,25,26,27,30,31])
]

NURSERY_CLOSED_2023 = [
    (1, []),
    (2, []),
    (3, []),
    (4, []),
    (5, []),
    (6, []),
    (7, []),
    (8, []),
    (9, []),
    (10, []),
    (11, []),
    (12, [])
]


class Childcare:

    def __init__(self) -> None:
        self.number_of_children = 2

    def initialize(self):
        pass


class Days:
    def __init__(self) -> None:
        self.cal = calendar.Calendar()

    def get_work_days_month(self, year, month):
        weekday_count = 0

        for week in self.cal.monthdayscalendar(year, month):
            for i, day in enumerate(week):
                # not this month's day or a weekend
                if day == 0 or i >= 5:
                    continue
                # or some other control if desired...
                weekday_count += 1
        return weekday_count

    def get_days_of_month(self, year: int, month: int) -> List[List[int]]:
        all_days: List[List[int]] = self.cal.monthdayscalendar(year, month)
        return all_days


class Discount(metaclass=abc.ABCMeta):
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, 'apply_discount') and
                callable(subclass.apply_discount) or
                NotImplemented)

    @abc.abstractmethod
    def apply_discount(self, data):
        raise NotImplementedError


class Child:
    def __init__(self, name: str, price_per_day: float, date_of_birth: date, attendance: List[int], school_year=2024) -> None:
        self.name = name
        self.date_of_birth: date = date_of_birth
        self.costs: PriceData = PriceData(attendance, school_year, price_per_day)
        self.discounts = list()
        self.check_attendance_per_week(attendance)
        self.attendance = attendance

    def add_discount(self, discount: Discount):
        self.discounts.append(discount)

    def set_attendance_per_week(self, attendance_per_week):
        self.attendance = attendance_per_week

    def apply_discounts(self):
        assert self.discounts is not None
        for discount in self.discounts:
            if discount.__class__ == ThirtyHoursFree:
                discount.apply_discount(self.costs)
                self.costs.updateSumsForAllMonths()
                print("discount is thirty hours ")
            else:
                discount.apply_discount(self.costs)
                print("discount is tax benefit ")
        self.costs.calculateBaseYear()
        self.costs.calculateBaseTerms()

    @staticmethod
    def check_attendance_per_week(days_per_week):
        if len(days_per_week) != 7:
            RuntimeError("Wrong number of days per week")
        for day in days_per_week:
            if day != 1 or day != 0:
                RuntimeError("Wrong days encoding, should be 1 or 0")


class PriceData:
    def __init__(self, attendance, year, per_day: float = None, per_week: float = None) -> None:
        self.per_month_avg = None
        self.per_term = None
        self.per_day = per_day
        self.per_week = per_week
        self.per_terms = dict()
        self.per_year = None

        self.eachMonthByDay = dict()
        self.sumsEachMonth = dict()
        self.base_each_month = dict()
        self.tax_benefit_monthly = dict()
        self.thirty_hours_free = dict()

        self.calculate_base_months(attendance, year)
        self.calculateBaseYear()
        self.calculateBaseTerms()

    def calculate_base_months(self, attendance, year):
        month = 1 #starting with jan always
        counter = 0
        while counter <= 12:
            self.buildMonthByDay(month, attendance, year)
            self.getSumMonthByDay(month)
            month = (month + 1) % 12
            if month == 0:
                month = 12
            counter += 1
        self.base_each_month = copy.copy(self.sumsEachMonth)

    def calculateBaseYear(self):
        if len(self.sumsEachMonth) == 12:
            self.per_year = sum(self.sumsEachMonth.values())
        else:
            raise RuntimeWarning("Can't calculate year")

    def calculateBaseTerms(self):
        if len(self.sumsEachMonth) == 12:
            counter, total_per_term = 0, 0
            term = 1
            for month in self.sumsEachMonth:
                total_per_term += self.sumsEachMonth[month]
                counter += 1
                if counter == 3:
                    self.per_terms[term] = total_per_term
                    term += 1
                    counter, total_per_term = 0, 0
        else:
            raise RuntimeWarning("Can't calculate term")

    def buildMonthByDay(self, month_num: int, attendance_days_per_week: 'list[int]', year=2023):
        days = Days()
        month_days_by_week = days.get_days_of_month(year=year, month=month_num)
        result = []
        for week in month_days_by_week:
            result.append([])
            for i in range(len(week)):
                day = week[i]
                if day == 0:
                    result[-1].append([day, 0.])
                elif attendance_days_per_week[i] == 1:
                    result[-1].append([day, self.per_day])
                else:
                    result[-1].append([day, 0.])
        self.eachMonthByDay[month_num] = result
        return result

    def updateSumsForAllMonths(self):
        for i in range(1, 13):
            self.getSumMonthByDay(i)

    def getSumMonthByDay(self, month_num):
        summed = 0
        if self.eachMonthByDay[month_num]:
            for week in self.eachMonthByDay[month_num]:
                for day in week:
                    summed += day[1]
        self.sumsEachMonth[month_num] = summed
        return summed

    def toDict(self):
        return {
                "perTerm": self.per_term,
                "perWeek": self.per_week,
                "perYear": self.per_year,
                "sumsEachMonth": self.sumsEachMonth,
                "perTerms": self.per_terms,
                "baseCostsEachMonth": self.base_each_month,
                "taxBenefitMonthly": self.tax_benefit_monthly,
                "thirtyHoursFree": self.thirty_hours_free,
                }
    

class ThirtyHoursFree(Discount):
    """
    Add one instance to child for each month.
    """
    def __init__(self, month_num, year, attendance_per_week) -> None:
        super().__init__()
        self.FULL_DAYS_DISCOUNT = 3 #TODO hard coded 30 hours or 3 full days, how about part days?
        self.discount = None
        self.day_price = None
        self.month_num = month_num
        self.year = year
        self.attendance_days_per_week = attendance_per_week
        self.monthly_discount = 0

    def apply_discount(self, data: PriceData):
        self.discount = data.per_day * 3
        self.day_price = data.per_day
        not_discounted_days = set(SCHOOL_HOLIDAYS_2024[self.month_num - 1][1])
        for week in data.eachMonthByDay[self.month_num]:
            days_discounted_counter = self.FULL_DAYS_DISCOUNT
            for day in week:
                if day[0] in not_discounted_days:
                    continue
                else:
                    self.monthly_discount += day[1]
                    day[1] = 0.
                    days_discounted_counter -= 1
                if days_discounted_counter == 0:
                    break
        data.thirty_hours_free[self.month_num] = self.monthly_discount
        return data


class DiscountService:
    pass


class TaxBenefit(Discount):
    def __init__(self) -> None:
        self.amountPerYear = 2000.00
        self.amountPerTerm = round(self.amountPerYear / 4)
        self.amountPerMonth = round(self.amountPerTerm / 3)

    def apply_discount(self, data: PriceData):
        if data.per_term or data.per_month_avg or data.per_year:
            if data.per_terms:
                for term in data.per_terms:
                    data.per_terms[term] -= self.amountPerTerm
            if data.per_year:
                data.per_year -= self.amountPerYear
            if data.sumsEachMonth:
                for i, month in enumerate(data.sumsEachMonth):
                    discount_amount = self.amountPerMonth
                    if i % 3 == 0:
                        discount_amount -= 1
                    data.sumsEachMonth[month] -= discount_amount
                    data.tax_benefit_monthly[month] = discount_amount
        else:
            print("not applied")
        return data
