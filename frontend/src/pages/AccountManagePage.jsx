import './AccountManagePage.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountPreview from '../components/AccountPreview';

const AccountManagePage = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/show_accounts')
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            }
        );
    }, []);

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
                    {accounts.map((account) => (
                        <AccountPreview accountUsername={account.username} accountPassword={account.password} accountRole={account.role} accountLogoutCode={account.logout_code}></AccountPreview>))}
                    <button className='account-manage-new-account-button'>Create Account</button>
                </div>
            </section>
        </>
    );
};

export default AccountManagePage;