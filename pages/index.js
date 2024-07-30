/*
    1. Hero section => Present ourselves: elle nous permet de presenter notre produit (titre, image, description)
    2. Featured Posts section => Les fonctionnalités de notre produit
*/

import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

export default function PostDetailPage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts />
    </Fragment>
  );
}
