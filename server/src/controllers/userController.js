const UserModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send({ data: data, message: "Data GET Success" });
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.send({ data: data, message: "Unique Data GET Success" });
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, age, email, address } = req.body;
    const postData = new UserModel({
      name: name,
      age: age,
      email: email,
      address: address,
    });
    await postData.save();
    const responseData = {
      receivedData: postData,
      message: "Data Received Successfully",
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, email, address } = req.body;
    const putData = await UserModel.findByIdAndUpdate(
      id,
      { name, age, email, address },
      { new: true }
    );
    if (!putData) {
      return res.status(404).send({ message: "Data not found" });
    }
    const responseData = {
      receivedData: putData,
      message: "Data Updated Successfully",
    };
    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await UserModel.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).send({ message: "Data not found" });
    }
    const responseData = { message: "Data Deleted Successfully" };
    res.send(responseData);
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};
