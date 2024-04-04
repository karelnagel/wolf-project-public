import React, { useState } from "react";
import Datepicker, { DateType, DateValueType } from "react-tailwindcss-datepicker";



export const AddTask = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState<DateType>();

    const handleValueChange = (newValue: DateValueType) => {
        console.log("NewValue:", newValue),
            setDeadline(newValue?.startDate)
        console.log("Value:", deadline)
    }

    return (<>
        <form className="flex flex-col items-center gap-2">
            <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Datepicker useRange={false} asSingle={true} value={{startDate:deadline||null,endDate:deadline||null}} onChange={handleValueChange} />
        </form>

    </>
    )


}