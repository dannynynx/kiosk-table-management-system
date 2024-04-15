import './AccountPreview.css';
import PropTypes from "prop-types";
import editIcon from '../assets/account-edit-icon.svg';
import deleteIcon from '../assets/account-delete-icon.svg';

const AccountPreview = ({ accountUsername, accountPassword, accountRole, accountLogoutCode }) => {
    return (
        <div className='account-preview-container'>
            <div className='account-preview-info-container'>
                <div className='account-preview-information-div'><b>Username:</b>{accountUsername}</div>
                <div className='account-preview-information-div'><b>Role:</b>{accountRole}</div>
                <div className='account-preview-information-div'><b>Password:</b>{accountPassword}</div>
                <div className='account-preview-information-div'><b>Logout Code:</b>{accountLogoutCode}</div>
            </div>
            <div className='account-preview-buttons-container'>
                <button className='account-preview-edit-button'>
                    <img src={editIcon} className='account-preview-edit-icon'></img>
                </button>
                <button className='account-preview-delete-button'>
                    <img src={deleteIcon} className='account-preview-delete-icon'></img>
                </button>
            </div>
        </div>
    );
};

AccountPreview.propTypes = {
    accountUsername: PropTypes.string.isRequired,
    accountPassword: PropTypes.string.isRequired,
    accountRole: PropTypes.string.isRequired,
    accountLogoutCode: PropTypes.string.isRequired,
}

export default AccountPreview;