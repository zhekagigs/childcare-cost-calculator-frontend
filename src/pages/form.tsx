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

  const [error, setError] = useState("");

  const showError = <pre>{JSON.stringify(error)}</pre>;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let child = new Child({ name, dateOfBirth, pricePerDay });
    CalculateCost.get(child)
      .then((data) => {
        setOnSave(data);
        setSubmitted(true);
        console.log(data);
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

        <label>Date of birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Choose days attendance: </label>
        <div className="input-group fluid left">
          <label>Mon</label>
          <input type="checkbox" id="mon" className="doc" />
          <label>Tue</label>
          <input type="checkbox" id="tue" className="doc" />
          <label>Wed</label>
          <input type="checkbox" id="wed" className="doc" />
          <label>Thu</label>
          <input type="checkbox" id="thu" className="doc" />
          <label>Fri</label>
          <input type="checkbox" id="fri" className="doc" />
        </div>
        <div className="fluid">
          <label>Tax Benefit</label>
          <input type="checkbox" id="tax-benefit" className="doc" />
        </div>
        <div className="fluid">
          <label>Thirty hours free</label>
          <input type="checkbox" id="fri" className="fatcheckbox" />
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