import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Body from './components/Body';
import { ThemeProvider } from './components/context/Theme';
import { LoggedInProvider } from './components/context/LoggedInContext';
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LoggedInProvider>
          <NavBar />
          <Body />
        </LoggedInProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
