import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/serverurl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './htmlboard.css';
import { useNavigate } from 'react-router';

function Htmlreview_p() {
  const [newData, setNewData] = useState({
    title: '',
    content: '',
    author: '',
    created_at: ''
  });
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}/htmlreview`, newData);
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
          <h2>댓글 작성</h2>
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
          </div>
          <div id='htmlboard_p_main'>
            <TextField
              id='htmlboard_p_main'
              label="내용"
              variant="outlined"
              size="small"
              multiline
              rows={37}
              style={{ width: '1200px',  height: '450px',marginBottom: '20px' }}
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

export default Htmlreview_p;
