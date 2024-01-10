import React, { useState , useEffect} from 'react';
import axios from 'axios';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const initialData = [
  { id: 1, title: '첫22 번째 게시물', content: '안녕하세요, 첫 번째 게시물입니다.' },
  { id: 2, title: '두22 번째 게시물', content: '두 번째 게시물입니다.' },
];

const Cssboard = () => {
  const [posts, setPosts] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', content: '' });

  useEffect(() => {
    fetchPosts(); // 페이지 로딩 시 게시물 목록을 불러오는 함수 호출
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts'); // 서버의 게시물 목록을 가져옴
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update
      const updatedPosts = posts.map((post) =>
        post.id === formData.id ? { ...formData } : post
      );
      setPosts(updatedPosts);
    } else {
      // Create
      const newPost = {
        id: posts.length + 1,
        title: formData.title,
        content: formData.content,
      };
      setPosts([...posts, newPost]);
    }
    setFormData({ id: '', title: '', content: '' });
    handleClose();
  };

  const handleEdit = (post) => {
    setFormData(post);
    handleOpen();
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD 게시판
          </Typography>
          <Button variant="contained" onClick={handleOpen}>
            글 작성
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>내용</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(post)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(post.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Modal open={open} onClose={handleClose}>
        <Container sx={{ marginTop: '20vh', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            글 작성하기
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="제목"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="내용"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              저장
            </Button>
          </form>
        </Container>
      </Modal>
    </div>
  );
};

export default Cssboard;
