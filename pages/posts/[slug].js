import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-utils";

export default function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const postData = getPostData(params.slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

// vu que c'est une route dynamique pour afficher les details lies a un post en particulier, nous avons besoin de specifier exactement le slug qui sera pre-rendu d'ou la necessite de la fonction getStaticPaths pour le faire

// l'idee est de generer tous nos posts en avance pour que lorsqu'un utilisateur visite un post, il n'ait pas a attendre que le serveur genere le post. meme si nous ne savons pas encore sur quel post l'utilisateur va cliquer, nous pouvons generer tous les posts en avance pour eviter les problemes de SEO

export function getStaticPaths() {
  // recuperer les noms des fichiers markdown avec leur extension dans le repertoire posts grace a la fonction getPostsFiles du fichier lib/posts-utils.js
  const postFileNames = getPostsFiles();

  // generer les slugs (noms sans extension) des fichiers markdown
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };

  // on peut aussi faire ceci
  // return {
  //   paths: [],
  //   fallback: true, // ou 'blocking'
  // };
}
