const User = require("../models/User");

exports.addUser = async (req, res) => {
  const { uid, name, email, role } = req.body;

  try {
    let user = await User.findById(uid);

    if (!user) {
      user = new User({
        _id: uid,
        name,
        email,
        role,
        events: [],
      });

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getUsersEvents = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id).populate("events");

    res.status(200).send(user.events);
  } catch (error) {
    res.status(400).send({ message: "Server Error" });
  }
};

exports.getUsersRole = async (req, res) => {
  const userId = req.user.uid;

  if (!userId) {
    res.status(400).send({ message: "User ID is missing!" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found!");
      res.status(404).send({ message: "User not found!" });
    }

    res.send({ role: user.role });
  } catch (error) {
    console.error("Error retrieving user role: ", error);
    res.status(500).send({ message: "Server Error" });
  }
};
