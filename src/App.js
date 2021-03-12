import './css/App.css';
import PerfectInput from './PerfectInput';
import Directions from './Directions';
import AddGene from './AddGene';

function App() {

  const handleGeneUpdate = (genes) => {
    console.log(genes);
  }

  return (
    <div className='container'>
      <PerfectInput onGeneUpdate={handleGeneUpdate} />
      <div className='row m-0'>
        <Directions />
        <AddGene />
      </div>
    </div>
  );
}

export default App;
