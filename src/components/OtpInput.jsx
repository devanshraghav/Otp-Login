import { useState, useEffect, useRef } from "react";

const OtpInputField = ({ length, onOtpSubmit }) => {
  const [otpField, setOtpField] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);
  //console.log(inputRef);
  const handleChange = (index, event) => {
    //setOtpField(event.target[index].value);

    const value = event.target.value;
    // return when other than number is pressed.
    if (isNaN(value)) return;
    const newOtp = [...otpField];

    // take only latest number - i.e 1 number only
    newOtp[index] = value.substring(value.length - 1);
    setOtpField(newOtp);

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }

    if (value && index < length - 1 && otpField[index + 1]) {
      console.log(otpField[index + 1]);
      if (otpField.indexOf("") != -1) {
        // console.log(otpField.indexOf(''))
        inputRef.current[otpField.indexOf("")].focus();
      }
    }

    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) {
      //console.log('submit')
      onOtpSubmit();
    }

    //setOtpField(otpField);
  };
  const handleBackspace = (index, event) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !otpField[index] &&
      inputRef.current[index - 1]
    ) {
      // move focuns on the previous field when you hit backspace...
      inputRef.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    // to set cursor at end point automatically
    inputRef.current[index].setSelectionRange(1, 1);

    // if previous field is empty focus that field
    if (index > 0 && !otpField[index - 1]) {
      inputRef.current[otpField.indexOf("")].focus();
    }
  };

  // To focus on 1st input feild when ref is actually referencing that value
  useEffect(() => {
    // if ref has value
    if (inputRef.current[0]) {
      // focus on 1st input field.
      inputRef.current[0].focus();
    }
  }, []);
  return otpField.map((value, index) => {
    return (
      <input
        type="text"
        key={index}
        value={value}
        ref={(input) => (inputRef.current[index] = input)}
        className="otpField"
        onChange={(event) => handleChange(index, event)}
        onClick={() => handleClick(index)}
        onKeyDown={(event) => {
          handleBackspace(index, event);
        }}
      />
    );
  });
};


export default OtpInputField;