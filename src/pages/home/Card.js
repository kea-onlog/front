import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import styled from 'styled-components';
import { GET_CardList } from '../../apis/API_Card';
import { useSelector } from 'react-redux';
// import { cardFutAction } from '../../store/actions/card';

const Card = () => {
    
    const [cardData, setCardData] = useState([]);
    const filterList = useSelector(state => state.card.filterList);
    console.log("filterList", filterList);

    useEffect(() => {
                GET_CardList(filterList)

                .then((data) => {
                    setCardData(data.data.content);

                })
                .catch((error) => {
                    console.log(error);
                });
    },[filterList]);

    return (
        <Wrap>
            <CardWrap>
                {
                    cardData.map((item) => (
                        <CardItem key={item.postId} item={item}/>
                    ))
                }
            </CardWrap>
        </Wrap>
    );
};

export default Card;

const Wrap = styled.div`

    padding: 3rem;
    box-sizing: border-box;
`;
const CardWrap = styled.div`
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
    grid-template-columns: repeat(auto-fill, minmax(15.1875rem, 1fr));
    place-items: center;
    gap: 0.5rem;

`;
