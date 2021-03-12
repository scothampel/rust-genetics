import React from 'react';
import './css/GeneList.css';

export default function GeneList(props) {
    const geneList = props.geneList;
    const handleRemoveGene = props.handleRemoveGene;

    return (
        geneList.map(gene => {
            return (
                <li className='list-group-item' key={gene}>
                    {gene}
                    <button className='btn btn-sm btn-close float-end' onClick={() => {handleRemoveGene(gene)}}></button>
                </li>
            )
        })
    )
}
