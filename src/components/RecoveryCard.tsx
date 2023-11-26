import React, { useState, ChangeEvent, FormEvent } from 'react';

const RecoveryCard = () => {
  const [formData, setFormData] = useState({
    twitterUsername: '',
    telegramUsername: '',
    emailAddress: '',
    erc20WalletCompliant: '',
    tbc009CoinAmount: '',
    recoveryReason: '',
    trcCoinAmount: '',
    trcRecoveryQuestion1: '',
    trcRecoveryQuestion2: '',
    trcRecoveryQuestion3: '',
    trcRecoveryQuestion4: '',
    trcRecoveryQuestion5: '',
    eligibleWallet: false,
    eligibleParticipants: false,
    recoveryType: false,
    receivingWallet: false,
    requirementsWalletAddress: false,
    recoveryEndDate: false,
    recoveryContributionFees: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: !prevFormData[name as keyof typeof prevFormData],
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmountChange = (amount: string) => {
    const trcCoinAmount = (parseFloat(amount) * 0.5).toString();
    setFormData({
      ...formData,
      tbc009CoinAmount: amount,
      trcCoinAmount,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Trusted Wallet Recovery</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-gray-700 mb-4">
            Effortlessly reclaim half of your TBC009 holdings in the form of TRC Coin. Here are the requirements to participate in our wallets recovery:
          </p>

          {/* Follow-up questions for step 1 */}
          <label className="block mb-4">Do you know the amount of TBC009 you have?</label>
          <div className="flex items-center">
            {/* ... (radio buttons for the question) */}
          </div>
          <hr />

          <label className="block mb-4">Do you have ERC20 Wallet Address?</label>
          <div className="flex items-center">
            {/* ... (radio buttons for the question) */}
          </div>
          <hr />

          {/* Add similar sections for other questions and input fields */}

          <label className="block mb-4">Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />

          {/* Add similar sections for other input fields */}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryCard;
