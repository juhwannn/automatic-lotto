import React, {useEffect, useState} from 'react'
import '../styles/globals.css'
import ContextUser from "../pageComponents/ContextUser";
import axios from "axios";
import {useRouter} from "next/router";
import LayoutHome from "../pageComponents/LayoutHome";

const getLayout = (asPath) => {
  // if(asPath.startsWith('/login') || asPath.startsWith('/join') || asPath.startsWith('/resetPassword'))
  //   return LayoutJoinLogin;
  //
  // if(asPath.startsWith('/admin'))
  //   return LayoutAdmin;
  //
  return LayoutHome;
};

const MyApp = props => {
  useEffect(() => {
    // if (true || props.router.asPath.startsWith('/admin')) {
    //   const jssStyles = document.querySelector('#jss-server-side');
    //   if (jssStyles) {
    //     jssStyles.parentNode.removeChild(jssStyles);
    //   }
    // }
  }, []);

  const {Component, pageProps} = props;
  const [user, setUser] = useState({});

  const Layout = getLayout(props.router.asPath);
  const router = useRouter();

  // 코드를 옮겨오고 보니 위 레이아웃 결정로직(getLayout)과 아래 권한체크로직이 중복처럼 보이지만
  // 아직은 투아웃이므로 쓰리아웃 될때까지 유지합니다.
  useEffect(() => {
    const checkSession = async url => {
      const response = await axios.get('/api/auth');
      console.log("response : " + JSON.stringify(response));

      const newUser = response?.data?.user;
      setUser(newUser);

      const [pathname, search] = url?.split('?') || [];
      const needToNotLogin = [
        '/join',
        '/login',
        '/resetPassword',
      ].some(v => pathname.startsWith(v));
      if (needToNotLogin && newUser) {
        return router.replace("/");
      }

      const needToLogin = [
        '/myPage',
        '/requestService',
      ].some(v => pathname.startsWith(v));
      if (needToLogin && !newUser) {
        return router.replace("/login");
      }

      const needAdmin = [
        '/admin',
      ].some(v => pathname.startsWith(v));
      if(needAdmin && newUser?.role !== 'Admin') {
        return router.replace("/");
      }
    };
    checkSession(router.pathname);

    router.events.on('routeChangeStart', checkSession);
    return () => {
      router.events.off('routeChangeStart', checkSession)
    };
  }, []);

  return (
      <ContextUser.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextUser.Provider>
  );
};

export default MyApp
