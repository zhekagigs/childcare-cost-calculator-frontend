import { ChildsCost } from "../api/costAPI";

interface CostDetailsProps {
  onSave: ChildsCost;
  submitted: boolean;
}

export default function CostDetails(props: CostDetailsProps) {
  const { onSave, submitted } = props;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      {submitted && (
        <div>
          <div>
            <div>
              <section className="section dark">
                <h3 className="strong">
                  <strong>{onSave.name}</strong>
                </h3>
                <p>Cost for a year with all discounts: {onSave.perYear}</p>
                <p>Cost for term: {onSave.perTerm}</p>
                <p>Cost for week: {onSave.perWeek}</p>
                <p>Base cost for each month in a year:</p>
                <p>Total saved in a year with all discounts:</p>
                <ul>
                  {Object.keys(onSave.baseCostsEachMonth).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.baseCostsEachMonth[key]}
                      </li>
                    );
                  })}
                </ul>
                <p>Cost after tax benefit(average to £167 per month) for each month in a year:</p>
                <ul>
                  {Object.keys(onSave.taxBenefitMonthly).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.taxBenefitMonthly[key]}
                      </li>
                    );
                  })}
                </ul>
                <p>Cost after thirty hours free for each month in a year:</p>
                <ul>
                  {Object.keys(onSave.thirtyHoursFree).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.thirtyHoursFree[key]}
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
