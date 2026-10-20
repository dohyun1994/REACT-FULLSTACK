import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";

// 게시글 입력 폼을 제공하고 검증된 내용을 서버에 저장합니다.
function CreatePost() {

    const history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    // 서버의 필수 필드와 작성자 길이 조건에 맞춰 입력값을 검증합니다.
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    }); 

    
    /**
     * 게시글 생성을 확인하고 서버에 저장한 뒤 메인 페이지로 이동합니다.
     * 취소하면 입력 폼을 초기화합니다.
     */
    const onSubmit = (data, { resetForm }) => {
        if (!window.confirm("Create this post?")) {
            resetForm();
            return;
        }
        axios.post('http://localhost:3001/posts', data).then(response => {
            history.push("/");
        });
    }

  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(EX. Title...)"/>

                <label>Post: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="(EX. Post...)"/>

                <label>Username: </label>
                <ErrorMessage name="username" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(EX. John123...)"/>
                
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    
    </div>
  );
}

export default CreatePost;
