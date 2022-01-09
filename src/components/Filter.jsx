import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export const  Filter = ({contracts, sortedEmployees, setFilteredEmployees, employees}) => {


    const filteredByContractType = (e) => {
        const filtered = sortedEmployees.filter(emp => {
            console.log(employees);
            // const filteredAgain = emp.contracts.filter(c => {

            // })
          //return emp.position.includes(e.target.innerHTML)
        })      
        setFilteredEmployees(filtered)
      }


    return (
        <div>
            <h3>Fiter by</h3>
            <Autocomplete
                // onChange={filteredByPosition}
                freeSolo
                id="free-solo-2-demo"
                sx={{ minWidth: '200px'}}
                disableClearable
                options={contracts}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Filter by position"
                    // onChange={filteredByPosition}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                    />
                )}
            />
        </div>
    )
}
