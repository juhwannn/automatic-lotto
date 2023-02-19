import styled from "styled-components";
import React from "react";

const Root = styled.div`
    >table {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        width: 90%;
        border: black 1px solid;
        border-collapse: collapse;

        >thead {
            th {
                padding-top: 10px;
                padding-bottom: 10px;
                
                border-bottom: blue 1px solid;
            }        
        }
        
        >tbody {
            td {
                padding-top: 5px;
                padding-bottom: 5px;
            }
        }
    }
`;

export default function Home() {
    return (
        <Root>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>번호목록</th>
                        <th>구매 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1, 2, 3, 4, 5, 6</td>
                        <th>2022.01.01</th>
                    </tr>
                </tbody>
            </table>
        </Root>
    );
}