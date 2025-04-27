import HttpError from "../helpers/httpErrors.js";

import User from "../models/model.user.js";
import Quiz from "../models/model.quizz.js";
import Option from "../models/model.option.js";
import Question from "../models/model.question.js";
import Submission from "../models/modal.submission.js";
import Answer from "../models/model.answer.js";
import sequelize from "../conf/config_db.js";
class QuizzService {
  async createQuizz({ userId, description, title }) {
    try {
      if (!userId) throw new HttpError("missing input", 404);
      //check user
      const isExistedUser = await User.findByPk(userId, {
        nest: true,
        raw: true,
      });
      if (!isExistedUser) throw new HttpError("user not existed", 404);
      const rs = await Quiz.create({
        created_by: userId,
        description,
        title,
      });
      return {
        ST: 200,
        EC: 0,
        EM: "CREATE QUIZZ SUCCESSFULLY",
        DATA: rs,
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async deleteQuizz({ quizId, userId }) {
    try {
      if (!quizId || !userId) throw new HttpError("missing input", 404);

      // Kiểm tra quizz có tồn tại không
      const quizz = await Quiz.findByPk(quizId);
      if (!quizz) throw new HttpError("quizz not found", 404);

      // Kiểm tra người dùng có quyền xóa quizz không
      if (quizz.created_by !== userId) {
        throw new HttpError(
          "you do not have permission to delete this quizz",
          403
        );
      }

      // Xóa quizz
      await quizz.destroy();

      return {
        ST: 200,
        EC: 0,
        EM: "DELETE QUIZZ SUCCESSFULLY",
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async updateQuizz({ quizId, userId, description, title }) {
    try {
      if (!quizId || !userId || !description || !title)
        throw new HttpError("missing input", 404);

      // Kiểm tra quizz có tồn tại không
      const quizz = await Quiz.findByPk(quizId);
      if (!quizz) throw new HttpError("quizz not found", 404);

      // Kiểm tra người dùng có quyền sửa quizz không
      if (quizz.created_by !== userId) {
        throw new HttpError(
          "you do not have permission to update this quizz",
          403
        );
      }

      // Cập nhật quizz
      quizz.description = description;
      quizz.title = title;
      await quizz.save();

      return {
        ST: 200,
        EC: 0,
        EM: "UPDATE QUIZZ SUCCESSFULLY",
        DATA: quizz,
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async getDetailQuizz({ id: quizId }) {
    try {
      const quizz = await Quiz.findByPk(quizId, {
        include: [
          {
            model: Question, // Bảng liên quan\
            attributes: ["id", "content", "quiz_id"],
            include: [
              {
                model: Option, // Bảng liên quan
                order: [["id", "ASC"]], // Sắp xếp bảng Option theo id tăng dần
                attributes: ["id", "option_text", "is_correct"],
              },
            ],
          },
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [[Question, "id", "ASC"]], // Sắp xếp Question theo id tăng dần
        nest: true,
      });
      if (!quizz) throw new HttpError("quizz not found", 404);
      return {
        ST: 200,
        EC: 0,
        EM: "GET DETAIL QUIZZ SUCCESSFULLY",
        DT: quizz,
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async submitQuizz({ userId, quizzId, answers }) {
    const transaction = await sequelize.transaction(); // Khởi tạo transaction
    try {
      //check userId
      const isExistedUser = await User.findByPk(userId, {
        nest: true,
        raw: true,
      });
      if (!isExistedUser) throw new HttpError("user not existed", 404);
      //check quizzId
      const isExistedQuizz = await Quiz.findByPk(quizzId, {
        nest: true,
        raw: true,
      });
      if (!isExistedQuizz) throw new HttpError("quizz not existed", 404);
      //check answers
      if (answers.length <= 0)
        throw new HttpError("there are no contents in answers", 400);
      const rs = answers.map(async (answer) => {
        const { questionId, optionId } = answer;
        if (!questionId || !optionId) throw new HttpError("missing input", 400);
        const isExistedOption = await Option.findOne({
          where: {
            id: optionId,
            question_id: questionId,
          },
        });
        if (!isExistedOption)
          throw new HttpError("option of question not existed", 404);
      });
      await Promise.all(rs);
      const listQuestions = await this.getDetailQuizz({ id: quizzId });
      if (listQuestions.EC == 1) throw new HttpError("quizz is empty", 400);
      const { Questions } = listQuestions.DT;
      if (!Questions) throw new HttpError("format Question wrong", 400);
      let correctAnswers = 0;
      let wrongAnswers = 0;

      const lengthQuestionDefault = Questions.length;
      const lengthAnswerDefault = answers.length;
      if (lengthAnswerDefault > lengthQuestionDefault)
        throw new HttpError("exceed quantity of questions", 400);
      let uncomplete = lengthQuestionDefault - lengthAnswerDefault;
      for (let question of Questions) {
        const { id, Options } = question;
        // console.log("------->", id, Options);
        if (!id || !Options)
          throw new HttpError(
            "format Question wrong in Id and option of question",
            400
          );
        const findItems = answers.find((item) => item.questionId === id);
        if (findItems) {
          const { optionId } = findItems;
          const isMatchOption = Options.find((item) => item.id === optionId);
          if (isMatchOption) {
            if (isMatchOption.is_correct) correctAnswers++;
            else wrongAnswers++;
          } else {
            throw new HttpError("format Answer wrong", 400);
          }
        } else {
        }
      }
      const score = (correctAnswers / Questions.length) * 100;
      const submitData = await Submission.create(
        {
          user_id: userId,
          quiz_id: quizzId,
          score,
          uncompleted: uncomplete,
          complete: Questions.length - uncomplete,
        },
        {
          transaction,
          raw: true,
        }
      );
      await Answer.bulkCreate(
        answers.map((answer) => ({
          question_id: answer.questionId,
          option_id: answer.optionId,
          submission_id: submitData.id,
        })),
        { transaction }
      );
      // Commit transaction sau khi tất cả thao tác thành công
      await transaction.commit();
      return {
        ST: 200,
        EC: 0,
        EM: "SUBMIT QUIZZ SUCCESSFULLY",
        DT: {
          correctAnswers,
          wrongAnswers,
          score,
          percentageLack: (correctAnswers / answers.length) * 100,
          uncomplete,
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async getAllQuizzes() {
    try {
      const quizzes = await Quiz.findAll({
        order: [["id", "ASC"]], // Chỉ lấy Quiz, sắp xếp theo id tăng dần
      });

      return {
        ST: 200,
        EC: 0,
        EM: "Get all quizzes successfully",
        DT: quizzes,
      };
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return {
        ST: error.status | 500,
        EC: 1,
        EM: error.message | "Internal server error",
      };
    }
  }
}
export default new QuizzService();
