import { ObjectId } from "mongodb";
import { User, Log } from "../db/model.js";

export const postUser = (req, res) => {
  //   console.log(req.body.username);
  //   console.log(User, "User is");
  const userData = async () => {
    try {
      const username = await User.create({ username: req.body.username });
      console.log(username);
      res.status(200).json({ username: username.username, _id: username._id });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
  userData();
};

export const getUser = (req, res) => {
  const userData = async () => {
    let userList = await User.find({});
    userList = userList.map((elem) => {
      return { username: elem.username, _id: elem._id };
    });
    res.status(200).json(userList);
  };
  userData();
};

export const postExercises = (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  const userData = async (findId) => {
    let user = await User.find({ _id: new ObjectId(findId) });
    // console.log(user);
    if (req.body.date === "") {
      req.body.date = undefined;
      // console.log(req.body.date, "date is null");
    }
    let logData;
    try {
      logData = await Log.create({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
      });
    } catch (err) {
      if (err.name == "ValidationError") {
        // console.log("Error Validating-----p1", err);
        res.status(400).json({ status: err.name, error: err.message });
      }
    }

    // console.log(logData, logData.date.toDateString());

    await User.findById(findId).updateOne({}, { $push: { log: logData._id } });
    // await User.findById(findId).updateOne(
    //   {},
    //   { $set: { count: user[0].log.length } }
    // );

    const updatedUser = await User.findById(findId).populate("log");

    updatedUser.count = updatedUser.log.length;
    console.log("count", updatedUser.count);
    await updatedUser.save();
    console.log("updatedUser=", updatedUser);
    res.status(200).json({
      username: updatedUser.username,
      description: logData.description,
      duration: logData.duration,
      date: logData.date.toDateString(),
      _id: findId,
    });
  };
  userData(req.params._id);

  // res.send("posting exercises");
};

export const getLogs = (req, res) => {
  // console.log(req.params._id);
  console.log(req.query);
  let { limit, from, to } = req.query;
  console.log(limit, "=limit", from, ":from", to, "=to");

  const userLogData = async (findId) => {
    let user = await User.findById(findId, {
      username: 1,
      count: 1,
      _id: 0,
    }).populate({
      path: "log",
      select: "description duration date -_id",
      // limit: limit,

      // match: { date: { $gte: from } },
    });

    console.log(user.log);

    let logFilter = [...user.log];

    // console.log(logFilter);

    logFilter = user.log.filter((elem) => {
      if (from && to) {
        console.log("p1");
        return elem.date >= new Date(from) && elem.date < new Date(to);
      } else if (from) {
        console.log("p2");
        return elem.date >= new Date(from);
      } else if (to) {
        console.log("p3");
        return elem.date < new Date(to);
      } else if (!from & !to) {
        return elem;
      }
    });

    console.log(logFilter);

    if (limit) {
      logFilter.splice(limit);
    }

    let logData = logFilter.map((elem) => {
      return {
        description: elem.description,
        duration: elem.duration,
        date: elem.date.toDateString(),
      };
    });

    let currentCount = logData.length;
    // console.log(logData);

    res.status(200).json({
      username: user.username,
      count: currentCount,
      _id: findId,
      log: logData,
    });
  };

  userLogData(req.params._id);
  // res.status(200).send("getting logs");
};
