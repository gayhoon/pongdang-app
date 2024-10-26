interface Board {
  id: number;
  title: string;
  content: string;
}

interface BoardListProps{
    boards: Board[];
}

const BoardList = ({boards}:BoardListProps) => {

  return (
    <div style={{marginTop: '40px'}}>
      <h2>조행기 게시글 목록</h2>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <h3>{board.title}</h3>
            <p>{board.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList