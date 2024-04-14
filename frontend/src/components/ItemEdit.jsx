import './ItemEdit.css';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext.jsx";
import axios from 'axios';


const ItemEdit = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const id = parseInt(queryParams.get('param'),10);
    const getMenu = useMenu();
    const [categories, setCategories] = useState([]);
    const item = getMenu.find(item => item.id === id);
    const { name, description, price, ingredients, image } = item;
    const formattedPrice = price.toFixed(2);
    const [ingredientsTags, setIngredientsTags] = useState([...ingredients]);
    const [currImage, setCurrImage] = useState(image);


    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customer/get_all_categories')
            .then(response => {
                const list = response.data.map(category => ({
                    id: category.category_id,
                    name: category.name,
                }));
                setCategories(list);
                console.log(categories)
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    }, []);




    const handleEditItem = () => { 
        //send to backend
    }

    const handleItemImage = (event) => { 
        setCurrImage(URL.createObjectURL(event.target.files[0]))
        //send 
    }

    const handleKeyDown = (e) => { 
        if (e.key !== "Enter") { 
            return;
        }
        const value = e.target.value;
        if (!value.trim()) { 
            return; 
        }
        setIngredientsTags([
            ...ingredientsTags, value
        ])
        e.target.value = '';
    }

    const removeIngredient = (index) => { 
        setIngredientsTags(ingredientsTags.filter((el, i) => i !== index))
    }

    return (
        <form className='item' onSubmit={handleEditItem}>
            <div className="image">
                {image && <img src={currImage == image ? `data:image/png;base64,${image}` : currImage} className='item-image' alt={name} />}
                <input type='file' onChange={handleItemImage} accept='image/jpeg, image/png'/>
            </div>
            <div className='item-details-container'>
                <label>Item name</label>
                <input type="text" className='item-name' defaultValue={name}/>
                <label>Item Category</label>
                <select>
                    {
                        categories.map((category, index) => { 
                            return <option key={index} value={category.id}>{category.name}</option>;
                        })
                    }
                </select>
                <label>Item price</label>
                <input type="number" min="0" step="0.01" className='item-price' defaultValue={formattedPrice}/>
                <label>DESCRIPTION</label>
                <input type="text" defaultValue={description}/>
                <label>INGREDIENTS</label>
                <div className='ingredients-tags'>
                    {ingredientsTags.map((tag,index) => (
                        <div className='tag-item' key={index}>
                            <span className='text'>{tag}</span>
                            <span className='close' onClick={() => removeIngredient(index)}>x</span>
                        </div>
                    ))}
                    <input type='text' className='tags-input' placeholder='add ingredient by typing and entering' onKeyDown={handleKeyDown}/>
                </div>
                <button type="submit" className='edit-btn'>Save details</button>
            </div>  
        </form>
    )
}

export default ItemEdit;
