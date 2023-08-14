import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <button id="newNote" style={hideWhenVisible} onClick={toggleVisibility}>
        New note
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
