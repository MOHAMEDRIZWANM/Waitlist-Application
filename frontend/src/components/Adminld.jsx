import React, { useState, useEffect } from 'react';
import '../styles/Adminld.css';
import Backdrop from '@mui/material/Backdrop';
import { getAllUsers, verifyUser, deleteUser, updateUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminld = () => {
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const allUsers = await getAllUsers();
                setVerifiedUsers(allUsers.verifiedUsers.filter(user => user.verified));
                setUnverifiedUsers(allUsers.unverifiedUsers.filter(user => !user.verified));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const handleVerifyUser = async (user) => {
        setLoading(true);
        try {
            const t = await verifyUser(user.email);
            setUnverifiedUsers(unverifiedUsers.filter(u => u._id !== user._id));
            setVerifiedUsers([...verifiedUsers, { ...user, verified: true }]);
            if (t.data === 'Account verified and added to waitlist successfully. Referral Code is mailed to the client mail' || t.data === 'Contest Completed') {
                toast.success('User verified!');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
        setLoading(false);
    };

    const handleDeleteUser = async (user, type) => {
        setLoading(true);
        try {
            const t = await deleteUser(user.email);
            if (type === 'verified') {
                setVerifiedUsers(verifiedUsers.filter(u => u._id !== user._id));
            } else {
                setUnverifiedUsers(unverifiedUsers.filter(u => u._id !== user._id));
            }
            if(t.data === 'User deleted successfully.'){
                toast('User deleted!');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setLoading(false);
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log('Updating user:', editingUser.email, userDetails);
            const t = await updateUser({
                email: editingUser.email,
                userDetails: userDetails
            });
            setVerifiedUsers(verifiedUsers.map(user => (user._id === editingUser._id ? { ...user, ...userDetails } : user)));
            setEditingUser(null);
            setUserDetails({});
            if(t.data === "User updated") {
                toast.success('User updated!');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        toast('Logging out');
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "")
                .split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
        window.location.reload()
        window.location.href = "/"
        window.history.pushState(null, "", "/")
    };

    return (
        <div className='admin-list'>
            <h1 className='heading'>Admin Waiting List</h1>
            <button className='bton logout-button' onClick={handleLogout}>Logout</button>
            <div className='table-container'>
                <h2>Verified Users</h2>
                <table className='waiting-list-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Referral Code</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifiedUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.referralCode}</td>
                                <td>{user.position}</td>
                                <td>
                                    <button className='bton' onClick={() => handleDeleteUser(user, 'verified')} disabled={loading}>
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                    <button className='bton' onClick={() => setEditingUser(user)} disabled={loading}>
                                        {loading ? 'Editing...' : 'Edit'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='table-container'>
                <h2>Unverified Users</h2>
                <table className='waiting-list-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Referred By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unverifiedUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.referredBy}</td>
                                <td>
                                    <button className='bton' onClick={() => handleVerifyUser(user)} disabled={loading}>
                                        {loading ? 'Verifying...' : 'Verify'}
                                    </button>
                                    <button className='bton' onClick={() => handleDeleteUser(user, 'unverified')} disabled={loading}>
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingUser && (
                <div className='edit-user-modal'>
                    <h2>Edit User</h2>
                    <form onSubmit={handleUpdateUser}>
                        <label>
                            Name:
                            <input
                                type='text'
                                value={userDetails.name || editingUser.name}
                                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type='email'
                                value={userDetails.email || editingUser.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            />
                        </label>
                        <button className='bton' type='submit' disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button className='bton' type='button' onClick={() => setEditingUser(null)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            <ToastContainer
                position='top-center'
                autoClose={2000}
                theme='dark'
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                {loading && (
                    <div className="loader-wrapper">
                        <div className='loader'>
                            <div className='loader loader-inner'></div>
                        </div>
                    </div>
                )}
            </Backdrop>
        </div>
    );
};

export default Adminld;
