import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import React from "react";
import { useFilterMenuItems } from "../context/MenuContext";

const TopBar = ({tablenumber}) => {

    const [categories, setCategories] = React.useState([]);
    const filter = useFilterMenuItems(); 
   
    React.useEffect(() => {
        const getCategories = async () => {
            try {
                const list = [];
                const response = await axios.get('http://127.0.0.1:5000/customer/get_all_categories');
                for (const category of response.data) { 
                    list.push({
                        id: category.category_id,
                        name: category.name,
                    })
                }
                setCategories(list);
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }; 
        getCategories();
    });


    return (
        <>
            <div className="topbar">
                <img className="logo" src={zebra}></img>
                <div className="categories">
                    <button><h2 className="all">All</h2></button>
                {categories.map((category, key) => (
                        <button onClick={() => filter(category.name)}><h2 className="category" id={category.id} >{category.name}</h2></button>
                    
                ))}
                </div>
                <h2 className="table-number">#{tablenumber}</h2>
            </div>
           
        </>
    );
};

export default TopBar;