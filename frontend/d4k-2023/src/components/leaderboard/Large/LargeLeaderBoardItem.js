import React from "react";
import Card from "../../UIElements/Card";
import order from "../../../images/icons/order.png"
import donate from "../../../images/icons/donate.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faGlassMartini } from "@fortawesome/free-solid-svg-icons";

const LargeLeaderBoardItem = props => {

    return (
        
            <Card className = "first:rounded-t-3xl last:rounded-b-3xl flex flex-col p-4 border-b-2 text-slate-600 border-emerald-600 bg-slate-100/50 w-full shadow-xl  justify-center">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <div className="text-5xl flex text-slate-600 font-bold italic pr-2">{ props.rank}
                        <span className="text-3xl pr-3">th</span>
                        { props.photoUrl ? 
                            <img 
                            src = { "https://i.pinimg.com/564x/3d/84/8b/3d848b80c538c1e73430a0be61360458.jpg" } 
                            alt = {`user rank ${props.rank}`} 
                            className={ "border-5 shadow-xl drop-shadow-xl rounded-full w-24 h-24" } /> 
                            :
                            <FontAwesomeIcon className="pt-2 text-gray-600 w-20 h-16" icon={faUserAlt} />
                        }
                    </div>                    
                    {/* USER INFO */}
                    <div className="w-1/2">
                        <p className="text-4xl font-bold mb-4">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="text-3xl font-semibold w-4/5 flex items-center">
                        </div>
                    </div>
                    <div className="flex">
                            <FontAwesomeIcon className="mx-1 h-8 text-slate-700" icon={faGlassMartini} />
                                <p className="text-slate-700 text-3xl justify-center italic">{ props.quantity }</p>
                            </div>
                            <div className="w-36">
                    <p className="font-bold text-4xl float-right text-emerald-600">$ { props.total } </p>
                    </div>
                </div>
            </Card>
    )
}

export default LargeLeaderBoardItem