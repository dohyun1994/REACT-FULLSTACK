import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

// URL의 게시글 ID로 게시글 정보를 조회해 상세 화면에 표시합니다.
function Post() {
    let { id } = useParams(); // URL에서 id를 가져옵니다.
    const [postObject, setPostObject] = useState({});

    // 게시글 ID가 정해진 뒤 상세 API에서 해당 게시글을 불러옵니다.
    useEffect(() => {
        // id를 사용하여 서버에서 특정 게시글을 가져옵니다.
        axios.get(`http://localhost:3001/posts/byId/${id}`)
            .then(response => {
                // 게시글 데이터를 상태에 저장합니다.
                setPostObject(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, []);

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">Comment Section</div>
        </div>
    );
}

export default Post
