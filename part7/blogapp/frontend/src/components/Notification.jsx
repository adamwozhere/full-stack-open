import '../style/style.css';
import { useNotificationMessage } from '../NotificationContext';

const Notification = () => {
  const message = useNotificationMessage();

  return message ? (
    <p
      className={message.type === 'error' ? 'error-message' : 'success-message'}
    >
      {message.text}
    </p>
  ) : null;
};

export default Notification;
