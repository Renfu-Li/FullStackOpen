import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div>
      filter
      <input
        value={filter}
        onChange={(e) => dispatch(filterChange(e.target.value))}
      ></input>
    </div>
  );
};

export default Filter;
