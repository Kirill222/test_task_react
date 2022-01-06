import {useState} from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import {ActiveContracts} from './ActiveContracts'


export const  EmployeesGrid = ({employees}) => {

    const sortedEmployees = employees.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

    const [filteredEmployees, setFilteredEmployees] = useState(sortedEmployees)

    

    const filteredByName = (e) => {
      const filtered = sortedEmployees.filter(emp => {
        return emp.name.includes(e.target.value)
      })      
      setFilteredEmployees(filtered)
    }

    console.log("hey", employees);
    return (

        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">
                    Name
                    <TextField id="outlined-basic" label="Filter by name" variant="outlined" onChange={filteredByName} />
                  </TableCell>
                  <TableCell align="center">
                    Position
                    <TextField id="outlined-basic" label="Filter by position" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    Active contracts
                    <TextField id="outlined-basic" label="Filter by contract" variant="outlined" />
                  </TableCell>                
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredEmployees.map(e => {
                    return <TableRow
                      key={e.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {e.id}
                      </TableCell>
                      <TableCell align="left">{e.name}</TableCell>
                      <TableCell align="left">{e.position}</TableCell>
                      <TableCell align="left">
                        <ActiveContracts contracts={e.activeContracts}/>
                      </TableCell>
                    </TableRow>
                  })
                }              
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}
