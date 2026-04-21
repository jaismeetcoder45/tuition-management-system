import Progress from "../models/Progress.js";

export const getProgress = async (req, res) => {
  const progress = await Progress.find()
    .populate("studentId");

  res.json(progress);
};

export const addProgress = async (req, res) => {
  const progress = await Progress.create(
    req.body
  );

  res.json(progress);
};

export const updateProgress = async (
  req,
  res
) => {
  const updated =
    await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updated);
};

export const deleteProgress = async (
  req,
  res
) => {
  await Progress.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });
};