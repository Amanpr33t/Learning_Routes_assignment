
import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Filters from './components/Filters';
import { useSelector } from 'react-redux';

function App() {
  const isBlur = useSelector(state => state.Blur.isBlur)
  return (
    <div className="App">
      <Navbar />
      <Body />
      {isBlur && <Filters />}
    </div>
  );
}

export default App;
