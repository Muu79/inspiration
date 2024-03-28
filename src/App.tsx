import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';
import { store } from './app/store';

function App() {
  useEffect(() => {
    const localUpdater = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('store', JSON.stringify(state));
      console.log('store updated',JSON.parse(localStorage.getItem('store') || '{}'));
    });
    return () => localUpdater();
  }, [])
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
