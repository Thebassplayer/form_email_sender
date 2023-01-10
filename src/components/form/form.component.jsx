import React, { useState } from "react";
import { send } from "emailjs-com";

//TODO: Implemet useEmailjs custom hook
// import useEmailjs from "../../hooks/useEmailjs";
// import { emailJsData } from "../../env/emailJs.env";
import Spinner from "../spinner/spinner.component";

import "./form.component.scss";

function Form() {
  const [submitStatus, setSubmitStatus] = useState(null);

  // Data to populate the Email
  const [toSend, setToSend] = useState({
    from_name: "",
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
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-container">
        {(() => {
          switch (submitStatus) {
            case "sending":
              return (
                <div className="spinner-border" role="status">
                  <Spinner />
                </div>
              );
            case "sent":
              return (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Sent...</span>
                </div>
              );
            case "error":
              return (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Error</span>
                </div>
              );
            default:
              return (
                <>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        name="from_name"
                        placeholder="from name"
                        value={toSend.from_name}
                        onChange={handleChange}
                        required
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
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input
                        type="text"
                        name="reply_to"
                        placeholder="Your email"
                        value={toSend.reply_to}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </>
              );
          }
        })()}
      </div>
    </>
  );
}

export default Form;
