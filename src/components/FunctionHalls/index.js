import React from "react";
import { useState ,useEffect} from "react";
import HotelCard from "../HotelCard"
import Loading from "../Loading";
import Popup from "reactjs-popup";

import { IoIosOptions } from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md"; // Correct import statement

import './index.css'
import { data } from "react-router-dom";

const Names = {
    loading : "Loading",
    active : "active",
    failure : "failure"
}
const FunctionHalls = (props)=>{ 
    const {SectionDetails} = props

    const [hotelDetails,setHotelDetails] = useState([])
    const [api,setApi] = useState(SectionDetails.api)
    const [showAll,setShowAll] = useState(false)
    const [totalHotels,setTotalHotels] = useState(0)
    const [status,setStatus] = useState(Names.loading)

    useEffect(()=>{
        fetchDetail(api)
    },[api,showAll])

    const fetchDetail = async (api) => {
        const options = {
            method: "GET"
        };
    
        try {
            const response = await fetch(api, options);
    
            if (response.ok) {
                const Data = await response.json();
                if (!showAll && Data.data.length >4){
                    setHotelDetails([...Data.data.slice(0, 4)]);
                }
                else{
                    setHotelDetails([...Data.data])
                }
                setTotalHotels(Data.data.length)
                setStatus(Names.active)
            } else {
                console.log("Failed to fetch, status:", response.status);
            }
        } catch (error) {
            console.log("Unable to make request:", error.message);
        }
    };

    const filterPopup = ()=>{
        return(
            <div>
                <Popup
                    modal
                    trigger={
                        <div className="fh-section-filter" >
                            <IoIosOptions className="fh-filter-option"/>
                            <p className="fh-filter-text">filter</p>
                        </div>
                    }
                >
                {close=>(
                    <div>
                        
                    </div>
                    )
                }
                </Popup>
            </div>
        )
    }
    return(
        <div className="function-hall-section-container">
            <div className="fh-section-header-container">
                <h1 className="fh-section-head">{SectionDetails.name}</h1>
                {
                    filterPopup()
                }
            </div>
            

            <div className={(showAll) ? `fh-card-show-all-true` : `fh-card`}>
            {
                status === Names.loading && <Loading />
            }
            {
                status === Names.active && hotelDetails.map(obj => (
                    <HotelCard key={obj.id} hotelDetails={obj} />
                ))
            }
            </div>
            {
                (status === Names.active && totalHotels > 4 && !showAll &&(
                    <div className="fh-show-all" onClick={ ()=>{setShowAll(!showAll)}}>
                        <MdKeyboardArrowRight />
                        <p>Show all</p>
                    </div>
                ))
            }
            {
                (status === Names.active && totalHotels > 4 && showAll &&(
                    <div className="fh-show-all" onClick={ ()=>{setShowAll(!showAll)}}>
                        <MdKeyboardArrowLeft />
                        <p>Show Less</p>
                    </div>
                ))
            }
        </div>
    )
}
export default FunctionHalls;