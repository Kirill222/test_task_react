export const ActiveContracts = ({contracts}) => {
    return (


        <div>
            {
            contracts.map(c => {
                return (
                    <div className="active-contract" key={Math.random()}>
                        {/* <div className="type">{c.contractType}</div> */}
                        <div className="duration">
                            <p>{`From ${c.from}`} - {c.to ? `To ${c.to}` : '...'}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
        

        
    )
}
