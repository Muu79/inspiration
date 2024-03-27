import './App.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';

function App() {
  return (
    <>
      <div id='background'></div>
      <div id='content'>
        <Header />
        <main>
          <div id='task-wrapper'>
            <TaskContainer />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
