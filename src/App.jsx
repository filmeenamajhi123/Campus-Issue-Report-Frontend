import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AllIssues from './Pages/AllIssues'
import FormPage from './Pages/FormPage'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import NotFound from './Pages/NotFound'

const PrivateRoute = ({children}) => {
  const isLoggedIn = localStorage.getItem("user");
  return isLoggedIn ? children : <Navigate to="/login" />
}

function App() {
  return (
   <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<PrivateRoute><Home></Home></PrivateRoute>}/>
        <Route path="/form" element={<PrivateRoute><FormPage></FormPage></PrivateRoute>}/>
        <Route path="/all-issues" element={<PrivateRoute><AllIssues></AllIssues></PrivateRoute>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
   </Router>
  )
}

export default App
