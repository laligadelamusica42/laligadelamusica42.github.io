
import React from 'react';

const EmailTemplateV1 = ({
  fullname,
  event_name,
  body
}) => {
  return (
    <div>
      <h1>Testing Email: {fullname}</h1>
      <p>Event Name: {event_name}</p>
      <p>Body: {body}</p>
    </div>
  );
};

export default EmailTemplateV1;
