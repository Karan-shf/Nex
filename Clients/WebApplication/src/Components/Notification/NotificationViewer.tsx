import { useEffect, useRef, useState } from "react";
import { Notifs } from "../../Interfaces/Interfaces";
import { FindMentions, formatPostsDate } from "../../functions/functions";
import { Link, useNavigate } from "react-router-dom";
import { APILink, splitter } from "../../consts/consts";

interface Props {
  notif: Notifs;
}

const NotificationViewer = ({ notif }: Props) => {
  const postIDRef = useRef<string | undefined>(notif.content.split(splitter)[1]);
  const navigate =useNavigate()
  const [formatted, setFormatted] = useState<{
    mentions: string[];
    parts: string[];
    regex: RegExp;
  }>();

  async function OpenAccount(part:string){
        try {
            const res = await fetch(APILink+"iam/user/idFromUsername/"+part.slice(1), {
                method: "GET",
                headers: {
                "Content-Type": "application/json", 
                "x-auth-token":localStorage.getItem("x-auth-token") ?? ""
                }, 
            });
        
            const result = await res.json(); 
            
            if(result.success){

            }else{

            }
            if (res.ok) {
                console.log("Request successful:", result);
                navigate(`/userProfile/${result}`)
            } else {
                console.log("Request failed:", result);
            }
            } catch (error) {
            console.error("Error occurred:", error);
            }

  }

  useEffect(() => {
    setFormatted(FindMentions(notif.content.split(splitter)[0]));
  }, []);

  const ContentWrapper = postIDRef.current ? Link : "div";
  const wrapperProps = postIDRef.current
    ? { to: `/${postIDRef.current}`, className: "block " }
    : { className: "block" };

  return (
    <ContentWrapper {...wrapperProps} className="">
        <div className="p-5 pb-2 border-y text-lg border-darkGray">
      <div className="flex gap-3 items-center">
        <div className="indicator -z-10">
          {!notif.isSeen && (
            <span className="indicator-item indicator-middle indicator-start badge-sm rounded-full badge-primary"></span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {formatted?.parts.map((part, index) =>
          formatted.regex.test(part) ? (
            <button onClick={()=>{OpenAccount(part)}} key={index} className="text-primary">
              {part}
            </button>
          ) : (
            part
          )
        )}
      </div>
      <p className="text-secondary text-md mt-5">{formatPostsDate(notif.createdAt)}</p>
      </div>
    </ContentWrapper>
  );
};

export default NotificationViewer;
