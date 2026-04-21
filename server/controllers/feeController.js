import Fee from "../models/Fee.js";

export const getFees =
  async (req, res) => {
    const fees =
      await Fee.find()
      .populate("studentId");

    res.json(fees);
};

export const addFee =
  async (req, res) => {
    const existingFee =
      await Fee.findOne({
        studentId: req.body.studentId,
        month: req.body.month
      });

    if (existingFee) {
      existingFee.amount =
        req.body.amount;

      existingFee.status =
        req.body.status;

      await existingFee.save();

      return res.json(existingFee);
    }

    const fee =
      await Fee.create(req.body);

    res.json(fee);
};

export const deleteFee =
  async (req, res) => {
    await Fee.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Fee Deleted"
    });
};