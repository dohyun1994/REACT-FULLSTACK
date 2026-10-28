import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

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

    // 로그인 토큰으로 댓글 삭제를 요청하고 성공하면 화면 목록에서도 제거합니다.
    const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
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
                    {authState.username === comment.username && (
                    <button
                        onClick={() => {
                        deleteComment(comment.id);
                        }}
                    >
                        X
                    </button>
                    )}
                </div>
                );
            })}
            </div>
        </div>
        </div>
  );
}

export default Post
