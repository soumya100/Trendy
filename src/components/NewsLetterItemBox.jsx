
import React from 'react';
import text from "../languages/en.json";


const NewsLetterItemBox = () => {

    const[newsEmail, setNewsEmail] = React.useState({
        email: '',
        isEmailValid: true,
    });

    const handleEmailChange = (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setNewsEmail({
            email: email,
            isEmailValid: emailRegex.test(email),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newsEmail.isEmailValid && newsEmail.email) {
            // Handle valid email submission logic here
            console.log("Subscribed with email:", newsEmail.email);
            setNewsEmail({ email: '', isEmailValid: true });
        } else {
            setNewsEmail((prevState) => ({
                ...prevState,
                isEmailValid: false,
            }));
        }
    }


  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">{text.newslettertitle}</p>
      <p className="text-gray-400 my-3">
        {text.bestsellerdescription}
      </p>
      <form onSubmit={handleSubmit} className={`w-full sm:w-1/2 flex items-center gap-3 mx-auto my-1 border px-0.5 ${newsEmail.isEmailValid ? 'border-gray-300' : 'border-red-500'} `}>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none py-3 px-2 text-sm"
          onChange={handleEmailChange}
          formNoValidate
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-6 py-3 hover:bg-gray-800 transition cursor-pointer"
        >
          {text.subscribebuttontext.toUpperCase()}
        </button>
      </form>
        {!newsEmail.isEmailValid && (
            <p className="text-red-500 text-sm">{text.formValidationErrors.invalidEmail}</p>
        )}
    </div>
  );
};

export default NewsLetterItemBox;
