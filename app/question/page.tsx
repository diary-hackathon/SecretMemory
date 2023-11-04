"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLE_NAME = 'questions'

export const getList = async () => {
    try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select('*')
          .order('created_at')
  
        if (error) throw new Error(error)
  
        return data
      } catch (e) {
          console.error(e.message)
      }
  };

export default function questionPage(){
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getList();
            setQuestions(data);
            console.log(data);
        };

        fetchData();
    }, []);

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
                    <div className="bg-gray-300 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2>質問回答ページ</h2>
                            <div className='px-5'>
                                {questions.map((question) => (
                                    <div key={question.id}>
                                        <p>{question.content}</p>
                                        <input 
                                            type="text" 
                                            value={question.answer} 
                                            onChange={e => handleAnswerChange(question.id, e.target.value)}
                                            />
                                    </div>
                                ))}
                                <button className='rounded text-center p-1 bg-gray-900 text-gray-100 w-64 hover:bg-gray-700' onClick={() => console.log(questions)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}