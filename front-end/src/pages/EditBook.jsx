import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom'
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishedYear(response.data.publishedYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check console');
        console.log('There was an error fetching the book:', error);
      });
  }, []);

  const handleEditBook = () =>{
   const data = { title,
    author,
    publishedYear};
    
    setLoading(true);
    axios.put(`http://localhost:5000/books/${id}`,data)
    .then((response) => {
      setLoading(false);
      enqueueSnackbar("Book Edited Successfully", { variant: "success" });
      console.log('Book updated successfully:', response.data);
      navigate('/');// Redirect to the book list page
    })
    .catch((error) => {
      setLoading(false);
      // alert('An error occurred. Please check console');
      enqueueSnackbar("Error", { variant: "error" });
      console.log('There was an error updating the book:', error.response?.data || error.message);
    })
  }
  return (
    <div className='p-4'> 
      <BackButton></BackButton>
      <h1 className='text-3xl my-4'>Edit Book</h1>
       {loading ? <Spinner /> :'' }
       <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 '>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-300 p-2 rounded-md w-full'
           />
        </div>
        <div className='my-4 '>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-300 p-2 rounded-md w-full'
           />
        </div>
        <div className='my-4 '>
          <label className='text-xl mr-4 text-gray-500'>Published Year</label>
          <input type="text"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          className='border-2 border-gray-300 p-2 rounded-md w-full'
           />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook} disabled={loading}>
          {loading? 'saving...' : 'save'}
        </button>
       </div>
    </div>
  )
}

export default EditBook