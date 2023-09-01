import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ItemDisplay from "./components/ItemDisplay";

// components
import ItemInput from "./components/ItemInput";

function App() {
  const itemList = useSelector((state) => state.items.value);
  return (
    <div className="w-11/12 xl:w-customWidth my-10 mx-auto">
      <ItemInput itemList={itemList}/>
      <ItemDisplay />
    </div>
  );
}

export default App;
