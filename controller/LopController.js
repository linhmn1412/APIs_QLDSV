import Lop from "../models/Lop.js";

//all tài khoản
export const getDSLop = async (req, res) => {
  try {
    const lops = await Lop.find();
    return res.status(200).json(lops);
  } catch (error) {
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const TaoLop = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new Lop(newTK);
  try {
    await ltc.save();

    return res.json({
      success: true,
      message: "Tạo lớp tín chỉ thành công",
    });
  } catch (error) {
    console.log("error", error);
    if (error.code == 11000) {
      return res.json({
        success: false,
        message: "Tên lớp tín chỉ bị trùng!",
      });
    }

    return res.json({
      success: false,
      message: "Lỗi khi tạo lớp tín chỉ!",
    });
  }
};
