import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

// URL의 게시글 ID로 게시글 정보를 조회해 상세 화면에 표시합니다.
function Post() {
    let { id } = useParams(); // URL에서 id를 가져옵니다.
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // 게시글 ID에 해당하는 상세 정보와 댓글 목록을 불러옵니다.
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`)
            .then(response => {
                setPostObject(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });

        axios.get(`http://localhost:3001/comments/${id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);

    // JWT와 함께 댓글을 요청하고 성공하면 서버가 돌려준 댓글 작성자 정보로 목록을 갱신합니다.
    const addComment = () => {
        axios
        .post("http://localhost:3001/comments", {
            commentBody: newComment,
            PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
        )
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {

                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username
                };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment}
                        onChange={(event) => {
                        setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                        <div key={key} className="comment">
                            {comment.commentBody}
                            <label> Username: {comment.username}</label>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post
