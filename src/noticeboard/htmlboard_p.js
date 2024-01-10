import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { API_URL } from '../config/serverurl';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useAsync from '../customHook/useAsync';
import './noticeboard.css';

async function getHtmlData() {
  const res = await axios.get(`${API_URL}/html`);
  return res.data;
}
const columns=[
  {field: 'id', headerName:'아이디', width:70,},
  {field: 'title', headerName:'제목', width:110,},
  {field: 'content', headerName:'내용', width:250,},
  {field: 'author', headerName:'작성자',width:70,},
  {field: 'created_at', headerName:'작성날짜',width:200,},
]
function Html_p() {
  const { id } = useParams();
  const [htmlData, setHtmlData] = useState([]);
  const [newData, setNewData] = useState({
    title: '',
    content: '',
    author: '',
    created_at: '',
  });

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}/html`, newData);
      // 새로운 데이터를 서버에 추가하는 API 호출 (예시로 사용한 URL 및 newData 객체를 실제 상황에 맞게 수정해야 합니다)
      alert('데이터가 추가되었습니다.'); // 데이터 추가 확인 메시지 표시
      window.location.href = '/htmlboard'; // '/htmlboard' 페이지로 이동
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/html/delete/${id}`);
      // 선택한 데이터를 서버에서 삭제하는 API 호출 (예시로 사용한 URL을 실제 상황에 맞게 수정해야 합니다)
      window.location.reload(); // 페이지 새로고침 (삭제된 데이터가 반영될 수 있도록)
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHtmlData();
      setHtmlData(data);
    };
    fetchData();
  }, []);

  // ... (이하 코드는 그대로 사용하고, handleSubmit 등이 필요할 경우 추가로 구현하시면 됩니다)

  return (
    <div className="sell">
      <div>
        <h2>새로운 데이터 추가</h2>
        <input
          type="text"
          placeholder="제목"
          value={newData.title}
          onChange={(e) => setNewData({ ...newData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="내용"
          value={newData.content}
          onChange={(e) => setNewData({ ...newData, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="작성자"
          value={newData.author}
          onChange={(e) => setNewData({ ...newData, author: e.target.value })}
        />
        <button onClick={handleAdd}>추가</button>
      </div>  
    </div>
  );
}

export default Html_p;
