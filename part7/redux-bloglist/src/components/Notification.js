import { useSelector } from "react-redux/es/hooks/useSelector";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  return message === "" ? null : <p>{message}</p>;
};

export default Notification;
