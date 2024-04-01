import { useState } from "react";
import { CalculateCost, Child, ChildsCost } from "../api/costAPI";
import styles from "@/styles/Home.module.css";

interface UserFormProps {
  onSave: ChildsCost;
  setOnSave: Function;
  setSubmitted: Function;
}

// React Form component that asks user to input their child's name, date of birth and price per day of childcare
function UserForm(props: UserFormProps) {
  const { setOnSave, setSubmitted } = props;
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [taxBenefit, setTaxBenefit] = useState(false);
  const [thirtyHoursFree, setThirtyHoursFree] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [schoolYear, setSchoolYear] = useState("");
  const [error, setError] = useState("");
  const showError = <pre>{JSON.stringify(error)}</pre>;

  const setDay = (index: number, value: boolean) => {
    const newDaysOfWeek = [...daysOfWeek];
    newDaysOfWeek[index] = value ? 1 : 0;
    setDaysOfWeek(newDaysOfWeek);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let child = new Child({
      name: name,
      dateOfBirth: dateOfBirth,
      pricePerDay: pricePerDay,
      daysAttending: daysOfWeek,
      taxBenefit: taxBenefit,
      thirtyHoursFree: thirtyHoursFree,
      schoolYear: schoolYear,
    });

    CalculateCost.get(child)
      .then((data) => {
        setOnSave(data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setSubmitted(false);
        setError(error);
      });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} className="input-group vertical">
        <label>Child name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Price per day:</label>
        <input
          type="number"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
        />

        <label>School year attendance, put 2024:</label>
        <input
          type="number"
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
        />

        <label>Date of birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Choose days attendance: </label>
        <div className="input-group fluid left">
          <label>Mon</label>
          <input
            type="checkbox"
            id="mon"
            className="doc"
            onChange={(e) => setDay(0, e.target.checked)}
          />
          <label>Tue</label>
          <input
            type="checkbox"
            id="tue"
            className="doc"
            onChange={(e) => setDay(1, e.target.checked)}
          />
          <label>Wed</label>
          <input
            type="checkbox"
            id="wed"
            className="doc"
            onChange={(e) => setDay(2, e.target.checked)}
          />
          <label>Thu</label>
          <input
            type="checkbox"
            id="thu"
            className="doc"
            onChange={(e) => setDay(3, e.target.checked)}
          />
          <label>Fri</label>
          <input
            type="checkbox"
            id="fri"
            className="doc"
            onChange={(e) => setDay(4, e.target.checked)}
          />
        </div>

        <div className="fluid">
          <label>Tax Benefit. £500 averaged over three months</label>
          <input
            type="checkbox"
            id="tax-benefit"
            className="doc"
            checked={taxBenefit}
            onChange={(e) => setTaxBenefit(e.target.checked)}
          />
        </div>

        <div className="fluid">
          <label>
            Thirty hours free. Reduces price by 30 free hours for each week in
            term time.
          </label>
          <input
            type="checkbox"
            id="thirty-hours-free"
            className="doc"
            checked={thirtyHoursFree}
            onChange={(e) => setThirtyHoursFree(e.target.checked)}
          />
        </div>

        <input
          className="input-submit bordered "
          type="submit"
          value="Submit"
        />
      </form>
      <div>{error ? showError : null}</div>
    </div>
  );
}

export default UserForm;
