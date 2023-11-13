import { useState } from "react";

export default function SelectComp() {
  const [checkedTestType, setTestType] = useState({
    whitebox: "false",
    injection: "false",
  });
  const [testDuration, setTestDuration] = useState(60);

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;

    setTestType((prevState) => ({
      ...prevState,
      [id]: checked.toString(),
    }));
  };

  return (
    <div className="select_test_type_component">
      <input type="checkbox" id="whitebox" value={checkedTestType.whitebox} onChange={handleCheckboxChange} />
      <label htmlFor="whitebox">Whitebox Unit Test</label>
      <div className="injection_checkbox_option">
        <input type="checkbox" id="injection" value={checkedTestType.injection} onChange={handleCheckboxChange} />
        <label htmlFor="injection">Injection Test</label>
        <div className="option">
          <label htmlFor="quantity">· Test duration: </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={testDuration}
            onChange={(e) => setTestDuration(Number(e.target.value))}
          />
          <span>sec</span>
        </div>
      </div>
    </div>
  );
}
