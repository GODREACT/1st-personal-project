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
import Htmlreview from './htmlreview';
import SearchComponent from '../main/searchresult';
// 모달의 스타일을 적용할 컴포넌트 생성
const ModalWrapper = styled(Dialog)``;

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
  const [updateImg, setupdateImg] = useState(''); // 수정된 이미지 내용 상태
  const [views, setViews] = useState(''); //수정된 조회수 상태

  const cookie = getCookie('loginCookie');
  const navigate = useNavigate();

  const scrollStyle = {
    overflowY: 'scroll',
  };

  const columns=[
    {field: 'id', headerName:'게시물번호', width:100, headerAlign: 'center',align: 'center'},
    {field: 'title', headerName:'제목', width:110, headerAlign: 'center',align: 'center'},
    {field: 'content', headerName:'내용', width:550, headerAlign: 'center',align: 'center'},
    {field: 'author', headerName:'작성자',width:90, headerAlign: 'center',align: 'center'},
    {field: 'created_at', headerName:'작성날짜',width:200, headerAlign: 'center',align: 'center'},
    {
      field: 'img_url',
      headerName: '사진',
      width: 200,
      editable: false,
      headerAlign: 'center',
      renderCell: (params) => {
      let imgUrl = params.row.img_url;
        return (
          <>
          <div className='notice-img-box'>
            <img
              className='notice-img'
              src={params.row.img_url}
              onClick={setShowModal}
            />
          </div>
          </>
        );
      },
    },
    {field: 'views', headerName:'조회수',width:70,align: 'center'},
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
                  await axios.delete(`${API_URL}/html/delete/${params.id}`)
                  .then(res => {
                    console.log(res.data);
                    window.location.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  })
                  navigate('/htmlboard');
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
    const updateImg = document.getElementById('file-style').files[0];
    try {
      if (updateImg) {
        const formData = new FormData();
        formData.append('img_url', updateImg);
  
        const imgUploadRes = await axios.post(`${API_URL}/html/images`, formData);
        const data = {
          title: editedTitle,
          content: editedContent,
          img_url: imgUploadRes.data.path,
        };
        await axios.patch(`${API_URL}/html/update/${selectedRow.id}`, data);
        console.log("보냄");
        window.location.reload();
      } else {
        // 이미지를 업로드하지 않은 경우, img_url을 빈 문자열로 수정
        const data = {
          title: editedTitle,
          content: editedContent,
          img_url: '',
        };
        await axios.patch(`${API_URL}/html/update/${selectedRow.id}`, data);
        console.log("보냄");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div>로딩중입니다.....</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!rdata) return null;

  return (
    <div className="sell">
      <div id='SearchComponent_box'>
        <SearchComponent /> {/* 여기에 SearchComponent를 렌더링합니다. */}
      </div>
      {/* <Link to='/htmlboard_p'><button>글작성</button></Link> */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HTML 게시판
        </Typography>
        <button type='click' className='writeButton' onClick={() => {
        if(cookie) {
          navigate('/htmlboard_p');
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
            img_url:a.img_url,
            views:a.views,
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
      <ModalWrapper id='modal_container' open={showModal} maxWidth="xl" maxHeight='100vh' onClose={() => setShowModal(false)}>
        <Container>
          <div className="modal-content">
            {selectedRow && (
              <>
              {/* 수정 폼 */}
                <form onSubmit={handleSubmit} id='title_container'>
                  {/* 수정할 제목 */}
                  <div id='title_container2'>
                    <TextField
                      type="text"
                      label="수정할 제목"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                      <label id='img_container' htmlFor="file-style">
                            
                          <img
                            src={updateImg ? URL.createObjectURL(updateImg) : selectedRow.img_url}
                            alt="게시물 이미지"
                            className="modal-image"
                            id='img_box'
                            style={{ width: '40%', height: 'auto' }}
                          />
                          <input
                            id='file-style' 
                            className='htmlemodal-img'
                            type="file"
                            name="img_url"
                            onChange={(e) => setupdateImg(e.target.files[0])}
                            />
                      </label>
                  </div>
                  {/* 수정할 내용 */}
                  <Box sx={{ position: 'relative' }}>
                    <div>
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
                    </div>
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
                  <div id='detail_container'>
                    <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                      {/* <p>게시물번호: {selectedRow.id}</p> */}
                      <Typography variant="subtitle2">게시물 번호: {selectedRow.id}</Typography>
                      <Typography variant="subtitle2">작성자: {selectedRow.author}</Typography>
                      <Typography variant="subtitle2">작성 날짜: {selectedRow.created_at}</Typography>
                    </Box>
                  </div>
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
                <Htmlreview/>
              </>
            )}
          </div>
        </Container>
      </ModalWrapper>
    </div>
  );
}
export default Html;
