import { useState } from "react";
import OtpInputField from "./OtpInput";

const OtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleSubmitBtn = (event) => {
    event.preventDefault();

    // number validation
    const regex = /^[0-9]+$/;
    if (phoneNumber.length < 0 || !regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    //show OTP
    setShowOtpField(true);
  };

  const onOtpSubmit = () => {
    console.log("Login Successfull");
  };
  return (
    <div>
      {!showOtpField ? (
        <form onSubmit={handleSubmitBtn}>
          <input
            placeholder="Enter phone number"
            value={phoneNumber}
            className="mobileNumer"
            onChange={handlePhoneNumber}
          />
          <input type="submit" className="submit-btn"/>
        </form>
      ) : (
        <div>
          <p>Enter OPT sent to {phoneNumber}</p>
          <OtpInputField length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default OtpForm;
