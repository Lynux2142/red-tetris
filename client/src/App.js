import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Customers />
      </header>
    </div>
  );
}

export default App;
