import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import React from "react";

const TopBar = () => {


    const categories = [];


    React.useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/customer/categories');
                for (const category of response.json()) { 
                    categories.push({
                        id: category.category_id,
                        name: category.name,
                    })
                }
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
                {categories.map((category, key) => (
                        <h2 className="category" id={category.id}>{category.name}</h2>
                    
                ))};
                </div>
            </div>
           
        </>
    );
};

export default TopBar;