import { useSearchParams } from "react-router-dom";
import DateRangePicker from "../DatePicker/DateRangePicker";
import { useEffect, useState } from "react";

const SearchController = () => {
    const [searchParams, setSearchParams] = useSearchParams(); 
    let [startDate,setStartDate] = useState<string | null>(null);
    let [endDate,setEndDate] = useState<string | null>(null);

    const addDynamicParam = (newKey:string, newValue:string) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set(newKey, newValue); // Add or update the key
        setSearchParams(updatedParams); // Apply the updated params
    };
      
    useEffect(()=>{
        console.log("sth3" , endDate?.toString())
        addDynamicParam("endDate",endDate ?? "")
    },[endDate])

    useEffect(()=>{
        console.log("sth2" , startDate?.toString())
        addDynamicParam("startDate",startDate ?? "")
    },[startDate])


    return (
        <div>
            <p>Time Period Filter</p>
            <DateRangePicker startDate={startDate??''} endDate={endDate??''} setStartDate={setStartDate} setEndDate={setEndDate} />
            {/* <button onClick={()=>{addDynamicParam("startDate",startDate ?? "");addDynamicParam("endDate",endDate ?? "")}}  className="px-6 py-1 rounded-full border-2 border-primary text-primary">Go</button> */}
        </div>
    )
}

export default SearchController