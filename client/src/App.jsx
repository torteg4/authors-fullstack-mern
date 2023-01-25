import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import DisplayList from './components/DisplayList';
import UpdateForm from './components/UpdateForm';


function App() {
  return (
    <div className="App">
      <h1>Favorite authors</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/authors/new" element ={<Form />}/>
          <Route path="/authors" element ={<DisplayList />}/>
          <Route path="/authors/update/:id" element={<UpdateForm />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
};
export default App;
