import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from 'next/router'

export default function Login() {
    const router = useRouter();
    useEffect(() => {
        axios.post('/api/auth/logout').then(() => router.push('/'));
    }, []);
    return <></>
}