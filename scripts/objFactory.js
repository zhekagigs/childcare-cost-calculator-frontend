let harry = {
    name: "Harry",
    salary: 1000,
    raiseSalay(percent) {
        this.salary = this.salary * (1 + percent / 100);
    },
}

harry.raiseSalay(10);
console.log(harry.salary);

const employeePrototype = {
    raiseSalary: (percent) => {
        this.salary = this.salary *(1 + percent / 100);
    }
}

function CreateEmployee(name, salary) {
    const result = {name, salary}
    Object.setPrototypeOf(result, employeePrototype);
    return result;
}


let sally = CreateEmployee("Sally", 1000);

console.log(sally.salary);
sally.raiseSalary(100);
console.log(sally.salary);