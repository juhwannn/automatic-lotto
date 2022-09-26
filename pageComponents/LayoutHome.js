import Link from "next/link";
import React, {useContext, useEffect} from "react";

import styled from 'styled-components';
import Head from "next/head";
// import {useRouter} from "next/router";
// import useSWR from "swr";
// import axios from "axios";
import ContextUser from "./ContextUser";

const Root = styled.div`
    >header.header {
        background-color: #fff;
        color: #000;
        padding: 20px;
        nav {
            max-width: 1140px;
            margin: 0 auto;
            .title {
                font-size: 28px;
            }
            .right {
                float: right;
                font-size: 16px;
                margin-top: 10px;
            }
            a {
                display: inline-block;
                margin: 0 10px;
                color: #000;
                text-decoration: none;
                &:first-of-type {
                    margin-left: 0;
                }
                &:hover, &:active {
                    color: blue;
                }
              
                img {
                  width: 224px;
                  height: 32px;
                }
            }    
        }
    }
    >.body {
        color: #000;
    }
    >footer.footer {
        padding: 20px;
    }
`;

const Profile = () => {
    const [user, setUser] = useContext(ContextUser);

    return user?.name ? (
        <>
            <Link href={'/myPage'}>
                <a>{user.name}님</a>
            </Link>
            {user.role === 'Admin' && (
                <Link href={'/admin'}><a>관리자</a></Link>
            )}
            <Link href={'/logout'}><a>로그아웃</a></Link>
        </>
    ) : (
        <>
            <Link href={'/login'}><a>로그인</a></Link>
            <Link href={'/join'}><a>회원가입</a></Link>
        </>
    );
};

const LayoutHome = ({children}) => {
    return (
        <Root>
            <Head>
                <title>AutoLotto</title>
            </Head>
            <header className={'header'}>
                <nav>
                    <span className="title">
                        <Link href={'/'}><a>AutoLotto</a></Link>
                    </span>
                    <span className={'right'}>
                        <Link href={'/services'}><a>서비스안내</a></Link>
                        <Profile/>
                    </span>
                </nav>
            </header>
            <div className={'body'}>{children}</div>
            <footer className={'footer'}></footer>
        </Root>
    );
};

export default LayoutHome;
