export default function handler(req, res) {
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
    console.log(newMessage);

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}
