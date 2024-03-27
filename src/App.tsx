import './App.css';
import Header from './components/Header/Header';
import ToDo from './components/ToDo/ToDo';

function App() {
  return (
    <>
      <div id='background'></div>
      <div id='content'>
        <Header />
        <main>
          <div id='todo-wrapper'>
            <ToDo />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
