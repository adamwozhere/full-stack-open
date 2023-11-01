interface Props {
  notification: string | null;
}

const Notification = ({ notification }: Props) => {
  return notification !== null ? (
    <div>
      <p>
        <em>
          <strong>{notification}</strong>
        </em>
      </p>
    </div>
  ) : null;
};

export default Notification;

