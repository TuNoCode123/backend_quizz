import sequelize from "../conf/config_db.js";
import HttpError from "../helpers/httpErrors.js";
import Quiz from "../models/model.quizz.js";
import Question from "../models/model.question.js";
import Option from "../models/model.option.js";
class QuestionService {
  async creatQuestion({ quizzId, questions }) {
    const transaction = await sequelize.transaction(); // Khởi tạo transaction
    try {
      if (!quizzId || !questions) throw new HttpError("missing input", 400);
      if (questions.length <= 0)
        throw new HttpError("there are no contents in questions", 400);
      const checkQuizzExisted = await Quiz.findByPk(quizzId, {
        nest: true,
        raw: true,
      });
      if (!checkQuizzExisted) throw new HttpError("quizz not found", 404);
      for (let question of questions) {
        const { content, options } = question;
        if (!content) throw new HttpError("missing input", 400);
        const rs = await Question.create(
          {
            quiz_id: quizzId,
            content,
          },
          { transaction }
        );
        const plainData = rs.get({ plain: true });
        await Option.bulkCreate(
          options.map((option) => ({
            ...option,
            question_id: plainData.id,
          })),
          { transaction }
        );
      }
      // Commit transaction sau khi tất cả thao tác thành công
      await transaction.commit();

      return {
        ST: 200,
        EC: 0,
        EM: "CREATE QUESTION SUCCESSFULLY",
        //   DATA: quizz,
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
  async updateQuestion({ questionId, content, options }) {
    const transaction = await sequelize.transaction(); // Khởi tạo transaction
    try {
      if (!questionId || !content || !options)
        throw new HttpError("missing input", 400);

      const checkQuestionExisted = await Question.findByPk(questionId);
      if (!checkQuestionExisted) throw new HttpError("question not found", 404);

      // Cập nhật câu hỏi
      await Question.update(
        { content },
        { where: { id: questionId }, transaction }
      );

      // Cập nhật các tùy chọn (options)
      await Option.destroy({ where: { question_id: questionId }, transaction }); // Xóa các options cũ
      await Option.bulkCreate(
        options.map((option) => ({
          ...option,
          question_id: questionId,
        })),
        { transaction }
      );

      // Commit transaction sau khi tất cả thao tác thành công
      await transaction.commit();

      return {
        ST: 200,
        EC: 0,
        EM: "UPDATE QUESTION SUCCESSFULLY",
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
  async deleteQuestion({ id: questionId }) {
    const transaction = await sequelize.transaction(); // Khởi tạo transaction
    try {
      if (!questionId) throw new HttpError("missing input", 400);

      const checkQuestionExisted = await Question.findByPk(questionId);
      if (!checkQuestionExisted) throw new HttpError("question not found", 404);

      // Xóa các tùy chọn (options) của câu hỏi
      await Option.destroy({ where: { question_id: questionId }, transaction });

      // Xóa câu hỏi
      await Question.destroy({ where: { id: questionId }, transaction });

      // Commit transaction sau khi tất cả thao tác thành công
      await transaction.commit();

      return {
        ST: 200,
        EC: 0,
        EM: "DELETE QUESTION SUCCESSFULLY",
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
}
export default new QuestionService();
