import styled from "styled-components";
import React, {useEffect} from "react";
import axios from "axios";

const Root = styled.div`
    .mainHeader {
        background: red;
            
        height: 5vh; 
    }
    
    .mainBody {
        background: green;
        
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

            <div className="mainBody">
                mainBody
            </div>

            <div className="mainFooter">
                mainFooter
            </div>
        </Root>
    )
}