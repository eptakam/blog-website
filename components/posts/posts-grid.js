/*
    permettra de rendre les post-items dans une grille
*/

import classes from '../../styles/posts-grid.module.css';
import PostItem from './post-item';

export default function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul>
      {posts.map((post) => <PostItem />)}
    </ul>
  );
}