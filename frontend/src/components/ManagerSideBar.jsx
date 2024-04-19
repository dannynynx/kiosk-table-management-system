import './ManagerSideBar.css';
import requestBill from '../assets/request-bill-icon.svg';
import PopUp from "./PopUp";
import axios from 'axios';
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import CategoryOrderPopUp from './CategoryOrderPopUp.jsx';
import AddCategoryPopUp from "./AddCategoryPopUp.jsx";
import DeleteCategoryPopUp from './DeleteCategoryPopUp.jsx';
import Reorder from "../assets/reorder.svg";
import add from '../assets/plus-icon.svg';
import trash from "../assets/trash-icon.svg";

const ManagerSideBar = ({ onCategorySelect, editMode }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();
    const [isOrderPopupVisible, setOrderPopupVisible] = useState(false);
    const [isAddPopUpVisible, setAddPopUpVisible] = useState(false);
    const [isDeleteCategoryPopUpVisible, setDeleteCategoryPopUpVisible] = useState(false);

    
    const handleRequestBill = async () => {
        try {
            const data = {
                "table_id": localStorage.getItem('tablenumber'),
                "notification_type": 'bill',
            }
            await axios.post('http://127.0.0.1:5000/customer/notifications/add', data)
        } catch (error) {
            console.log(error)
        }
        setPopupMessage("Please make your way to the counter");
        setPopUpVisible(true);
    };

    const handleOrderButtonClick = () => {
        setOrderPopupVisible(true);
    };

    const handleChangeCategoryName = (category_id, event) => { 
        const newName = event.target.value; 
        const data = { 
            category_id,
            new_name: newName,
        };

        console.log(data)
        axios.put('http://127.0.0.1:5000/manager/edit_category', data)
        .then(response => {
            console.log(response);
        })
        .catch(error => { 
            console.error('Error submitting data:', error);
        });
    }


    const closePopUp = () => {
        setPopUpVisible(false);
        navigate('../kiosk/authentication');
    };
    
    const closeOrderPopup = () => {
        setOrderPopupVisible(false);
    };

    const handleAddCategory = () => { 
        setAddPopUpVisible(true);
    }

    const closeAddPopUp = () => { 
        setAddPopUpVisible(false);
    }

    const handleDeleteCategory = (category_id) => { 
       setDeleteCategoryPopUpVisible(category_id);
    }

    const closeDeletePopUp =() => { 
        setDeleteCategoryPopUpVisible(0);
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customer/get_all_categories')
            .then(response => {
                const list = response.data.map(category => ({
                    id: category.category_id,
                    name: category.name,
                }));
                setCategories(list);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    }, []);

    return (
        <>
            <div className="categories">
                <Link to="/manager/menu">
                    <button onClick={() => {
                        onCategorySelect("");
                        setSelectedCategory(null);
                    }} className={!selectedCategory ? 'selected' : ''}>
                        <h2 className="category">All</h2>
                    </button>
                </Link>
                {editMode == true ? (
                    <div className="edit-options">
                        <button onClick={handleOrderButtonClick}><img className="edit-icon" src={Reorder} alt='Reorder Icon'/></button>
                        <button onClick={handleAddCategory}><img className="edit-icon" src={add} alt='add category Icon'/></button>
                    </div> ) 
                    : ''}
                 {categories.map((category) => (
                    <div key={category.id}>
                        {editMode ? (
                            <div key={category.id} className="edit-cate">
                                <input
                                    name="new_name"
                                    type="text"
                                    defaultValue={category.name}
                                    onBlur={(event) => handleChangeCategoryName(category.id, event)}
                                />
                                <button onClick={() => handleDeleteCategory(category.id)}><img className="delete-cate" src={trash} alt="delete"></img></button>
                         </div>
                        ) : (
                            <Link to="/manager/menu">
                                <button
                                    onClick={() => {
                                        onCategorySelect(category.name);
                                        setSelectedCategory(category.id);
                                    }}
                                    className={selectedCategory === category.id ? 'selected' : ''}
                                >
                                    <h2 className="category" id={category.id}>{category.name}</h2>
                                </button>
                            </Link>
                        )}
                    </div>
                ))}
                {editMode ? (<Link to="/manager/menu">
                                <button
                                    onClick={() => {
                                        onCategorySelect("uncategorised");
                                        setSelectedCategory(0);
                                    }}
                                >
                                    <h2 className="category" id={0}>Uncategorised</h2>
                                </button>
                            </Link>) : ''}
            </div>
            <div className="ManagerSideBar-icon-container" onClick={handleRequestBill}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            {isPopUpVisible && (
                <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
            {isOrderPopupVisible && (
                <CategoryOrderPopUp
                    categories={categories}
                    onClose={closeOrderPopup}
                />
            )}
             {isAddPopUpVisible && (
                <AddCategoryPopUp onClose={closeAddPopUp} isAddPopUpVisible={isAddPopUpVisible}/>
            )}
            {isDeleteCategoryPopUpVisible && (
                <DeleteCategoryPopUp onClose={closeDeletePopUp} category_id={isDeleteCategoryPopUpVisible} isDeleteCategoryPopUpVisible={isDeleteCategoryPopUpVisible}/>
            )}
        </>
    );
};

ManagerSideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default ManagerSideBar;