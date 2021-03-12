import React, {useState, useEffect} from 'react';
import './css/PerfectInput.css';

export default function PerfectInput(props) {

    const [genes, setGenes] = useState({
        gene1: '',
        gene2: '',
        gene3: '',
        gene4: '',
        gene5: '',
        gene6: ''
    });

    const handleChange = ({target}) => {
        const value = target.value.toUpperCase()[0];
        if (RegExp('^[GYH]{1}$').test(value)){
            setGenes(prevGenes => {return {...prevGenes, [target.id]: value}});
        }
        else{
            setGenes(prevGenes => {return {...prevGenes, [target.id]: ''}});
        }
    }

    useEffect(() => {
        props.onGeneUpdate(genes);
    }, [props, genes]);

    return (
        <div className='PerfectInput'>
            <h3 className='text-center w-100'>Starting Perfect Gene</h3>
            <form className='row m-0'>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene1' onChange={handleChange} aria-describedby='gene1' maxLength={1} value={genes.gene1} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene2' onChange={handleChange} aria-describedby='gene2' maxLength={1} value={genes.gene2} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene3' onChange={handleChange} aria-describedby='gene3' maxLength={1} value={genes.gene3} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene4' onChange={handleChange} aria-describedby='gene4' maxLength={1} value={genes.gene4} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene5' onChange={handleChange} aria-describedby='gene5' maxLength={1} value={genes.gene5} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene6' onChange={handleChange} aria-describedby='gene6' maxLength={1} value={genes.gene6} />
                </div>
            </form>
        </div>
    )
}
