import classes from '../../../styles/post-content.module.css';
import PostHeader from './post-header';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started with NextJS',
  image: 'getting-started-nextjs.png',
  date: '2022-02-10',
  // markdown symbole: # => <h1>, ## => <h2>, ### => <h3>, #### => <h4>, ##### => <h5>, ###### => <h6>
  content: '# This is a first post\n\nAnd this is the first post content',
};

export default function PostContent(props) {
const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      {DUMMY_POST.content}
    </article>
  );
}