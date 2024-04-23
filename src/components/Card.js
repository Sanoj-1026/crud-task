import React, { useEffect, useState } from 'react'

const Card = ({data,setData}) => {
  const[edit,setEdit] = useState(null);
  const [cardData,setCardData] = useState(data)

  const onDeleteClick = (index) => {
    const copyArray = [...cardData]; 
    if (index > -1) {
        copyArray.splice(index, 1);
        setCardData(copyArray);
        setData(copyArray); 
        localStorage.setItem('cardData', JSON.stringify(copyArray));
    }
};

  const handleStatusChange = (e, index) => {
    const newStatus = e.target.value;
    const updatedCardData = [...cardData]; 
    updatedCardData[index].status = newStatus;
    setCardData(updatedCardData);
    localStorage.setItem('cardData', JSON.stringify(updatedCardData));
  };
  useEffect(() => {
    // Update cardData state when the data prop changes
    setCardData(data);
  }, [data]);

  return (
    <div className='d-flex flex-wrap'>
        {cardData && cardData?.length > 0 && cardData?.map((d,index) => {
            return(
            <div className='col-md-4 text-start p-2' key={index}>
              <div className='card p-3 h-100'>
                <div className='pb-2'> Name : {d?.name}</div>
                <div className='pb-2'> Description : {d?.desc}</div>
                {
                  edit !== index && (<div className='pb-2'> Status: {d?.status}</div>)
                }
                {
                  edit === index && (
                    <div>
                        Status :  <select name="status" id="status" onChange={(e) => handleStatusChange(e, index)}>
                                    <option value="Completed" selected={d?.status === "Completed"  ? true : false}>Completed</option>
                                    <option value="Not Completed" selected={d?.status === "Not Completed"  ? true : false}>Not Completed</option>
                                  </select>
                    </div>
                  )
                }
                 {
                  edit !== index && (
                <div className='d-flex justify-content-end gap-3 pt-4'>
                  <button className='btn btn-success btn-width' onClick={() => setEdit(index)}>Edit</button>
                  <button className='btn btn-warning btn-width' onClick={() => onDeleteClick(index)}>Delete</button>
                </div>)}
                {
                  edit === index && (
                <div className='d-flex justify-content-end gap-3 pt-4'>
                  <button className='btn btn-success btn-width' onClick={() => setEdit(null)}>Save</button>
                  <button className='btn btn-warning btn-width' onClick={() => setEdit(null)}>Cancel</button>
                </div>)}
              </div>
            </div>
            );
        })}
        
    </div>
  )
}

export default Card