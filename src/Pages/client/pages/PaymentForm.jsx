// PaymentForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", formData);
    navigate("/payment-demo");
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder Name:</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="16"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date (MM/YY):</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVC:</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            maxLength="3"
            required
          />
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
