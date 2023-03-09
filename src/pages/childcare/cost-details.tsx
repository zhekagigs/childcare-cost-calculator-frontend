import { ChildsCost } from "./costAPI";

interface CostDetailsProps {
  onSave: ChildsCost;
  submitted: boolean;
}

export function CostDetails(props: CostDetailsProps) {
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
        <div className="row">
          <div className="col-sm-6">
            <div className="card large">
              <section className="section dark">
                <h3 className="strong">
                  <strong>{onSave.name}</strong>
                </h3>
                <p>Cost for next year: {onSave.perYear}</p>
                <p>Cost for term: {onSave.perTerm}</p>
                <p>Cost for week: {onSave.perWeek}</p>
                <p>Base cost for each month in year 2023:</p>
                <ul>
                  {Object.keys(onSave.baseCostsEachMonth).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.baseCostsEachMonth[key]}
                      </li>
                    );
                  })}
                </ul>
                <p>Cost after tax benefit(averaged) for each month in year 2023:</p>
                <ul>
                  {Object.keys(onSave.taxBenefitMonthly).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.baseCostsEachMonth[key]}
                      </li>
                    );
                  })}
                </ul>
                <p>Cost after thirty hours free for each month in year 2023:</p>
                <ul>
                  {Object.keys(onSave.thirtyHoursFree).map((key, index) => {
                    return (
                      <li key={index}>
                        {monthNames[+key - 1]} {onSave.baseCostsEachMonth[key]}
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
