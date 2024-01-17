import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/serverurl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './htmlboard.css';
import { useNavigate } from 'react-router';

function Html_p() {
  const [newData, setNewData] = useState({
    title: '',
    content: '',
    author: '',
    created_at: ''
  });
  const navigate = useNavigate();

  const handleAdd = async () => {
    const imgfile = document.getElementById('file-style').files[0];
    const formData = new FormData();

    try {
      if (imgfile) {
        console.log(imgfile);
        formData.append('img_url', imgfile);
        const imgUploadRes = await axios.post(`${API_URL}/html/images`, formData);
        const data = {
          ...newData,
          img_url: imgUploadRes.data.path,
        };
        console.log(data);
        await axios.post(`${API_URL}/html`, data);
      } else {
        // 이미지 파일이 없으면 이미지 없이 게시물을 생성할 수 있도록
        await axios.post(`${API_URL}/html`, newData);
      }

      console.log('성공');
      navigate('/htmlboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sell">
      <div>
        <div id='htmlboard_p_container'>
          <h2>HTML 작성</h2>
          <div id='htmlboard_p_top'>
            <TextField
              label="제목"
              variant="outlined"
              size="small"
              style={{ width: '900px', height: '50px', marginRight: '10px' }}
              value={newData.title}
              onChange={(e) => setNewData({ ...newData, title: e.target.value })}
            />
            <TextField
              label="작성자"
              variant="outlined"
              size="small"
              style={{ width: '250px', height: '50px', marginRight: '10px' }}
              value={newData.author}
              onChange={(e) => setNewData({ ...newData, author: e.target.value })}
            />
            <label htmlFor="file-style">
                사진 올리기
              <div id='imgupload'>
                <input
                  id='file-style' 
                  className='htmlemodal-img'
                  type="file"
                  name="img_url"
                  />
              </div>
            </label>
          </div>
          <div id='htmlboard_p_main'>
            <TextField
              id='htmlboard_p_main'
              label="내용"
              variant="outlined"
              size="small"
              multiline
              maxRows={50}
              minRows={37}
              style={{ width: '1200px', marginBottom: '20px' }}
              value={newData.content}
              onChange={(e) => setNewData({ ...newData, content: e.target.value })}
            />
          </div>
        </div>
        <Button variant="contained" onClick={handleAdd}>
          추가
        </Button>
      </div>  
    </div>
  );
}

export default Html_p;
