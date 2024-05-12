import './b_post.css'
import { useNavigate, useParams } from "react-router-dom";
import { Article, articles } from '../articles'
import { useEffect, useState } from "react";
import Header from '../../../components/header';

export default function BlogPost() {
  const [article, setArticle] = useState<Article | null>(null)
  const [text, setText] = useState<string[] | undefined>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const article = articles.find((article) => article.title === params.bl)
    if (!article) {
      navigate('/error', {
        replace: false,

        state: {
          message: `The article ${params.bl} was not found.`,
          returnTo: '/blog'
        },
      })
    }
    setArticle(article ?? null)
    setIsLoading(false)
    setText(article?.content.split('\n'))
  }, [params.bl, navigate])
  
  if (isLoading) return null;
  if (!article) return null

  return (
    <div className='container'>
      <Header />
      <div className='b_container'>
        <article>
          <h1 className='b_title'>{article.title}</h1>
          {text?.map((t, i) => <p key={i} className='b_paragraph'>{t}</p>)}
        </article>
      </div>
    </div>
  );
}