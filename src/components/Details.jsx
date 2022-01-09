import {useEffect, useState} from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'
import './Details.css'

export const Details = () => {


    const [data, setData] = useState([])
    const [employees, setEmployees] = useState([])
    
    const [sortedContracts, setSortedContracts] = useState([])

    let { employeeId } = useParams()
    let navigate = useNavigate()
    console.log(employeeId);
    
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

            const emp = newEmployees.filter(empl => {
                return empl.id === parseInt(employeeId)
            })
            console.log(emp[0]);

            setEmployees(emp)  

          }      
          fetchData()
      }, []) 
      console.log(employees);      

      
    const back = () => {
        navigate('/')
    }


    return (
        <div className="details">
            <div className="details-header">
                <h1>Details</h1> 
                <button className="btn" onClick={back}>Back</button>
            </div>
            
            <div className="info">
                <div className="info-block">
                    <h3>General information:</h3>
                    <p>Name: {employees[0] && employees[0].name}</p>
                    <p>Position: {employees[0] && employees[0].position}</p>
                </div>
                <div className="info-block">
                    <h3>Contracts:</h3>
                    <div>
                            {
                                employees[0] && employees[0].activeContracts.sort((a, b) => {
                                        if(new Date(a.from) > new Date(b.from)) { return -1; }
                                        if(new Date(a.from) < new Date(b.from)) { return 1; }
                                        return 0;
                                      }).map(ac => {
                                    return <p>{`${ac.contractType} - from ${ac.from} to ${ac.to ? ac.to : '...'}`}</p>
                                })
                            }
                    </div>
                </div>
            </div>
            
        </div>
    )
}
