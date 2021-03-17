import React from 'react';
import './css/PerfectInput.css';

export default function PerfectInput(props) {

    const onGeneChange = props.onGeneChange;
    const gene = props.gene;

    const handleChange = ({target}) => {
        const value = target.value.toUpperCase()[0];
        if (RegExp('^[GYH]{1}$').test(value)){
            onGeneChange({[target.id]: value});
            
            const nextGene = target.parentElement.nextSibling;
            if(nextGene){
                nextGene.children[0].focus();        
            }
        }
        else{
            onGeneChange({[target.id]: ''});
        }
    }

    return (
        <div className='PerfectInput rounded'>
            <h3 className='text-center w-100'>Starting Near Perfect Gene</h3>
            <form className='row m-0'>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene1' onChange={handleChange} aria-describedby='gene1' maxLength={1} value={gene.gene1} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene2' onChange={handleChange} aria-describedby='gene2' maxLength={1} value={gene.gene2} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene3' onChange={handleChange} aria-describedby='gene3' maxLength={1} value={gene.gene3} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene4' onChange={handleChange} aria-describedby='gene4' maxLength={1} value={gene.gene4} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene5' onChange={handleChange} aria-describedby='gene5' maxLength={1} value={gene.gene5} />
                </div>
                <div className='form-group col-md-2'>
                    <input type='text' className='form-control gene-input text-center' id='gene6' onChange={handleChange} aria-describedby='gene6' maxLength={1} value={gene.gene6} />
                </div>
            </form>
        </div>
    )
}
