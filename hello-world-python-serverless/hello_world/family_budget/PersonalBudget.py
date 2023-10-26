import yaml


class PersonalBudget:
    def __init__(self, monthly_fees, savings_monthly, accounts, salary):
        self.monthly_fees: float = monthly_fees
        self.savings_monthly: float = savings_monthly
        self.accounts: float = accounts
        self.salary_monthly: float = salary

    def __str__(self):
        return str("Fees " + str(self.monthly_fees) +
                   "\nSaving " + str(self.savings_monthly) +
                   "\nAccounts " + str(self.accounts) +
                   "\nSalary " + str(self.salary_monthly))

    def __add__(self, other):
        """

        :type other: PersonalBudget
        """
        return PersonalBudget(self.monthly_fees + other.monthly_fees,
                              self.savings_monthly + other.savings_monthly,
                              self.accounts + other.accounts,
                              self.salary_monthly + other.salary_monthly)


def NewPersonalBudget(file):
    with open(file, 'r') as f:
        persons_budget = yaml.safe_load(f)
    print(persons_budget)
    persons_budget = PersonalBudget(sum(persons_budget['feesMonthly'].values()),
                                    sum(persons_budget['savingsMonthly'].values()),
                                    sum(persons_budget['accounts'].values()),
                                    sum(persons_budget['salary'].values()))
    return persons_budget
