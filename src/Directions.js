import React from 'react';
import './css/Directions.css';
import Instruction from './Instruction';

export default function Directions(props) {

    const directions = props.directions;
    const onGeneChange = props.onGeneChange;

    const handleCompletedStep = (gene) => {
        const value = gene.toUpperCase();
        if (RegExp('^[GYH]{1,6}$').test(value)){
            const geneObj = {
                gene1: value[0],
                gene2: value[1],
                gene3: value[2],
                gene4: value[3],
                gene5: value[4],
                gene6: value[5],
                str: value
            };
            onGeneChange(geneObj);
        }
    }

    return (
        <div className='Directions col-md-9 pt-3 container-fluid row m-0'>
            <Instruction directions={directions} onCompletedStep={handleCompletedStep} />
        </div>
    )
}
