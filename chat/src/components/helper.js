import styled from 'styled-components';



export const Button = styled.button`
        cursor: pointer;
        padding: 12px;
        background: #7C5CBF;
        border: none;
        color: white;
        font-size: 16px;
        transition: background .3s ease;

        ::hover {
            background: #6b47b8;
        }

        ::disabled {
            cursor: default;
            background: #7c5cbf94;
        }
`;


