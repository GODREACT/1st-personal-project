import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { API_URL } from '../config/serverurl';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useAsync from '../customHook/useAsync';
import './noticeboard.css';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/system';

// 모달의 스타일을 적용할 컴포넌트 생성
const ModalWrapper = styled(Dialog)`
  .MuiDialog-paper {
    width: 80%; /* 모달 크기 */
    margin: auto; /* 화면의 정중앙 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999; /* 가장 앞쪽으로 나오도록 설정 */
  }
`;

async function htmlboard() {
  const res = await axios.get(`${API_URL}/html`);
  console.log(res);
  return res.data;
}

function Html() {
  const [selectedRow, setSelectedRow] = useState(null); // 선택한 행의 데이터 상태
  const [showModal, setShowModal] = useState(false); // 모달 열림 상태
  const [editedTitle, setEditedTitle] = useState(''); // 수정된 제목 상태
  const [editedContent, setEditedContent] = useState(''); // 수정된 내용 상태

  const columns=[
    {field: 'id', headerName:'아이디', width:70,},
    {field: 'title', headerName:'제목', width:110,},
    {field: 'content', headerName:'내용', width:250,},
    {field: 'author', headerName:'작성자',width:70,},
    {field: 'created_at', headerName:'작성날짜',width:200,},
    {
      field: 'action',
      headerName: '삭제',
      width: 80,
      renderCell: (params) => {
        return (
          <>
            {/* 삭제 */}
            <button className='userListDelete' onClick={async () => {
              console.log(params.id);
              await axios.delete(`${API_URL}/html/delete/${params.id}`)
              .then(res => {
                console.log(res.data);
                window.location.reload();
              })
              .catch(err => {
                console.log(err);
              })
            }}>
              삭제
            </button>
          </>
        );
      },
    },
    
    {field : 'edit',
     headerName : '수정',
     width : 80,
     renderCell: (params) => {
        return (
          <>
            {/* 수정 */}
            <button className='userListPatch' onClick={() => handleEdit(params)}>
              수정
            </button>
          </>
        );
      },
    }
  ]

  const { id } = useParams();
  const [state] = useAsync(() => htmlboard(id), [id]);
  const { loading, data: rdata, error } = state;

  useEffect(() => {
    if (selectedRow) {
      setEditedTitle(selectedRow.title);
      setEditedContent(selectedRow.content);
    }
  }, [selectedRow]);

  const handleRowClick = (row) => {
    setSelectedRow(row); // 선택한 행의 데이터를 상태에 저장
    setShowModal(true); // 모달 창 열기
  };

  const handleEdit = (params) => {
    setSelectedRow(params.row);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 수정된 데이터를 API로 전송하는 로직
    try {
      const res = await axios.patch(`${API_URL}/html/update/${selectedRow.id}`, {
        title: editedTitle,
        content: editedContent,
      });
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div>로딩중입니다.....</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!rdata) return null;

  return (
    <div className="sell">
      <Link to='/htmlboard_p'><button>글작성</button></Link>
      {/* 데이터 표시 */}
      <DataGrid
        rows={rdata.map((a) => ({
          id:a.id,
          title:a.title,
          content:a.content,
          author:a.author,
          created_at:new Date(a.createdAt).toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
          }),
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageoptions={[5]}
        disableSelectionOnClick // 행을 클릭했을 때 선택되는 기본 동작 비활성화
        onRowClick={(row) => handleRowClick(row.row)}
        checkboxSelection={false} // 기본 체크박스 기능 비활성화
      />

      {/* 모달 */}
      <ModalWrapper open={showModal} onClose={() => setShowModal(false)}>
  <div className="modal-content">
    {/* 선택한 행의 데이터 표시 */}
    <h2>모달</h2>
    {selectedRow && (
      <>
        <p>ID: {selectedRow.id}</p>
        <p>Title: {selectedRow.title}</p>
        <p>Content: {selectedRow.content}</p>
        <p>Author: {selectedRow.author}</p>
        <p>Created At: {selectedRow.created_at}</p>
        {/* 수정 폼 */}
        <form> {/* handleSubmit 함수는 수정 제출을 처리하는 함수입니다. */}
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="수정할 제목"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="수정할 내용"
          />
          {/* 수정 완료 버튼 */}
          <button type="submit" onClick={handleSubmit}>수정 완료</button>
        </form>
        {/* 모달 닫기 버튼 */}
        <button onClick={() => setShowModal(false)}>닫기</button>
      </>
    )}
  </div>
</ModalWrapper>

    </div>
  );
}

export default Html;
