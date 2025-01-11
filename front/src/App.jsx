import './App.css'
//import LogIn from './pages/LogIn'

import LogSign from './pages/LogSign'
import Mainpage from './pages/Mainpage'
import EditNote from './pages/EditNote';

function App() {

  function checkSession(session_id)
{

        const formData = new FormData();
        formData.append("id",session_id);

        const req = new XMLHttpRequest();
        
        req.open("POST","http://localhost:2020/session");
        
        req.onload = ()=>
        {
          
          const val = req.responseText=="true";
          if(!val)
          {
            window.localStorage.removeItem("session_id");
          }
          console.log(val);
          if(val && window.location.pathname==='/logsign')
          {
            window.location.pathname = "/";
          }
          else if(!val && window.location.pathname!=='/logsign')
          {
            window.location.pathname = "/logsign";
          }
        }
        
        req.send(formData);
    }


  if(window.localStorage.getItem("session_id")!=null){
    checkSession(window.localStorage.getItem("session_id"));
  }
  else if(window.location.pathname!=='/logsign')
    {
      window.location.pathname = "/logsign";
    }

  let currentPage;
  switch(window.location.pathname)
  {
    case "/logsign":
      currentPage = <LogSign/>;
      break;
    case "/editnote":
      currentPage = <EditNote/>;
      break;
    default:
      currentPage = <Mainpage/>;
  }

  return (
    <>
    {currentPage}
    </>
  );
}

export default App
