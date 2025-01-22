import { useState } from "react"
import AdminReportViewer from "./AdminReportViewer"

const AdminPostReportManage = () => {
    const [state , setState] = useState<"pending"|"history">("pending")
    return (
        <div>
            <button className="mx-10 px-6 py-2 rounded-xl bg-primary my-10" onClick={()=>{state=="pending" ? setState("history") : setState("pending")}}>{state}</button>
            
            {state=="pending" ? <AdminReportViewer time="pending" type="post" />
                             :  <AdminReportViewer time="history" type="post" />
            }
        </div>
    )
}

export default AdminPostReportManage