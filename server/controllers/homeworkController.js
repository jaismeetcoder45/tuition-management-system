import Homework from "../models/Homework.js";

export const getHomework = async (
  req,
  res
) => {
  const homework =
    await Homework.find()
      .populate("studentId");

  res.json(homework);
};

export const addHomework = async (
  req,
  res
) => {
  const homework =
    await Homework.create(req.body);

  res.json(homework);
};

export const updateHomework = async (
  req,
  res
) => {
  const updated =
    await Homework.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updated);
};

export const deleteHomework = async (
  req,
  res
) => {
  await Homework.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });
};