import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { API_URL } from '../config/serverurl';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import useAsync from '../customHook/useAsync';
import './noticeboard.css';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/system';
import { getCookie } from '../customer/cookies';
import { Box, Typography, TextField, TextareaAutosize, Button,Container,TableContainer, Toolbar } from '@mui/material';
import './htmlboard.css';

const scrollStyle = {
  overflowY: 'scroll',
};

// 모달의 스타일을 적용할 컴포넌트 생성
const ModalWrapper = styled(Dialog)``;

async function htmlboard() {
  const res = await axios.get(`${API_URL}/htmlreview`);
  console.log(res);
  return res.data;
}

function Htmlreview() {
  const [selectedRow, setSelectedRow] = useState(null); // 선택한 행의 데이터 상태
  const [showModal, setShowModal] = useState(false); // 모달 열림 상태
  const [editedTitle, setEditedTitle] = useState(''); // 수정된 제목 상태
  const [editedContent, setEditedContent] = useState(''); // 수정된 내용 상태

  const cookie = getCookie('loginCookie');
  const navigate = useNavigate();

  const columns=[
    {field: 'id', headerName:'댓글 번호', width:100, headerAlign: 'center',align: 'center'},
    {field: 'title', headerName:'제목', width:110, headerAlign: 'center',align: 'center'},
    {field: 'content', headerName:'내용', width:750, headerAlign: 'center',align: 'center'},
    {field: 'author', headerName:'작성자',width:90, headerAlign: 'center',align: 'center'},
    {
      field: 'action',
      headerName: '삭제',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        return (
          <>
            {/* 삭제 */}
            <button className='userListDelete' onClick={async () => {
              if(cookie) {
                  console.log(params.id);
                  await axios.delete(`${API_URL}/htmlreview/delete/${params.id}`)
                  .then(res => {
                    console.log(res.data);
                    window.location.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  })
                  navigate('/htmlboard ');
              } else if(!cookie) {
                alert('로그인 후 이용해주세요 !');
                navigate('/members/login');
              }
              
            }}>
              삭제
            </button>
          </>
        );
      },
    },
    
    {field : 'edit',
     headerName : '수정',
     headerAlign: 'center',
     width : 80,
     renderCell: (params) => {
        return (
          <>
            {/* 수정 */}
            <button className='userListPatch' onClick={() =>{
              if(cookie){
                navigate('/htmlboard');
                handleEdit(params)
              } else if(!cookie){
                alert('로그인후 이용해주세요');
                navigate('/members/login');
              }
            }
            }>
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
  console.log(rdata);

  useEffect(() => {
    if (selectedRow) {
      setEditedTitle(selectedRow.title);
      setEditedContent(selectedRow.content);
      // setupdateImg(selectedRow.img_url);
    }
  }, [selectedRow]);

  const handleRowClick = async (row) => {
    setSelectedRow(row); // 선택한 행의 데이터를 상태에 저장
    setShowModal(true); // 모달 창 열기
    try {
      await axios.patch(`${API_URL}/html/increase-views/${row.id}`);
 
      console.log('행 클릭:', row);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };
  // const handleRowClick = (row) => {
  //   setSelectedRow(row); // 선택한 행의 데이터를 상태에 저장
  //   setShowModal(true); // 모달 창 열기
  // };

  const handleEdit = (params) => {
    setSelectedRow(params.row);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = {
          title: editedTitle,
          content: editedContent,

        };
  
        await axios.patch(`${API_URL}/htmlreview/update/${selectedRow.id}`, data);
        console.log("보냄");
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
      {/* <Link to='/htmlboard_p'><button>글작성</button></Link> */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          댓글
        </Typography>
        <button type='click' className='writeButton' onClick={() => {
        if(cookie) {
          navigate('/htmlreview_p');
        } else if(!cookie) {
          alert('로그인 후 이용해주세요 !');
        }
      }}> 글 작성 </button>
      </Toolbar>

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
      <ModalWrapper open={showModal} maxWidth="xl" maxHeight='90vh' onClose={() => setShowModal(false)}>
        <Container>
          <div className="modal-content">
              <h2>댓글 수정</h2>
            {selectedRow && (
              <>
              {/* 수정 폼 */}
                <form onSubmit={handleSubmit}>
                  {/* 수정할 제목 */}
                  <TextField
                    type="text"
                    label="수정할 제목"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  {/* 수정할 내용 */}
                  <Box sx={{ position: 'relative' }}>
                    <textarea
                        id='memo_container'
                        style={scrollStyle}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="수정할 내용"
                        rows={37}
                        variant="outlined"
                        fullWidth
                        minRows={20}
                      />
                    <Typography
                      variant="body1"
                      sx={{
                        position: 'absolute',
                        top: '-8px',
                        left: '8px',
                        bgcolor: 'white',
                        padding: '0 4px',
                      }}
                    >
                      수정할 내용
                    </Typography>
                  </Box>
                  {/* 작성자와 작성 날짜 */}
                  <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                    {/* <p>댓글 번호: {selectedRow.id}</p> */}
                    <Typography variant="subtitle2">댓글 번호: {selectedRow.id}</Typography>
                    <Typography variant="subtitle2">작성자: {selectedRow.author}</Typography>
                    <Typography variant="subtitle2">작성 날짜: {selectedRow.created_at}</Typography>
                  </Box>
                </form>

                {/* 모달 수정, 닫기 버튼 */}
                <div id='modal_btn'>
                  <Button type="submit" id='submit_btn' variant="contained" onClick={handleSubmit}>
                      수정 완료
                  </Button>
                  <Button variant="outlined" id='outlined_btn' onClick={() => {
                    setShowModal(false);
                    window.location.reload();
                    }}>
                    닫기
                  </Button>
                </div>
              </>
            )}
          </div>
        </Container>
      </ModalWrapper>
    </div>
  );
}
export default Htmlreview;
