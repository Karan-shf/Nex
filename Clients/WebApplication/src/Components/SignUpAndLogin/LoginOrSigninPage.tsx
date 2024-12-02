import { useNavigate } from "react-router-dom"
import logo from "../../assets/images/LogoNex.png"
import ModalButton from "../ModalButton/ModalButton"
import Login from "./Login"
import Signup from "./Signup"


const LoginOrSigninPage = () => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 place-items-center bg-base-100 my-10">
            <div className="w-2/3">
                <img src={logo} />
            </div>

            <div className="md:block flex flex-col items-center ">
                
                <h1 className="text-primary md:text-8xl text-4xl mb-4 font-bold h-fit" >
                    This is 
               
                   <span className="md:block text-neutral"><span className="text-primary"> D</span>ifferent</span>

                </h1>

                <p className="md:text-4xl text-2xl font-semibold mb-10">Join today</p>

                <div className=" flex flex-col w-72 justify-center">
                    <ModalButton id="signup" additionalCss="text-2xl text-black bg-white  py-2 mb-2 rounded-full w-full"  title="Create Account"/>
                    <Signup/>
                    <div className="flex text-accent mb-2 items-center gap-3 justify-center">
                        <hr className=" w-full"></hr>
                        <p className="text-neutral">or</p>
                        <hr className=" w-full"></hr>
                    </div>
                    <ModalButton id="login" additionalCss="text-2xl bg-primary  py-2  rounded-full w-full"  title="Login"/>
                    <Login/>
                </div>
            </div>

        </div>
  )
}

export default LoginOrSigninPage