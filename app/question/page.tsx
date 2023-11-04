"use client"
import { useState } from 'react';
export default function questionPage(){
    const [questions, setQuestions] = useState([
        { id: 1, text: "What is your name?", answer: "" },
        { id: 2, text: "What is your favorite color?", answer: "" },
        { id: 3, text: "Where do you live?", answer: "" },
      ]);
    
      const handleAnswerChange = (id, answer) => {
        const updatedQuestions = questions.map(q => 
          q.id === id ? { ...q, answer } : q
        );
        setQuestions(updatedQuestions);
      };
    return(
        <div className = "body">
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                {questions.map((question) => (
                                    <div key={question.id}>
                                        <p>{question.text}</p>
                                        <input 
                                            type="text" 
                                            value={question.answer} 
                                            onChange={e => handleAnswerChange(question.id, e.target.value)}
                                            />
                                    </div>
                                ))}
                                <button onClick={() => console.log(questions)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}