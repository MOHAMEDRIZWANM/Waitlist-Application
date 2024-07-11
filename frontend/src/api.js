import axios from 'axios';

const api_url = 'http://localhost:5000'

axios.defaults.withCredentials = true;

export const signup = async(data) => {
    try {
        const response = await axios.post(`${api_url}/signup`, data)
        return response
    } catch (error) {
        console.error('Error in sign up: ',error)
        return "Error in reaching server"
    }
}

export const signin = async(data) => {
    try {
        const response = await axios.post(`${api_url}/signin`, data)
        return response
    } catch (error) {
        console.error('Error Signing in:', error)
        return "Error in reaching server"
    }
}

export const verifyOTP = async (data) => {
    try {
        const response = await axios.post(`${api_url}/verify-otp`, data)
        return response
    } catch (error) {
        console.error('Error verifying OTP:', error)
        return "Error in reaching server"
    }
}

export const forgotPass = async(data) => {
    try {
        console.log(data)
        const response = await axios.post(`${api_url}/forgotpass`, data)
        return response
    } catch (error) {
        console.error('Error sending OTP: ', error)
        return "Error in reaching server"
    }
}

export const passResOTP = async (data) => {
    try {
        const response = await axios.post(`${api_url}/passotp`, data)
        return response
    } catch (error) {
        console.error('Error verifying OTP:', error)
        return "Error in reaching server"
    }
}

export const resetPass = async (data) => {
    try {
        const response = await axios.post(`${api_url}/resetpass`, data)
        return response
    } catch (error) {
        console.error('Error in resetting password', error)
        return "Error in reaching server"
    }
}

export const resendOTP = async () => {
    try {
        const response = await axios.post(`${api_url}/resend-otp`,{})
        return response
    } catch (error) {
        console.error('Error sending OTP:', error)
        return "Error in reaching server"
    }
}

export const leaderboard = async() => {
    try {
        const response = await axios.post(`${api_url}/waitlist`,{})
        return response
    } catch (error) {
        console.error('Error fetching waitlist: ', error)
        return "Error in reaching server"
    }
}

export const details = async() => {
    try {
        const response = await axios.post(`${api_url}/account-details`)
        return response.data
    } catch (error) {
        console.error('Error fetching details: ', error)
        return "Error in reaching server"
    }
}

export const support = async(data) =>{
    try {
        const response = await axios.post(`${api_url}/support`, data)
        console.log(response)
        return response
    } catch(error) {
        console.error('Error in support: ',error)
        return "Error in reaching server"
    }
}

export const adminlogin = async(data) =>{
    try {
        const response = await axios.post(`${api_url}/adminlogin`, data)
        console.log(response)
        return response
    } catch(error) {
        console.error('Error in support: ',error)
        return "Error in reaching server"
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.post(`${api_url}/admin-get-users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};

export const verifyUser = async (email) => {
    try {
        const response = await axios.post(`${api_url}/admin-user-verify`, { email });
        return response;
    } catch (error) {
        console.error('Error verifying user: ', error);
        throw error;
    }
};

export const updateUser = async (data) => {
    try {
        console.log(data)
        const response = await axios.post(`${api_url}/admin-update-user`, data);
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (email) => {
    try {
        const response = await axios.post(`${api_url}/admin-del-user`, { email });
        return response;
    } catch (error) {
        console.error('Error verifying user: ', error);
        throw error;
    }
};

export const winnerDet = async() => {
    try {
        const response = await axios.post(`${api_url}/winner`, {})
        return response
    } catch (error) {
        console.error('Error getting winner: ', error)
        throw error;
    }
}