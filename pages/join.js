import styled from "styled-components";
import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import validation from "../shares/ValidationCheck";

const Root = styled.div`
    h1 {
        text-align: center;
        margin-top: 0;
        padding-top: 80px;
        margin-bottom: 30px;
        a {
            font-size: 38px;
            text-decoration: none;
            color: blue;
        }
    }
    
    h2 {
        margin-top: 0;
    }
    
    .wrapper {
        .area {
            padding: 60px 110px;
            label {
                display: block;
                margin: 10px 0;
                cursor: pointer;
                >input[type=text], >input[type=password], >input[type=tel], >input[type=email], >select {
                    margin-top: 10px;
                    display: block;
                    width: 100%;
                    border: 1px solid #DFDFDF;
                }
            }
            
            button {
                margin-top: 10px;
                width: 100%;
            }
            a {
                color: #000;
                text-decoration: none;
            }
        }
    }
`;

export default function Home() {

    const router = useRouter();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <Root>
            <div className="wrapper">

                <form onSubmit={e => {
                    (async () => {
                        try {
                            const o = {
                                id,
                                password,
                                confirmPassword,
                                name,
                                email
                            };

                            const validateCheck = validation.validateJoin(o);

                            if (validateCheck) {
                                alert("정보를 다시 확인해 주세요.");

                                return;
                            }

                            const response = await axios.post('/api/auth/join', o);

                            await router.push('/');
                        } catch (e) {
                            console.log(e);

                            // setPopupLoginErrorVisible(true);
                            // setErrorMessage(e?.response?.data);
                        }
                    })();
                    e.preventDefault();
                    return false;
                }}>
                    <div className="area">
                        <h2>회원가입</h2>

                        <label>
                            아이디
                            <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디를 입력하세요"/>
                        </label>

                        <label>
                            이름
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력하세요"/>
                        </label>

                        <label>
                            이메일
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일을 입력하세요"/>
                        </label>

                        <label>
                            비밀번호
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요"/>
                        </label>

                        <label>
                            비밀번호 확인
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="비밀번호를 똑같이 입력하세요"/>
                        </label>

                        <button>회원가입</button>
                    </div>
                </form>
            </div>
        </Root>
    )
}