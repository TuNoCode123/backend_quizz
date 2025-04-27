import quizzService from "../services/quizz.service.js";

class QuizController {
  async createQuizz(req, res, next) {
    try {
      const response = await quizzService.createQuizz(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async deleteQuizz(req, res, next) {
    try {
      const response = await quizzService.deleteQuizz(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async updateQuizz(req, res, next) {
    try {
      const response = await quizzService.updateQuizz(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async getDetailQuizz(req, res, next) {
    try {
      const response = await quizzService.getDetailQuizz(req.params);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async submitQuizz(req, res, next) {
    try {
      const response = await quizzService.submitQuizz(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async getAllQuizzs(req, res, next) {
    try {
      const response = await quizzService.getAllQuizzes();
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
}
export default new QuizController();
