import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({baseURL: "http://localhost:5000"});

// Implement a method to execute all the request from here

const apiRequest = async (/** @type {string} */ method,  /** @type {any} */ url, /** @type {undefined} */ request) => {
    try {
        const headers = {};
        // @ts-ignore
        const response = await axiosAPI({ method, url, headers, data: request });
        return response.data;
    } catch (error) {
        // @ts-ignore
        return error.response;
    }
};

// Function to excute the http get request
const get = ( /** @type {any} */ url) => apiRequest("get", url);

// Function to excute the http post request
const post = ( /** @type {any} */ url, /** @type {undefined} */ request) => apiRequest("post", url, request);

// Function to excute the http put request
const put = ( /** @type {any} */ url, /** @type {undefined} */ request) => apiRequest("put", url, request);

// Function to excute the http delete request
const deleteRequest = ( /** @type {any} */ url) => apiRequest("delete", url);

const ChatAPI = {
    get,
    post,
    put,
    delete: deleteRequest,
};

export default ChatAPI;
