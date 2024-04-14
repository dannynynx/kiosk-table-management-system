import './ItemEdit.css';
import { useState, useEffect } from "react";
import axios from 'axios';


const ItemAdd = () => {
    const [categories, setCategories] = useState([]);
    const [ingredientsTags, setIngredientsTags] = useState([]);
    const [currImage, setCurrImage] = useState();


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




    const handleAddItem = () => { 
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
        <form className='item' onSubmit={handleAddItem}>
            <div className="image">
                {currImage && <img src={currImage} className='item-image' alt="food image" />}
                <input type='file' onChange={handleItemImage} accept='image/jpeg, image/png'/>
            </div>
            <div className='item-details-container'>
                <label>Item name</label>
                <input type="text" className='item-name'/>
                <label>Item Category</label>
                <select>
                    {
                        categories.map((category, index) => { 
                            return <option key={index} value={category.id}>{category.name}</option>;
                        })
                    }
                </select>
                <label>Item price</label>
                <input type="number" min="0" step="0.01" className='item-price'/>
                <label>DESCRIPTION</label>
                <input type="text" />
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
                <button type="submit" className='edit-btn'>Add item</button>
            </div>  
        </form>
    )
}

export default ItemAdd;
