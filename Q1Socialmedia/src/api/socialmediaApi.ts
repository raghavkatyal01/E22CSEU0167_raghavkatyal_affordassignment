import axios from "axios";
import { useState } from "react";
import { createLogger } from "vite";

const BASE_URL = "http://20.244.56.144/evaluation-service/auth";

export const authenticate = async () => {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            "email": "e22cseu0167@bennett.edu",
            "name": "raghav katyal",
            "rollNo": "e22cseu00167",
            "accessCode": "rtCHZJ",
            "clientID": "caab93f5-c995-4659-b757-7c33b042fe5a",
            "clientSecret": "TjBRYJNhUSxHWBvv"
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Authentication failed", error);
        return null;
    }
};

export const fetchUsers = async (token: string) => {
    try {
        const response = await axios.get("http://20.244.56.144/evaluation-service/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
            console.log("us",response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch users", error);
        return [];
    }
};

export const fetchPosts = async (token: string) => {
    try {
        const response = await axios.get(`http://20.244.56.144/evaluation-service/users/1/posts`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts", error);
        return [];
    }
};

export const fetchComments = async (token: string) => {
    try {
        const response = await axios.get("http://20.244.56.144/evaluation-service/posts/1/comments", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("c",response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch comments", error);
        return [];
    }
};
