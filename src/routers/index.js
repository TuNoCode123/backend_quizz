import HttpError from "../helpers/httpErrors.js";
import routerAuth from "./router.auth.js";
import routerQuestion from "./router.question.js";
import routerQuizz from "./router.quizz.js";

const router = (app) => {
  app.use("/api/v1", routerAuth);
  app.use("/api/v1", routerQuizz);
  app.use("/api/v1", routerQuestion);
  app.use((req, res, next) => {
    next(new HttpError("Could not find this route.", 404));
  });
  app.use((error, req, res, next) => {
    return res.status(error.code || 500).json({
      EC: 1,
      message: error.message || "An unknown error occurred!",
    });
  });
};
export default router;
