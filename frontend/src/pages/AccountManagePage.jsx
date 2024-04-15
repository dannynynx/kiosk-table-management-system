import './AccountManagePage.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AccountManagePage = () => {
    // useEffect(() => {
    //     const selectTable = async ()=> {
    //         try {
    //             const response = await axios.get( 'http://127.0.0.1:5000/customer/showTable');
    //             setTables(response.data);
    //         } catch (error) {
    //             console.error('Error submitting data:', error);
    //             return null;
    //         }
    //     }
    //     selectTable().then(() => console.log(tables));
    // }, []);

    return (
        <>
            <section className='account-manage-page'>
                <div className='account-manage-top-bar'>
                    <Link className='account-manage-back-button-container' to="/manager">
                        <input type='button' className='account-manage-back-button' value='Go Back'></input>
                    </Link>
                    <div className='account-manage-title-container'>
                        <h1 className='account-manage-title'>Accounts</h1>
                    </div>
                </div>
                <div className='account-manage-container'>
                </div>
            </section>
        </>
    );
};

export default AccountManagePage;