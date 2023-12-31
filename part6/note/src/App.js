import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

import { initializeNotes } from "./reducers/noteReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <div>
      <NewNote></NewNote>
      <VisibilityFilter></VisibilityFilter>
      <Notes></Notes>
    </div>
  );
}

export default App;
