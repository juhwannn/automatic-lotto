import styled from "styled-components";
import React, {useEffect} from "react";
import axios from "axios";

const Root = styled.div`
    .mainHeader {
        background: red;
            
        height: 5vh; 
    }
    
    .mainBody1 {
        background: green;
        
        width: 100%;
        min-height: 90vh;
    }
    
    .mainFooter {
        background: blue;
        
        height: 5vh;
    }
`;

export default function Home() {

    useEffect(() => {
        (async () => {
            // const response = await axios.get("/api/test");
            // console.log("response : " + JSON.stringify(response.data));
        })();
    }, []);

    return (
        <Root>
            <div className="mainHeader">
                mainHeader
            </div>

            <div className="mainBody1">
                mainBody1
            </div>

            <div className="mainBody2">
                mainBody2
            </div>

            <div className="mainBody3">
                mainBody3
            </div>

            <div className="mainBody4">
                mainBody4
            </div>

            <div className="mainFooter">
                mainFooter
            </div>
        </Root>
    )
}