import React, {useEffect, useRef} from 'react';
import {useGame} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';
import Awnsers from './Awnsers';
import {Fade} from '../Animations';

export default function Quiz() {
  const {quiz, setQuiz, hubConnect} = useGame();

  const onQuestion = (data) => {
    console.log('HSUAUHSUAHSUA', data);
    console.log('v', quiz);

    // let newAnswers = quiz.answer;
    // newAnswers[0] = data.answer1;
    // newAnswers[1] = data.answer2;
    // newAnswers[2] = data.answer3;
    // newAnswers[3] = data.answer4;
    // setQuiz({
    //   ...quiz,
    //   answers: newAnswers,
    //   questionImage: data.image,
    //   question: data.title,
    // });

  };

  const componentSmall = !!quiz.questionImage;

  const fadeRef = useRef(null);

  useEffect(() => {
    // fadeRef.current.start();
  }, [fadeRef.current]);

  useEffect(() => {
    hubConnect.on('match-start-question', onQuestion);
    // return () => {
    //   hubConnect.off('match-start-question', onQuestion);
    // };
  }, [onQuestion]);

  return (
    <Container>
      {/* <Fade ref={fadeRef} duration={1000} style={{flex: 1}}> */}
        <QuestionContainer small={componentSmall}>
          <Question adjustsFontSizeToFit minimumFontScale={0.1}>
            {quiz.question}
          </Question>
        </QuestionContainer>

        <Image source={{uri: quiz.questionImage}} />
      {/* </Fade> */}
      <Awnsers />
    </Container>
  );
}
