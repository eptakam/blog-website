/*
    ici nous avons les utilitaires pour extraire les données du fichier markdown

    nous aurons besoin du package gray-matter pour extraire les données du fichier markdown (npm install gray-matter)
*/
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// construire le chemin du répertoire posts
/*
    path.join(): Une méthode du module path de Node.js qui joint tous les segments de chemin spécifiés en un seul chemin.
    process.cwd(): Une méthode de Node.js qui renvoie le répertoire de travail actuel (Current Working Directory) du processus Node.js.
    'posts': Le nom du répertoire que vous souhaitez joindre au répertoire de travail actuel.

    Exemple:
          Supposons que votre projet soit situé dans le répertoire C:\Users\Username\my-project. Voici comment le code fonctionne :

          process.cwd() renvoie C:\Users\Username\my-project.
          path.join(process.cwd(), 'content\posts') joint ce chemin avec 'content\posts', ce qui donne C:\Users\Username\my-project\content\posts.
          
          Donc, postsDirectory contiendra le chemin absolu C:\Users\Username\my-project\content\posts.
*/
const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostData(fileName) {
  // construire le chemin du fichier markdown
  const filePath = path.join(postsDirectory, fileName);

  // lire le contenu du fichier markdown
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // extraire les données du fichier markdown par la destructuration
  const { data, content } = matter(fileContent);

  // extraire le slug du nom du fichier en supprimant l'extension .md (la remplacer par une chaine vide)
  // exemple: hello-world.md => hello-world
  const postSlug = fileName.replace(/\.md$/, ''); 
  
  // construire les données du post: un objet qui contient le slug, les données et le contenu
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  // lire les noms des fichiers dans le répertoire posts
  const postFiles = fs.readdirSync(postsDirectory);

  // retourner les données des fichiers markdown dans un tableau

  // Methode #1: en utilisant une boucle for
  // for (const postFile of postFiles) {
  //   const postData = getPostData(postFile);
  //   posts.push(postData);
  // }

  // Methode #2: en utilisant la méthode map
  const allPosts = postFiles.map(postFile => getPostData(postFile));

  // trier les posts par date (la date la plus grande est la plus récente)
  const sortedPost = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
  return sortedPost;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  // filtrer les posts qui sont en vedette (isFeatured = true)
  const featuredPosts = allPosts.filter(post => post.isFeatured);
  return featuredPosts;
}

