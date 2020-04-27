const Question = use("App/Models/Question")

/**
 * Get a random question which is not in alreadyPlayedQuestions
 *
 * @param {array} alreadyPlayedQuestions
*/
module.exports.getRandomQuestion = async (alreadyPlayedQuestions) => {
    const question = await Question.findBy('id', 2);

    return {
        id: question.id,
        title: question.title,
        image: question.image,
        answer1: question.answer1,
        answer2: question.answer2,
        answer3: question.answer3,
        answer4: question.answer4
    }
  
}