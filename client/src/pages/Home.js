import React from 'react'
import axios from 'axios'; 
import {useEffect, useState} from 'react';


// 서버에서 게시글 목록을 불러와 홈 화면에 표시합니다.
function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);

    // 컴포넌트가 처음 렌더링될 때 게시글 목록을 요청합니다.
    useEffect(() => {
        axios.get('http://localhost:3001/posts')
        .then(response => {
            setListOfPosts(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);   
    
    return (
    <div>
        {listOfPosts.map((value, key) => { 
        return (
        <div className='post'> 
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
        </div>
        );
    })}
    </div>
    )
}

export default Home
