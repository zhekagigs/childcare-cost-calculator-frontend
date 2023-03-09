import { useState } from "react";
import { CostDetails } from "./cost-details";
import { ChildsCost } from "./costAPI";
import { UserForm } from "./form";

export default function Childcare() {
    const [onSave, setOnSave] = useState({} as ChildsCost);
    const [submitted, setSubmitted] = useState(false);
    return (
      <>
        <UserForm
          onSave={onSave}
          setOnSave={setOnSave}
          setSubmitted={setSubmitted}
        />
        <CostDetails onSave={onSave} submitted={submitted} />
      </>
    );
  }