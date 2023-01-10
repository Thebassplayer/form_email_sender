import { useState } from "react";
import { send } from "emailjs-com";

//TODO: finish this file

function useEmailjs(service_id, template_id, toSend, user_id) {
  const [submitStatus, setSubmitStatus] = useState(null);

  setSubmitStatus("sending");

  send(service_id, template_id, toSend, user_id)
    .then(response => {
      console.log(response);
      setSubmitStatus("sent");
    })
    .catch(err => {
      setSubmitStatus("error");
    });

  return submitStatus;
}

export default useEmailjs;
