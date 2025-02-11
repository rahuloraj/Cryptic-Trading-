import { useRef } from "react"
import { useNavigate } from "react-router";
export default function NotLoggedIn() {
    const navigate = useNavigate();
    const modal =useRef();
    return (
        <div id="myModal" className="modal" ref={modal}>

            <div className="modal-content">
                <span className="close" onClick={()=>{
                    modal.current.style.display="none";
                    navigate("/");
                }}>&times;</span>
                <h3>Sorry,</h3>
                <p>You Have To Be Logged In To View This Section</p>

            </div>
        </div>
    )
}