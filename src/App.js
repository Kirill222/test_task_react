import './App.css'
import {EmployeesPage} from './pages/EmployeesPage.jsx'
import {DetailsPage} from './pages/DetailsPage.jsx'

import {
  Routes,
  Route
} from "react-router-dom"


function App() {
  return (
    <div className="App">      
        <Routes>
          <Route path='/' element={<EmployeesPage />} />
          <Route path='/details/:employeeId' element={<DetailsPage />} />
        </Routes>      
    </div>
  );
}

export default App;
