import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const Root = styled.div`

`;
export default function Home() {
    const router = useRouter();

    const [userId, setUserId] = useState('');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');
    const [num6, setNum6] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/auth/getUser");
                console.log(response.data);
            } catch (e) {
                console.log(e.stackTrace);
            }
        })();
    }, []);

    return (
        <Root>
            수동 번호 등록 / 자동 번호 등록

            <label>
                <a>아이디</a>

                <input value={userId} readOnly={true}/>
            </label>
        </Root>
    );
}