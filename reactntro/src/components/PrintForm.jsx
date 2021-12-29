import {useState,useEffect} from 'react'
import {Form} from '../components/Form.jsx'
import {ShowForm} from '../components/ShowForm.jsx'
import {nanoid} from 'nanoid'
import "../components/print.css";


export const PrintForm = () =>{
    const [list,setList]=useState([]);

    useEffect(() =>{
        getTodo()
    },[])

    const getTodo = () => {
        fetch("http://localhost:5000/api/form")
          .then((d) => d.json())
          .then((res) => {
            setList(res);
          });
      };

    const handleData = async (form) =>{
        const payload ={
            id: nanoid(7),
            username:form.username,
            age:form.age,
            address:form.address,
            salary:form.salary,
            department:form.department,
            MaritalStatus:form.MaritalStatus,
        };
        setList([...list,payload]);

        try{

            let res = await fetch("http://localhost:5000/api/form",{
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            let data = await res.json();
            console.log(data);

        }catch(e){
            console.log(e);
        }
    }
    console.log(list)

    
    const handleDelete = async(id) => {
        setList(list.filter(list => list.id !== id));

    await fetch(`http://localhost:5000/api/form/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        });
    };

    const handleSort = () => {
        var sortedlist = list.sort((a,b)=>b.salary-a.salary)
        setList(sortedlist);
        console.log(sortedlist);
    }

    return(
        <>
        
        <Form getData={handleData}/> 
        
            <table className="td" >
                <tr  
                style={{
                border: "1px solid black",
                width: "100%",
                flex: 1,
                display: "flex",
                }}>
                    <td>Employee Id</td>
                    <td style={{marginLeft:"1%"}}>Name</td>
                    <td style={{marginLeft:"1%"}}>Age</td>
                    <td style={{marginLeft:"1%"}}>Salary</td>
                    <td style={{marginLeft:"1%"}}>Address</td>
                    <td style={{marginLeft:"1%"}}>Department</td>
                    <td style={{marginLeft:"1%"}}>Marital Status</td>
                    <button style={{marginLeft:"1%"}} onClick={handleSort}>Sort</button>
                </tr>
            </table>
          
        {list.map((e) => (
           <ShowForm key={e.id} {...e}
           handleDelete={handleDelete}
           />
        ))}
        </>
    )
}