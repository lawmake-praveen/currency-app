import React, { useState } from "react";

const Currency = ({ currency, inputChange, placeholder, currencyTypeChange, option, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(currency || defaultValue);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    currencyTypeChange(e);
  };

  return (
    <div className="currency">
      <input type="number" placeholder={placeholder} value={currency || ''} onChange={inputChange} />
      <select onChange={handleSelectChange} value={selectedValue}>
        {Array.isArray(option) &&
          option.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Currency;
