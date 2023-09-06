import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../quries";

const PhonrForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found");
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    changeNumber({
      variables: {
        name,
        phone,
      },
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Change Number</h2>

      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <button type="submit">Change Number</button>
      </form>
    </div>
  );
};

export default PhonrForm;
