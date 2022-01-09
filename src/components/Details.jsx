import {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import './Details.css'
const _ = require('lodash')

export const Details = () => {


    const [data, setData] = useState([])
    const [employees, setEmployees] = useState([])
    // const [certainEmployee, setCertainEmployee] = useState({
    //     id: 19,
    //     name: "Lawrence Tracy",
    //     position: "Vedúci zmeny",
    //     activeContracts: [
    //         {
    //             id: 11,
    //             contractType: "Trvalý pracovný pomer - skrátený",
    //             from: "2020-01-01",
    //             to: "2020-06-30"
    //         },
    //         {
    //             id: 41,
    //             contractType: "Trvalý pracovný pomer - skrátený",
    //             from: "2020-07-01",
    //             to: "2021-06-30"
    //         },
    //         {
    //             id: 42,
    //             contractType: "Trvalý pracovný pomer",
    //             from: "2021-12-15",
    //             to: null
    //         }
    //     ]
    // })
    const [sortedContracts, setSortedContracts] = useState([])

    let { employeeId } = useParams()
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

      
    //   useEffect(()=> {
    //     const emp = employees.filter(e => {
    //         return e.id === parseInt(employeeId)
    //     })
    //     console.log(emp[0]);
    //     setCertainEmployee({
    //         ...emp[0],                 
    //     })        
        
              
    //   }, [employees])
    //   console.log(certainEmployee.activeContracts)
      
      //sort contracts by start date
   

    //   const sortedContractsArray = certainEmployee.activeContracts.sort((a, b) => {
    //     if(new Date(a.from) < new Date(b.from)) { return -1; }
    //     if(new Date(a.from) > new Date(b.from)) { return 1; }
    //     return 0;
    //   })
    //   setSortedContracts(sortedContractsArray)

    //   useEffect(() => {
    //       const sortedContractsArray = certainEmployee.activeContracts.sort((a, b) => {
    //         if(new Date(a.from) < new Date(b.from)) { return -1; }
    //         if(new Date(a.from) > new Date(b.from)) { return 1; }
    //         return 0;
    //       })
    //       setSortedContracts(sortedContractsArray)
    //   }, [certainEmployee])


    return (
        <div className="details">
            <h1>Details</h1>
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
                                employees[0] && employees[0].activeContracts.map(ac => {
                                    return <p>{`${ac.contractType} - from ${ac.from} to ${ac.to ? ac.to : '...'}`}</p>
                                })
                            }
                    </div>
                </div>
            </div>
            
        </div>
    )
}
