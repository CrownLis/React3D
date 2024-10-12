import "./App.css";
import "@cyntler/react-doc-viewer/dist/index.css";
import List from "./components/List/List";
import Model from "./components/Model/Model";
import { Routes, Route} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ModelList from "./components/ModelList/ModelList";
import DocView from "./components/DocView/DocView";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/*" element={<List />}/>
        <Route path="/model/:id" element={<Model />}/>
        <Route path="/modelList" element={<ModelList />}/>
        <Route path="/labs/:id" element={<DocView />}/>
      </Routes>
    </div>
  );
}

export default App;