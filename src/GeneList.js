import React from 'react';
import './css/GeneList.css';

export default function GeneList(props) {
    const geneList = props.geneList;
    const onRemoveGene = props.onRemoveGene;

    const handleClick = ({target}) => {
        onRemoveGene(target.dataset.gene);
    }

    return (
        geneList.map(gene => {
            return (
                <li className='list-group-item' id={gene} key={gene}>
                    {gene}
                    <button className='btn btn-sm btn-close float-end' data-gene={gene} onClick={handleClick}></button>
                </li>
            )
        })
    )
}
