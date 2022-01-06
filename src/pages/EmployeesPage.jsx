import { useState, useEffect } from "react"
import axios from "axios"
import {EmployeesGrid} from '../components/EmployeesGrid'

export const EmployeesPage = () => {

    const [data, setData] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'https://my-json-server.typicode.com/1ohnny/test-api/db',
            )      
            setData(result.data)
            
            
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


          };      
          fetchData()
      }, [])      

      console.log(data)
      console.log(employees)  

    return (
        <div>
            <h1>Employees</h1>
            <EmployeesGrid employees={employees} />
        </div>
    )
}