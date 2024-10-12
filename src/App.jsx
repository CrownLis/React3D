import "./App.css";
import List from "./components/List/List";
import Model from "./components/Model/Model";
import { Routes, Route} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ModelList from "./components/ModelList/ModelList";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/*" element={<List />}/>
        <Route path="/model/:id" element={<Model />}/>
        <Route path="/modelList/:id" element={<ModelList />}/>
      </Routes>
    </div>
  );
}

export default App;