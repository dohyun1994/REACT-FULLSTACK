import React from 'react'
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


// 서버에서 게시글 목록을 불러와 홈 화면에 표시합니다.
function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);

    let history = useHistory(); // useHistory 훅을 사용하여 페이지 이동을 처리합니다.

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

    // 로그인 토큰으로 좋아요 상태를 토글하고 해당 게시글의 표시 개수를 갱신합니다.
    const likeAPost = (postId) => {
        axios.post("http://localhost:3001/likes",
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem("accessToken") }}
        )
        .then((response) => {
            setListOfPosts(
            listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] };
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return { ...post, Likes: likesArray };
                    }
                } else {
                    return post;
                }
            })
            );
      });
    };

    return (
    <div>
        {listOfPosts.map((value, key) => { 
        return (
        <div key={key} className='post'>
            <div className='title'>{value.title}</div>
            <div className='body' onClick={() =>{history.push(`/post/${value.id}`)}}>{value.postText}</div>
            <div className="footer">
              {value.username}{" "}
              <button
                onClick={() => {
                  likeAPost(value.id);
                }}
              >
                {" "}
                Like
              </button>
              <label> {value.Likes.length}</label>
            </div>
        </div>
        );
    })}
    </div>
    )
}

export default Home
