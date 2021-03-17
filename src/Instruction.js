import React from 'react'

export default function Instruction(props) {

    const directions = props.directions;
    const onCompletedStep = props.onCompletedStep;
    //const steps = [['Crossbreed the near perfect clone YGHHGY with clones WHYXYG and HWYYGX', 'YGYHGY']];

    const handleClick = ({target}) => {
        onCompletedStep(target.dataset.gene);
    }

    return (
        directions.map((step, index) => {
            return (
                <div className='col-md-4 mb-3' key={index}>
                    <div className='card bg-white h-100'>
                        <div className='card-body'>
                            <h5 className='card-title'>{step[2] === -2 ? 'Success!' : `Step ${index + 1}`}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{step[1]}</h6>
                            <p className='card-text'>{step[0]}</p>
                            {!(step[2] === -1 || step[2] === -2) ? <button className='btn btn-success' data-gene={step[1]} onClick={handleClick}>Step Completed</button> : ''}
                        </div>
                    </div>
                </div>
            )
        })

    )
}
