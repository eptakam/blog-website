/*
    ici nous avons les utilitaires pour extraire les données du fichier markdown

    nous aurons besoin du package gray-matter pour extraire les données du fichier markdown (npm install gray-matter)
*/
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const postSlug = fileName.replace(/\.md$/, ''); // removes the file extension
  
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirync(postsDirectory);

  // retourner les données des fichiers markdown dans un tableau
  // for (const postFile of postFiles) {
  //   const postData = getPostData(postFile);
  //   posts.push(postData);
  // }

  // ou l'on peut utiliser la méthode map pour retourner les données des fichiers markdown dans un tableau
  const allPosts = postFiles.map(postFile => getPostData(postFile));

  // trier les posts par date (la date la plus grande est la plus récente)
  const sortedPost = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
  return sortedPost;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);
  return featuredPosts;
}

