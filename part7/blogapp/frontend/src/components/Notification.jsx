import '../style/style.css';

const Notification = ({ message }) => {
  return message ? (
    <p
      className={message.type === 'error' ? 'error-message' : 'success-message'}
    >
      {message.text}
    </p>
  ) : null;
};

export default Notification;
