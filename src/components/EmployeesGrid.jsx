import {useState} from 'react'
import { Link } from "react-router-dom"
//Table
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
//Datepicker
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
//Dropdown
import Autocomplete from '@mui/material/Autocomplete'
//Custom components
import {ActiveContracts} from './ActiveContracts'
import { Filter } from "../components/Filter"



export const  EmployeesGrid = ({employees, positions, contracts}) => {

  

    //Dates states
    const [value, setValue] = useState(new Date())
    //Handle change for DesktopDatePicker component
    const handleChange = (newValue) => {
      setValue(newValue)      
    }

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

    const filteredByPosition = (e) => {
      const filtered = sortedEmployees.filter(emp => {
        return emp.position.includes(e.target.innerHTML)
      })      
      setFilteredEmployees(filtered)
    }

    return (

        <>
          {/* <Filter contracts={contracts} sortedEmployees={sortedEmployees} setFilteredEmployees={setFilteredEmployees} employees={employees} /> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">
                    <TextField id="outlined-basic" label="Search by name" variant="outlined" onChange={filteredByName} />
                  </TableCell>
                  <TableCell align="center">
                  <Autocomplete
                    onChange={filteredByPosition}
                    freeSolo
                    id="free-solo-2-demo"
                    sx={{ minWidth: '200px'}}
                    disableClearable
                    options={positions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter by position"
                        onChange={filteredByPosition}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                  </TableCell>
                  <TableCell align="center">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </TableCell>                
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredEmployees.map(e => {
                    return (
                        <TableRow
                          key={e.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{e.id}</TableCell>
                          <TableCell align="left">
                            <Link to={`/details/${e.id}`}>
                              {e.name}
                            </Link>
                          </TableCell>
                          <TableCell align="left">{e.position}</TableCell>
                          <TableCell align="left">
                            <ActiveContracts contracts={e.activeContracts}/>
                          </TableCell>
                        </TableRow>
                    )
                  })
                }              
              </TableBody>
            </Table>
          </TableContainer>

                  {/* Bootstrap version */}
            {/* <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">
                      <TextField id="outlined-basic" label="Filter by name" variant="outlined" onChange={filteredByName} />
                    </th>
                    <th scope="col">
                        <Autocomplete
                        onChange={filteredByPosition}
                        freeSolo
                        id="free-solo-2-demo"
                        sx={{ minWidth: '200px'}}
                        disableClearable
                        options={positions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Filter by position"
                            onChange={filteredByPosition}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                      />
                    </th>
                    <th scope="col">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                      filteredEmployees.map(e => {
                        return (
                            <tr>
                              <th scope="row">{e.id}</th>
                              <td>
                                <Link to={`/details/${e.id}`}>
                                  {e.name}
                                </Link>
                              </td>
                              <td>{e.position}</td>
                              <td>
                                <ActiveContracts contracts={e.activeContracts}/>
                              </td>
                            </tr>   
                        )
                      })
                    }                         
                </tbody>
            </table>             */}
        </>
    )
}
