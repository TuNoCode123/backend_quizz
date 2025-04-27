// models/index.js

import Submission from "./modal.submission.js";
import Answer from "./model.answer.js";
import Option from "./model.option.js";
import Question from "./model.question.js";
import Quiz from "./model.quizz.js";
import User from "./model.user.js";

// Nếu cần set quan hệ (association) thì set ở đây
User.hasMany(Quiz, { foreignKey: "created_by" });
Quiz.belongsTo(User, { foreignKey: "created_by" });

Quiz.hasMany(Question, { foreignKey: "quiz_id" });
Question.belongsTo(Quiz, { foreignKey: "quiz_id" });

Option.belongsTo(Question, { foreignKey: "question_id" });
Question.hasMany(Option, { foreignKey: "question_id" });

Submission.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Submission, { foreignKey: "user_id" });

Submission.belongsTo(Quiz, { foreignKey: "quiz_id" });
Quiz.hasMany(Submission, { foreignKey: "quiz_id" });

Submission.hasMany(Answer, { foreignKey: "submission_id" });
Answer.belongsTo(Submission, { foreignKey: "submission_id" });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

Answer.belongsTo(Option, { foreignKey: "option_id" });
Option.hasMany(Answer, { foreignKey: "option_id" });

// Answer

export { User, Quiz, Question, Submission, Option, Answer };
