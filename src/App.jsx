import './App.css';
import Header from './components/header/Header';
import {items} from './code-cafe-resources/items';
import Home from './components/home/Home';

function App() {

  return (
    <>
      <Header>Code Café</Header>
      <Home items={items}/>
    </>
  );
}

export default App
