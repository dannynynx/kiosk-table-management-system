import './ItemEdit.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext.jsx";
import axios from 'axios';
import trash from "../assets/trash-icon.svg";
import ItemDelete from './ItemDelete.jsx';


const ItemEdit = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const id = parseInt(queryParams.get('param'),10);
    const getMenu = useMenu();
    const [categories, setCategories] = useState([]);
    const item = getMenu.find(item => item.id === id);
    const { name, description, price, ingredients, image, category } = item;
    const formattedPrice = price.toFixed(2);
    const [ingredientsTags, setIngredientsTags] = useState([...ingredients]);
    const [currImage, setCurrImage] = useState(image);
    const navigate = useNavigate();
    const [isDeleteItemPopUpVisible, setDeleteItemPopUpVisible] = useState(false);
    const [file, setFile] = useState(null);


    useEffect(() => {
        console.log(item);
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


    const handleEditItem = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target); 
        handleUpload(event);
        const item = { 
            id,
            name: formData.get('name'),
            image: currImage,
            cost: formData.get('cost'),
            ingredients: ingredientsTags,
            description: formData.get('description'),
            category: formData.get('category'),
        }

        axios.put('http://127.0.0.1:5000/manager/edit_menu_item', item)
        .then(response => {
            console.log(response);
            navigate('/manager/menu');
        })
        .catch(error => { 
            console.error('Error submitting data:', error);
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

    const handleDeleteItem = (e) => { 
        e.preventDefault();
        setDeleteItemPopUpVisible(true);
    }

    const closeDeletePopUp = () => { 
        setDeleteItemPopUpVisible(false);
    }

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
        <form className='item' onSubmit={handleEditItem}>
            <div className="delete-btn">
                <button onClick={handleDeleteItem}><img className='delete-img' src={trash} alt='delete item'/></button>
            </div>
            <div className="image" name="image">
                {image && <img src={currImage} className='item-image' alt={name} />}
                <input type='file' name="image" onChange={handleFileChange}/>
            </div>
            <div className='item-details-container'>
                <label>Item name</label>
                <input type="text" className='item-name' name="name" defaultValue={name}/>
                <label>Item Category</label>
                <select name="category">
                    <option key="0" value="0">No category</option>
                    {
                        categories.map((cate, index) => { 
                            return <option key={index} value={cate.id} selected={category === cate.name ? 'selected' : ''}>{cate.name}</option>;
                        })
                    }
                </select>
                <label>Item price</label>
                <input type="number" min="0" step="0.01" name="cost" className='item-price' defaultValue={formattedPrice}/>
                <label>DESCRIPTION</label>
                <input type="text" name="description" defaultValue={description}/>
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
                <button type="submit" className='edit-btn'>Save details</button>
            </div>  
            {isDeleteItemPopUpVisible && (
                <ItemDelete onClose={closeDeletePopUp} item_id={id} isDeleteItemPopUpVisible={isDeleteItemPopUpVisible}/>
            )}
        </form>
    )
}

export default ItemEdit;
