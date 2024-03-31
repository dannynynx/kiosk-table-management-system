import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import React from "react";
import PropTypes from "prop-types";

const TopBar = ({onCategorySelect}) => {
    const tablenumber = localStorage.getItem('tablenumber');
    const [categories, setCategories] = React.useState([]);
   
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
    },[]);


    return (
        <>
            <div className="topbar">
                <img className="logo" src={zebra} alt='Zebra Icon'></img>
                <div className="categories">
                    <button onClick={() => onCategorySelect(null)}><h2 className="all">All</h2></button>
                        {categories.map((category) => (
                            <button key={category.id} onClick={() => onCategorySelect(category.name)}>
                                <h2 className="category" id={category.id}>{category.name}</h2>
                            </button>
                        ))}
                </div>
                <h2 className="table-number">#{tablenumber}</h2>
            </div>
           
        </>
    );
};

TopBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default TopBar;