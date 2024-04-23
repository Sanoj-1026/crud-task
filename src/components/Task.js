import React, { useEffect, useState } from 'react'
import Card from './Card';

const Task = () => {
    const[name,setName] = useState('');
    const[description,setDescription] = useState('');
    const[filterStatus, setFilterStatus] = useState(null);
    const initialData = [
        {
            name:"Task-1",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            status:'Not Completed'
        },
        {
            name:"Task-2",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            status:'Completed'
        }
    ];
    const savedCardData = JSON.parse(localStorage.getItem('cardData')? localStorage.getItem('cardData') : null);
    const [cardData,setCardData] = useState(savedCardData ?  savedCardData : initialData);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const addTodoData = (e) => {
        e.preventDefault(); 

        if (name && description) {
            const newTodo = {
                name: name,
                desc: description,
                status: 'Not Completed'
            };

            console.log(newTodo,"newtodo")
            setCardData([...cardData, newTodo]);
            localStorage.setItem('cardData', JSON.stringify([...cardData, newTodo]));
            // Clear input fields after adding todo
            setName('');
            setDescription('');
            window.location.reload();
        }
    };

    // useEffect(() => {
    //     console.log(filterStatus,"filter sttauys")
    //     if(filterStatus === 'Not Completed' || filterStatus === 'Completed' ) 
    //     {
    //       let data = cardData.filter(task => task.status === filterStatus) ;
    //       console.log(data,"data")
    //       localStorage.setItem('filterCardData', JSON.stringify(data));
    //     }
    // },[filterStatus])

    const handleStatusChange = (e) => {
        setFilterStatus(e.target.value);
    }

  return (
    <div  className='container pt-5'>
        <div className='fs-4 fw-bold pb-5'>My Todo</div>
        <div className='d-flex justify-content-center'>
            <form onSubmit={addTodoData}>
                <div className='d-flex gap-3 w-75'>
                    <input type='text' placeholder='Todo name'  value={name} className='w-100 form-control border'  onChange={handleNameChange} />
                    <input type='text' placeholder='Todo description' className='w-100 form-control border' value={description} onChange={handleDescriptionChange} />
                    <button type="submit" className='btn btn-success w-75'>Add Todo</button>
                </div>
            </form>
        </div>
        <div className='pt-5'>
            <div className='d-flex justify-content-between'>
                <div><h5>My Todo </h5></div>
                <div className='d-flex  gap-2'>
                    <h5>Status Filter:</h5>  
                    <select name="status" id="status" onChange={(e) => handleStatusChange(e)}>
                        <option value="All" >All</option>
                        <option value="Completed" >Completed</option>
                        <option value="Not Completed" >Not Completed</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='py-5'>
            <Card data={cardData} setData={(e) => setCardData(e)}/>
        </div>
    </div>
  )
}

export default Task;