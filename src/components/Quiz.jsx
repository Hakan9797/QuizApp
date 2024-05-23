import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  // Kullanıcının cevaplarını saklamak için state
  const [userAnswers, setUserAnswers] = useState([]);

  // Aktif soru indeksini belirleme
  const activeQuestionIndex = userAnswers.length;

  // Quiz tamamlandı mı kontrolü
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Kullanıcının cevap seçtiği durumu güncelleyen fonksiyon
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      // Seçilen cevabı önceki cevaplar dizisine ekleyerek güncelle
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  // Kullanıcının soruyu atladığı durumu güncelleyen fonksiyon
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // Quiz'i yeniden başlatan fonksiyon
  const handleRestartQuiz = useCallback(() => {
    // Yeniden başlatmak için userAnswers'ı sıfırla
    setUserAnswers([]);
  }, []);

  // Quiz tamamlandıysa özet sayfasını göster
  if (quizIsComplete) {
    return (
      <div>
        <Summary userAnswers={userAnswers} />
        <button id="restart-button" onClick={handleRestartQuiz}>
          Restart the Quiz
        </button>
      </div>
    );
  }

  // Quiz devam ediyorsa aktif soruyu göster
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
