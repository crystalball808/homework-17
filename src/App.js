import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';

function App() {
  return (
      <div className="wrapper">
        <Timer step={221} onTick={(time) => console.log("Залишилось часу: " + time)} onTimePause={()=>console.log('Таймер на паузі!')} />
        <Timer time={5000} onTimeStart={()=>console.log('Таймер запущено!')} onTimeEnd={()=>console.log('Час вийшов!')}/>
        <Timer autostart={true} />
      </div>
  );
}

export default App;
