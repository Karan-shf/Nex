import { useState } from 'react';
import DatePicker from "react-multi-date-picker";
// import DateObject from "react-date-object";
import DatePanel from 'react-multi-date-picker/plugins/date_panel';


const DateRangePicker = ({setStartDate , setEndDate , startDate , endDate} : {setStartDate : (date:string) => void, setEndDate : (date: string) => void , startDate:string , endDate:string} ) => {
    const [dates, setDates] = useState<[Date | null, Date| null]>([null, null]);

    const handleChange = (value: any , se:"start"|"end") => {
        se == "start" ? setStartDate(value)
                      : setEndDate(value)
    };

    return (
        <div className='mt-6 text-base'>
            <p>Start date</p>
            <DatePicker
                containerClassName='block text-black  mt-2 w-full p-2 rounded-xl border-2 border-darkGray '
                inputClass='bg-base-100 text-white border'
                style={{border:'none'}}
                className='text-white'
                onChange={(e)=> handleChange(e , "start")}
                value={startDate}
                maxDate={endDate}
            />

            <p className='mt-6 text-base'>End date</p>
            <DatePicker
                containerClassName='block text-black  mt-2 w-full p-2 rounded-xl border-2 border-darkGray '
                inputClass='bg-base-100 text-white border'
                style={{border:'none'}}
                className='text-white'
                onChange={(e)=> handleChange(e , "end")}
                value={endDate}
                minDate={startDate}
            />

        </div>
    );
};

export default DateRangePicker;

