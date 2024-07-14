import { useState } from 'react';
import logo from './assets/images/logo.svg';
import Navbar from './components/Navbar';
import FormLogin from './components/FormRegistro';
import FormRegistro from './components/FormRegistro';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <header>
      <Navbar />
      <FormRegistro />
    </header>
  );
};

export default App;
