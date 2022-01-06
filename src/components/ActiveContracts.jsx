export const ActiveContracts = ({contracts}) => {
    return (


        <div>
            {
            contracts.map(c => {
                return (
                    <div className="active-contract" key={Math.random()}>
                        <div className="type">{c.contractType}</div>
                        <div className="duration">
                            <p>{c.from} - {c.to ? c.to : '...'}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
        

        
    )
}
