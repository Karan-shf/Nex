import { useNavigate } from "react-router-dom";
import {  useTopBarContext } from "../../contexts/TopBarContext";



const TopBar = () => {

    const {hasBackward , title} = useTopBarContext()
    const navigate = useNavigate();

    const GoBack = () => {
      navigate(-1); 
    };

    return (
        <div className="px-6 py-3 flex gap-4">

            {hasBackward &&
                <button onClick={()=>{GoBack()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>        
            }

            <h1 className="text-xl font-semibold">{title}</h1>

            
        </div>
    )
}

export default TopBar