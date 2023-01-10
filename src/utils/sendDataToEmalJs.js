import useEmailjs from "../hooks/useEmailjs";

//TODO: finish implementation

const emailJsData = {
  service_id: import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  toSendData: toSend,
  user_id: import.meta.env.REACT_APP_EMAILJS_USER_ID,
};

const { service_id, template_id, toSendData, user_id } = emailJsData;

const submitStatus = EmailJs(service_id, template_id, toSendData, user_id);
