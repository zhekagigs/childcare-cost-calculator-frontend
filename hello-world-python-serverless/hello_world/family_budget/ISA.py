from collections import namedtuple


class ISA:
    def compound_interest(self, account, top_up_monthly, interest, years):
        pass

class LISA(ISA):
    def compound_interest(self, account, top_up_monthly, interest, years):
        per_year = []
        Year = namedtuple("Year", "cash, interest, gov")
        gov_bonus_year = 0
        for i in range(years):
            topped_up_this_year = 0
            for j in range(12):
                account += top_up_monthly
                gov_bonus = top_up_monthly * 0.25
                account += gov_bonus
                topped_up_this_year += top_up_monthly
                gov_bonus_year += gov_bonus
            earned = account * (interest * 0.01)
            account += earned
            if topped_up_this_year > 4000:
                raise Exception("Can't pay into LISA more then 4000 per year")
            year = Year(account, earned, gov_bonus_year)
            per_year.append(year)
        return per_year


class StocksAndShares(ISA):
    def compound_interest(self, account, top_up_monthly, interest, years):
        per_year = []
        Year = namedtuple("Year", "cash, interest")
        for i in range(years):
            topped_up_this_year = 0
            for j in range(12):
                account += top_up_monthly
                topped_up_this_year += top_up_monthly
            earned = account * (interest * 0.01)
            account += earned
            if topped_up_this_year > 20000:
                raise Exception("Can't pay into LISA more then 20000 per year")
            year = Year(account, earned)
            per_year.append(year)
        return per_year


class MoneyBoxIsa(ISA):
    def compound_interest(self, account, top_up_monthly, interest, years):
        per_year = []
        Year = namedtuple("Year", "cash, interest, gov")
        gov_bonus_year = 0

        for i in range(years):
            topped_up_this_year = 0

            for j in range(12):
                account += top_up_monthly
                gov_bonus = top_up_monthly * 0.25
                account += gov_bonus
                topped_up_this_year += top_up_monthly
                gov_bonus_year += gov_bonus
                earned = account * (interest * 0.01 / 12)
                account += earned
            if topped_up_this_year > 4000:
                raise Exception("Can't pay into LISA more then 4000 per year")
            earned = account * (0.75 * 0.01 / 12)
            account += earned
            year = Year(account, earned, gov_bonus_year)
            per_year.append(year)
        return per_year
