/*
    1. Hero section => Present ourselves: elle nous permet de presenter notre produit (titre, image, description)
    2. Featured Posts section => Les fonctionnalités de notre produit
*/

import Head from "next/head";

import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-utils";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Emmanuel's Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts}/>
    </Fragment>
  );
}

/*
    Ne pas perdre de vue qu'il faut que les donnees soient pre-rendered pour que le SEO soit bon. vue que nous n'avons pas de api (nos donnees sont dans le fichier markdown de notre projet) pour nous accorder les acces (requete), nous ne pouvons pas utiliser useEffect pour fetcher les donnees cote client car nous n'avons pas acces a ce fichier de l'interieur de nos composants (pas d'api route). 
    Et meme si nous avions une api, il serait plus judicieux de fetcher les donnees cote serveur pour eviter les problemes de SEO car nous aurions l'acces aux donnees (possibilite de les recuperer) mais elles ne seront pas pre-rendues au chargement.

    Pour cela, nous allons utiliser la fonction distincte getStaticProps pour fetcher les donnees cote serveur et les passer en props a notre composant HomePage
*/

export function getStaticProps() {
  const FeaturedPosts = getFeaturedPosts();

  return {
    props: {
      posts: FeaturedPosts
    },
    // revalidate: 600
  }
}
