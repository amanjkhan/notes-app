import "./MessageBox.css";

export default function MessageBox({ message }) {
  if (message.success) {
    return (
      <div className="message-box bg-success">
        <span>
          <i className="fa-solid fa-circle-check"></i> {message.message}
        </span>
      </div>
    );
  }

  return (
    <div className="message-box bg-danger">
      <span>
        <i className="fa-solid fa-circle-xmark"></i> {message.message}
      </span>
    </div>
  );
}
