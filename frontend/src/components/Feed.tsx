import { useEffect, useState } from 'react';

interface Posts {
  id: number;
  titulo: string;
  descricao: string;
  image: string;
  usuarioid: string;
  usuario: string;
}

export default function Feed() {
  const [post, setPost] = useState<Posts>({
    id: 0,
    titulo: '',
    descricao: '',
    image: '',
    usuarioid: '',
    usuario: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`/api/registro`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setError('Erro ao buscar posts do blog');
      }
    };
    fetchBlogPosts();
  }, []);

  const AddPost = (e) => {
    const handleSubmit = () => {
      e.preventDefault();
      try {
        await AddPost(post);
        setPost({
          id: 0,
          titulo: '',
          descricao: '',
          image: '',
          usuarioid: '',
          usuario: '',
        });
      } catch (error) {
        console.error('Erro ao adicionar o post', error);
      }
    };
  };

  if (error) {
    <p>Pane no sistema, alguem desfigurou</p>;
  }

  return (
    <>
      <div>
        <h1>Feed</h1>
      </div>
      {/* Mapeamento dos posts */}
      <div className="div"></div>
    </>
  );
}
