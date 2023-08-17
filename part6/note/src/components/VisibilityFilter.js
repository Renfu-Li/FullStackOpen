import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      ></input>
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      ></input>
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      ></input>
    </div>
  );
};

export default VisibilityFilter;
