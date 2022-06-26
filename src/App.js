import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Check from './PrivateRoutes/Check';

function App() {
  return (
<>
<Router>
      <Routes>
      <Route exact path="/login" element={<Login/> }/>
      <Route exact path="/home" element={<Check><Home/></Check>}/>
      </Routes>
    </Router>
</>
  );
}

export default App;
