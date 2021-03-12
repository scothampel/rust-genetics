import React, {useState} from 'react';
import './css/AddGene.css';
import GeneList from './GeneList';

export default function AddGene() {

    const [geneList, setGeneList] = useState([]);
    const [newGene, setNewGene] = useState('');

    const handleAddGene = (e) => {
        e.preventDefault();
        const target = document.querySelector('#newGene');
        const value = target.value.toUpperCase();
        if (RegExp('^[GYHWX]{6}$').test(value)){
            if(!geneList.includes(value)){
                setGeneList((prev) => {
                    return [value, ...prev];
                });
                setNewGene('');
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
        setGeneList((prev) => {return prev.filter((value) => {return value !== gene})});
    }

    const handleChange = ({target}) => {
        const value = target.value.toUpperCase();
        if (RegExp('^$|^[GYHWX]{1,6}$').test(value)){
            setNewGene(value);
        }
        else{
            setNewGene((prev) => {return prev});
        }
    }

    return (
        <div className='AddGene col-md-3 pt-3 cointainer-fluid'>
            <ul className='list-group'>
                <form className='list-group-item' onSubmit={handleAddGene}>
                    <div className='input-group'>
                        <input type='text' className='form-control' id='newGene' onChange={handleChange} value={newGene} placeholder='Enter a new gene here'/>
                        <button type='submit' className='btn btn-outline-dark'>Add</button>
                    </div>
                </form> 
                <GeneList geneList={geneList} handleRemoveGene={handleRemoveGene} />
            </ul>
        </div>
    )
}
