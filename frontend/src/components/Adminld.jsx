import React, { useState, useEffect } from 'react';
import '../styles/Adminld.css';
import { getAllUsers, verifyUser, deleteUser, updateUser } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Adminld = () => {
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                setVerifiedUsers(allUsers.verifiedUsers.filter(user => user.verified));
                setUnverifiedUsers(allUsers.unverifiedUsers.filter(user => !user.verified));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleVerifyUser = async (user) => {
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
    };

    const handleDeleteUser = async (user, type) => {
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
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();
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
    };

    return (
        <div className='admin-list'>
            <h1 className='heading'>Admin Waiting List</h1>
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
                                    <button className='bton' onClick={() => handleDeleteUser(user, 'verified')}>Delete</button>
                                    <button className='bton' onClick={() => setEditingUser(user)}>Edit</button>
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
                                    <button className='bton' onClick={() => handleVerifyUser(user)}>Verify</button>
                                    <button className='bton' onClick={() => handleDeleteUser(user, 'unverified')}>Delete</button>
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
                        <button className='bton' type='button' onClick={handleUpdateUser}>Save</button>
                        <button className='bton' type='button' onClick={() => setEditingUser(null)}>Cancel</button>
                    </form>
                </div>
            )}
            <ToastContainer
      position='top-center'
      autoClose={2000}
      theme='dark'
      />
        </div>
    );
};

export default Adminld;
