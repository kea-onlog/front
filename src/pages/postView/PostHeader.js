import styled from "styled-components";
import { LSemibold32, LBold32, XSSemibold16 } from "../../components/style/Styled";
import { useState, useEffect } from "react";
import { navData } from "../../assets/datas/categoryData";
import { useDispatch } from 'react-redux';
import { colorAction } from '../../store/actions/color';
import {ReactComponent as Lock} from "../../assets/images/Icons/Lock.svg";

const PostHeader = ({post}) => {

    const dispatch = useDispatch();

    const [topic, setTopic] = useState({
        name:"",
        color:"",
    });
    const [isPublic, setIsPublic] = useState(true);

    useEffect(() => {
        if (post && post.topic) {
            setTopic({
                name: navData[post.topic.id].kName,
                color: navData[post.topic.id].color,
            });

            dispatch(
                colorAction({
                    category: navData[post.topic.id].name,  
                    color: navData[post.topic.id].color,
                })
            );
        }
        if (post && post.isPublic===false){
            setIsPublic(false);
        }
    }, [post, dispatch]);

    return(
        <div>
            <Wrap>
                {post && (
                    <>
                        {post.topic && <Topic color={topic.color}>#{topic.name}</Topic>}
                        <Title dangerouslySetInnerHTML={{ __html: post.title }}/>
                        {post.createdAt && <DateWrap>{new Date(post.createdAt).toISOString().split('T')[0].replace(/-/g, '.')}</DateWrap>}
                        {!isPublic && (<Lock/>)}
                    </>
                )}
            </Wrap>
        </div>
    )
};

export default PostHeader;

const Wrap = styled.div`
    display: flex;
    // padding: 1.25rem 6.25rem;
    padding: 1.25rem 0rem;
    align-items: center;
    gap: 1.875rem;
    align-self: stretch;
    background-color: rgba(255,255,255,1);
`

const Title = styled(LBold32)`
    max-width: 80.625rem;
    color: var(--black, #000);
`

const Topic = styled(LSemibold32)`
    display: flex;
    padding: 0rem 2.40625rem;
    align-items: flex-start;
    gap: 0.625rem;
    // background: ${props => props.$bgColor || '#FF7575'};
    background: var(${props=>props.color});
    color: var(--white, #FFF);
`

const DateWrap = styled(XSSemibold16)`
    color: var(--gray_bold, #4A4A4A);
`