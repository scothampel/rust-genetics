import React from 'react';
import './css/AddGene.css';
import GeneList from './GeneList';

export default function AddGene(props) {

    const onGeneListChange = props.onGeneListChange;
    const geneList = props.geneList;
    const onNewGeneChange = props.onNewGeneChange;
    const newGene = props.newGene;

    const handleAddGene = (e) => {
        e.preventDefault();
        const target = document.querySelector('#newGene');
        const value = target.value.toUpperCase();
        if (RegExp('^[GYHWX]{6}$').test(value)){
            if(!geneList.includes(value)){
                onGeneListChange(value, false);
                //setNewGene('');
                onNewGeneChange('');
            }
            else{
                //TODO: use bootstrap alert
                alert('That gene is already in the list!')
            }
        }
        else{
            //TODO: use bootstrap alert
            alert('Invalid gene!');
        }
    }

    const handleRemoveGene = (gene) => {
        onGeneListChange(gene, true);
    }

    const handleChange = ({target}) => {
        const value = target.value.toUpperCase();
        if (RegExp('^$|^[GYHWX]{1,6}$').test(value)){
            onNewGeneChange(value);
        }
        else{
            onNewGeneChange(newGene);
        }
    }

    return (
        <div className='AddGene col-md-3 pt-3 pb-3 cointainer-fluid'>
            <ul className='list-group'>
                <form className='list-group-item' onSubmit={handleAddGene}>
                    <div className='input-group'>
                        <input type='text' className='form-control' id='newGene' onChange={handleChange} value={newGene} placeholder='Enter a new gene here'/>
                        <button type='submit' className='btn btn-outline-dark'>Add</button>
                    </div>
                </form> 
                <GeneList geneList={geneList} onRemoveGene={handleRemoveGene} />
            </ul>
        </div>
    )
}
