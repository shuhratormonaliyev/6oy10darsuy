import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Boards() {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardColor, setNewBoardColor] = useState('green');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserEmail();
    fetchBoards();
  }, []);

  const getUserEmail = () => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  };

  const fetchBoards = () => {
    setIsLoading(true);
    axios.get('https://trello.vimlc.uz/api/boards/my-boards', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log('API response:', response.data); 
        if (Array.isArray(response.data)) {
          setBoards(response.data);
        } else if (response.data && Array.isArray(response.data.boards)) {
          setBoards(response.data.boards);
        } else {
          console.error('Kutilmagan ma\'lumot formati:', response.data);
          setBoards([]);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Boardlarni olishda xatolik:', error);
        console.error('Xato ma\'lumotlari:', error.response ? error.response.data : 'Ma\'lumot yo\'q');
        console.error('Xato statusi:', error.response ? error.response.status : 'Status yo\'q');
        console.error('To\'liq xato obyekti:', error);
        setError('Boardlarni yuklashda xatolik yuz berdi');
        setBoards([]);
        setIsLoading(false);
      });
  };

  const createBoard = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newBoardData = {
      name: newBoardName,
      description: newBoardDescription,
      color: newBoardColor
    };

    axios.post('https://trello.vimlc.uz/api/boards/create', 
      newBoardData,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(response => {
        setBoards([...boards, response.data]);
        setNewBoardName('');
        setNewBoardDescription('');
        setNewBoardColor('green');
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Board yaratishda xatolik:', error);
        setError('Board yaratishda xatolik yuz berdi');
        setIsLoading(false);
      });
  };

  const deleteBoard = (boardId) => {
    if (window.confirm('Haqiqatan ham bu boardni o\'chirmoqchimisiz?')) {
      setIsLoading(true);
      const data = {
        email: userEmail,
        boardId: boardId
      };

      axios.post(`https://trello.vimlc.uz/api/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { email: userEmail }
      })
        .then(response => {
          console.log('Board o\'chirildi:', response.data);
          setBoards(boards.filter(board => board.id !== boardId));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Boardni o\'chirishda xatolik:', error);
          console.error('Xato ma\'lumotlari:', error.response ? error.response.data : 'Ma\'lumot yo\'q');
          console.error('Xato statusi:', error.response ? error.response.status : 'Status yo\'q');
          setError('Boardni o\'chirishda xatolik yuz berdi: ' + (error.response ? error.response.data.message : error.message));
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Boardlar</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={createBoard} className="mb-4 space-y-2">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Yangi board nomi"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          value={newBoardDescription}
          onChange={(e) => setNewBoardDescription(e.target.value)}
          placeholder="Board tavsifi"
          className="p-2 border rounded w-full"
        />
        <select
          value={newBoardColor}
          onChange={(e) => setNewBoardColor(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="green">Yashil</option>
          <option value="blue">Ko'k</option>
          <option value="red">Qizil</option>
          <option value="yellow">Sariq</option>
        </select>
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Yuklanmoqda...' : 'Board yaratish'}
        </button>
      </form>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        Array.isArray(boards) && boards.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map(board => (
              <li key={board.id} className={`bg-${board.color}-100 p-4 rounded shadow`}>
                <h2 className="text-xl font-semibold">{board.name}</h2>
                <p className="text-gray-600">{board.description}</p>
                <button 
                  onClick={() => deleteBoard(board.id)}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  O'chirish
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Hech qanday board topilmadi.</p>
        )
      )}
    </div>
  );
}

export default Boards;