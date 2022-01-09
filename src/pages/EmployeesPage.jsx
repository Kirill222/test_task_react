import { useState, useEffect } from "react"
import axios from "axios"
import {EmployeesGrid} from '../components/EmployeesGrid'
import './DetailsPage.css'

export const EmployeesPage = () => {

    const [data, setData] = useState([])
    const [employees, setEmployees] = useState([])
    const [positions, setPositions] = useState([])
    const [contractTypes, setContractTypes] = useState([])   

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'https://my-json-server.typicode.com/1ohnny/test-api/db',
            )      
            setData(result.data)
            
            //create an employee object with relevant information
            const newEmployees = result.data.employees.map(e => {
                //filter the position object of the employee
                const filterPosition = result.data.positions.filter(p => {
                    if (p.id === e.positionId) {
                        return p
                    }
                }) 
                //changing the contract object of the employee 
                const contractsChanged = e.contracts.map(c => {
                    const filterTypes = result.data.contractTypes.filter(t => {
                        return t.id === c.typeId
                    })
                    return {
                        id: c.id,
                        contractType: `${filterTypes[0].name}`,
                        from: c.from,
                        to: c.to,
                    }
                })

                return {
                    id: e.id,
                    name: `${e.surname} ${e.name}`,
                    position: `${filterPosition[0].name}`,
                    activeContracts: contractsChanged,
                }
            })
            setEmployees(newEmployees)
            //positions array
            console.log(result.data)
            const positionsArray = result.data.positions.map(p => {                
                return p.name
            })
            const sortedPositionsArray = positionsArray.sort((a, b) => {
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
              })            
            setPositions(positionsArray)
            //contract types array of positions
            const contractTypesArray = result.data.contractTypes.map(ct => {                
                return ct.name
            })
            const sortedContractTypesArray = contractTypesArray.sort((a, b) => {
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
              })  
            setContractTypes(sortedContractTypesArray) 
          };      
          fetchData()
      }, []) 
      

    return (
        <div className="employees-page">
            <h1>Employees</h1>
            <span style={{fontSize: '10px'}}>Note: As it was not completely clear what contracts should be considered as "active", 
                                            the implementation of filtering the contracts (all/active/inactive) was built based on the following logic:
                                            the contracts with open date were considered to be active. 
                                            So if the person does not have a contract with an open date - his contracts were considered to be inactive.
                                            If the person has at least one contract with open date - this person is displaied in the list, when filter setup is "active"

                                                </span>
            <EmployeesGrid employees={employees} positions={positions} contracts={contractTypes} />
        </div>
    )
}