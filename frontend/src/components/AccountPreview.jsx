import './AccountPreview.css';
import PropTypes from "prop-types";
import editIcon from '../assets/account-edit-icon.svg';
import deleteIcon from '../assets/account-delete-icon.svg';
import { useState } from "react";
import AccountEditPopUp from '../components/AccountEditPopUp';

const AccountPreview = ({ accountId, accountUsername, accountPassword, accountRole, accountLogoutCode }) => {
    const [isEditingAccountVisible, setEditingAccountVisible] = useState(false);

    const handleEditingAccount = () => {
        setEditingAccountVisible(true);
    };

    const closeEditingAccountPopUp = () => {
        setEditingAccountVisible(false);
    };

    return (
        <div className='account-preview-container'>
            <div className='account-preview-info-container'>
                <div className='account-preview-information-div'><b>Username:</b>{accountUsername}</div>
                <div className='account-preview-information-div'><b>Role:</b>{accountRole}</div>
                <div className='account-preview-information-div'><b>Password:</b>{accountPassword}</div>
                <div className='account-preview-information-div'><b>Logout Code:</b>{accountLogoutCode}</div>
            </div>
            <div className='account-preview-buttons-container'>
                <button className='account-preview-edit-button' onClick={handleEditingAccount}>
                    <img src={editIcon} className='account-preview-edit-icon'></img>
                </button>
                <button className='account-preview-delete-button'>
                    <img src={deleteIcon} className='account-preview-delete-icon'></img>
                </button>
            </div>
            {isEditingAccountVisible && (
            <AccountEditPopUp isPopUpVisible={isEditingAccountVisible} onClose={closeEditingAccountPopUp} username={accountUsername} password={accountPassword} role={accountRole} code={accountLogoutCode} id={accountId}/>
            )}
        </div>
    );
};

AccountPreview.propTypes = {
    accountId: PropTypes.number.isRequired,
    accountUsername: PropTypes.string.isRequired,
    accountPassword: PropTypes.string.isRequired,
    accountRole: PropTypes.string.isRequired,
    accountLogoutCode: PropTypes.string.isRequired,
}

export default AccountPreview;