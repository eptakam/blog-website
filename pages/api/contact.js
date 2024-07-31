import { MongoClient } from "mongodb"; // npm install mongodb

export default async function handler(req, res) {
  // verifier si la requete est de type POST
  if (req.method === "POST") {
    // extraire les donnees du corps de la requete
    const { email, name, message } = req.body;

    // valider les donnees
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    // stocker les donnees dans la BD
    // creer un objet message contenant les donnees issues du corps de la requete
    const newMessage = {
      email,
      name,
      message,
    };

    // Store in a database or send to an email
    // se connecter a la BD ('my-site' est le nom de la BD)
    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://emmataks:eblAM82OGS1jU73K@cluster0.n0prgxt.mongodb.net/my-site?retryWrites=true&w=majority&appName=Cluster0"
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Could not connect to database!" });
      return;
    }

    // acceder a la BD
    const db = client.db();

    // inserer le message dans la collection messages
    try {      
      const result = await db.collection("messages").insertOne(newMessage);

      // ajouter l'id du message a l'objet newMessage
      newMessage.id = result.insertedId;
    } catch (error) {
      // si une erreur survient lors de l'insertion
      client.close(); // fermer la connexion a la BD
      res
        .status(500)
        .json({ message: error.message || "Storing message failed!" });
      return;
    }

    // fermer la connexion a la BD
    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}
