import './ItemEdit.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useInitialiseMenu} from "../context/MenuContext.jsx";


const ItemAdd = () => {
    const initialiseMenuItem = useInitialiseMenu();
    const [categories, setCategories] = useState([]);
    const [ingredientsTags, setIngredientsTags] = useState([]);
    const [currImage, setCurrImage] = useState();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

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

    const handleAddItem = async (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target); 
        await handleUpload(event);
        const item = { 
            name: formData.get('name'),
            image: file.name,
            cost: formData.get('cost'),
            ingredients: ingredientsTags,
            description: formData.get('description'),
            category: formData.get('category'),
        }
    
        console.log(item);
    
        axios.post('http://127.0.0.1:5000/manager/add_menu_item', item)
            .then(response => {
                console.log(response);
                navigate('/manager/menu');
            })
            .catch(error => { 
                console.error('Error submitting data:', error);
            });

        axios.get('http://127.0.0.1:5000/customer/showMenu')
            .then(response => {
                const data = response.data;
                console.log(data);
                initialiseMenuItem(data);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/manager/upload_image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    };


        const fileToDataUrl = async (file) => {
            const reader = new FileReader();
            const dataUrlPromise = new Promise((resolve, reject) => {
              reader.onerror = reject;
              reader.onload = () => resolve(reader.result);
            });
            reader.readAsDataURL(file);
            return dataUrlPromise;
          };


        const handleItemImage = async (event) => {
            const inputElement = event.target;
            const file = inputElement.files[0];
        
            if (file) {
                try {
                    const url = await fileToDataUrl(file);
                    setCurrImage(url);
                } catch (error) {
                    alert(error);
                }
            }
        };

    const handleFileChange = (e) => {
        handleItemImage(e);
        setFile(e.target.files[0]);
    };

    const handleKeyDown = (e) => { 
        if (e.key !== " ") { 
            return;
        }
        const value = e.target.value;
        if (!value.trim()) { 
            return; 
        }
        setIngredientsTags([
            ...ingredientsTags, value
        ])
        console.log(ingredientsTags)
        e.target.value = '';
    }

    const removeIngredient = (index) => { 
        setIngredientsTags(ingredientsTags.filter((el, i) => i !== index))
    }

    return (
        <form className='item' onSubmit={event => handleAddItem(event)}>
            <div className="image">
                {currImage && <img src={currImage} className='item-image' alt="food image" />}
                <input type='file' name="image" onChange={handleFileChange}/>
            </div>
            <div className='item-details-container'>
                <label>Item name</label>
                <input type="text" className='item-name' name="name"/>
                <label>Item Category</label>
                <select name="category">
                    {
                        categories.map((category, index) => { 
                            return <option key={index} value={category.id}>{category.name}</option>;
                        })
                    }
                </select>
                <label>Item price</label>
                <input type="number" min="0" step="0.01" name="cost" className='item-price'/>
                <label>DESCRIPTION</label>
                <input type="text" name="description"/>
                <label>INGREDIENTS</label>
                <div className='ingredients-tags' name="ingredients">
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
