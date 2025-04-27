import questionService from "../services/question.service.js";

class QuestionController {
  async creatQuestion(req, res, next) {
    try {
      const response = await questionService.creatQuestion(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async updateQuestion(req, res, next) {
    try {
      const response = await questionService.updateQuestion(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async deleteQuestion(req, res, next) {
    try {
      const response = await questionService.deleteQuestion(req.params);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
}
export default new QuestionController();
