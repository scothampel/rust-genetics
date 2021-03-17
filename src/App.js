import './css/App.css';
import React, {useState, useEffect} from 'react';
import PerfectInput from './PerfectInput';
import Directions from './Directions';
import AddGene from './AddGene';
import {geneticsDirections} from './genetics';

function App() {

  const [gene, setGene] = useState({
    gene1: '',
    gene2: '',
    gene3: '',
    gene4: '',
    gene5: '',
    gene6: ''
  });
  const handleGeneChange = (gene) => {
    setGene((prev) => {return {...prev, ...gene}});
  }

  const [newGene, setNewGene] = useState('');
  const handleNewGeneChange = (gene) => {
    setNewGene(gene);
  }

  const [geneList, setGeneList] = useState([]);
  const handleGeneListChange = (gene, remove) => {
    if (!remove) {
      setGeneList((prev) => {return [gene, ...prev]});
      setNewGene('');
    }
    else {
      setGeneList((prev) => {return prev.filter((value) => {return value !== gene })});
    }
  }

  const [directions, setDirections] = useState([['Start by inputting your near perfect gene above!', '']]);
  const handleDirectionsChange = (directions) => {
    setDirections(directions);
  }

  useEffect(() => {
    console.log(gene)
    handleDirectionsChange(geneticsDirections(gene, [...geneList].reverse()));
  }, [gene, geneList]);

  return (
    <div className='container'>
      <PerfectInput gene={gene} onGeneChange={handleGeneChange} />
      <div className='row m-0'>
        <Directions directions={directions} onGeneChange={handleGeneChange} />
        <AddGene geneList={geneList} onGeneListChange={handleGeneListChange} newGene={newGene} onNewGeneChange={handleNewGeneChange} />
      </div>
    </div>
  );
}

export default App;
