import React, { useState } from "react";

import { send } from "emailjs-com";

function Form() {
  const [submitStatus, setSubmitStatus] = useState(null);

  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = e => {
    e.preventDefault();
    setSubmitStatus("sending");
    send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      toSend,
      import.meta.env.VITE_USER_ID
    )
      .then(response => {
        setSubmitStatus("sent");
      })
      .catch(err => {
        setSubmitStatus("error");
      });
  };

  const handleChange = e => {
    console.log(e.target);
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-container">
        {
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="text"
                name="from_name"
                placeholder="from name"
                value={toSend.from_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Subject</label>
              <input
                type="text"
                name="to_name"
                placeholder="to name"
                value={toSend.to_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Message</label>
              <textarea
                type="text"
                name="message"
                placeholder="Your message"
                value={toSend.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Subject</label>
              <input
                type="text"
                name="reply_to"
                placeholder="Your email"
                value={toSend.reply_to}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        }
      </div>
    </>
  );
}

export default Form;
