import '../src/App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../src/components/dashboard/Dashboard';
import Login from '../src/components/login/Login';
import Report from '../src/components/report/Report';
import Edit from '../src/components/edit/Edit'
import NotFound from '../src/NotFound';
import useToken from './useToken';
import Header from "../src/components/header/Header"
import Footer from "../src/components/footer/Footer"
import { Report_Route } from '../src/components/dashboard/Dashboard';
import { Edit_Route } from '../src/components/edit/Edit';

function App() {
  const { token, setToken } = useToken();
   

  if(!token) {
    <html>
    <p> this login has failed</p>
    </html>
    return <Login setToken={setToken} />  
  }

  return (
    <div className="wrapper app">
      <BrowserRouter>
        <Header />
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard">
                <Dashboard />
              </Route>

            <Route path={Report_Route(':quizName')} >
              <Report />
            </Route>

            <Route path={Edit_Route(':quizName')} >
              <Edit />
            </Route>

            <NotFound />
            
          </Switch>       
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;