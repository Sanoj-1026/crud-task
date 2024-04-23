import React, { useEffect, useState } from 'react'
import Card from './Card';

const Task = () => {
    const[name,setName] = useState('');
    const[description,setDescription] = useState('');
    const[filterStatus, setFilterStatus] = useState('All');
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
    const filteredCardData = JSON.parse(localStorage.getItem('filteredCardData')? localStorage.getItem('filteredCardData') : null);
    const [cardData,setCardData] = useState(savedCardData ?  savedCardData : initialData);
    const [filteredData, setFilteredData] = useState(filteredCardData && filterStatus !== 'All' ?  filteredCardData : cardData);

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

    const handleStatusChange = (e) => {
        setFilterStatus(e.target.value);
        console.log(e.target.value)
        if(e.target.value !== "All") {
            const filtered = cardData?.filter(task => task.status === e.target.value);
            setFilteredData(filtered);
            localStorage.setItem('filteredCardData', JSON.stringify(filtered));
            console.log(filtered)
        }else  {
            setFilteredData(cardData);
            console.log(cardData)
        }
    }

    useEffect(() => {
        // Filter the data based on the selected status filter
        // if (filterStatus === 'All') {
        //     setFilteredData(cardData); // If filter is 'All', display all data
        // } else {
        //     const filtered = cardData.filter(task => task.status === filterStatus);
        //     setFilteredData(filtered); // Set filtered data based on selected status
        // }
    }, [filterStatus, cardData]);

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
                    <select name="status" id="status" onChange={(e) => handleStatusChange(e)} value={filterStatus}>
                        <option value="All" >All</option>
                        <option value="Completed" >Completed</option>
                        <option value="Not Completed" >Not Completed</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='py-5'>
            <Card data={filteredData} setData={(e) => setCardData(e)}/>
        </div>
    </div>
  )
}

export default Task;