import styled from "styled-components";
import React, {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";

const Root = styled.div`
    text-align: center;
    
    .mainBody {
        width: 100%;
        min-height: 86vh;
    }
    
    .mainFooter {
        width: 100%;
        height: 7vh;
        
        font-size: 15px;
        font-weight: lighter;
        
        padding-top: 2vh;
    }
`;

export default function Home() {

    const router = useRouter();

    return (
        <Root>
            <div className="mainBody">
                Cover your page.
                Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.
            </div>

            <div className="mainFooter">
                Copyright 2022. juhwannn all rights reserved.
            </div>
        </Root>
    )
}