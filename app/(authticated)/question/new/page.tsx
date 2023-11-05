// // 質問に答えるページ
// "use client"

// import { SupabaseClient } from '@supabase/supabase-js';
// import { cookies } from "next/headers"
// import { useState, useEffect } from 'react';
// import { redirect } from "next/navigation"
// import seedrandom from 'seedrandom';
// import withAuth from "@/app/withAuth"
// import { createClient } from "@/utils/supabase/server"

// const cookieStore = cookies()
// const supabase = createClient(cookieStore)

// const postAnswer = async (formData: FormData) => {

//     const written_date = formData.get("written_date") as string
//     const answer = formData.get("answer") as string
//     const user_id = (await supabase.auth.getUser()).data.user?.id
//     const question_id = formData.get("question_id") as string

//     const { error } = await supabase.from("answers").insert([
//         {
//             user_id,
//             question_id,
//             written_date,
//             answer
//         }
//     ])

//     if (error) {
//         console.error(user_id, question_id, written_date, answer)
//         console.error(error)
//         return redirect("/question/new?message=Could not post your answer")
//     }
//     return redirect("/calender")
// }

// const TABLE_NAME = 'questions'

// // 今日の日付をシード値として使用
// const seed = new Date().toISOString().slice(0,10); // YYYY-MM-DD format
// const rng = seedrandom(seed);

// // 全てのIDを取得する関数
// const getAllQuestionIds = async () => {
//     const { data, error } = await supabase.from(TABLE_NAME).select('id');
//     if (error) throw new Error(error);
//     return data.map(item => item.id);
// };

// // シード値を基にランダムなIDを5つ選択する関数
// const selectRandomIds = (allIds) => {
//     const shuffled = allIds.sort(() => 0.5 - rng());
//     return shuffled.slice(0, 5);
// };

// const getRandomQuestions = async () => {
//     try {
//         const allIds = await getAllQuestionIds();
//         const randomSelectedIds = selectRandomIds(allIds);
//         // console.log(randomSelectedIds);
//         const { data, error } = await supabase
//             .from(TABLE_NAME)
//             .select('*')
//             .in('id', randomSelectedIds);

//         if (error) throw new Error(error);
        
//         return data;
//     } catch (e) {
//         console.error(e.message);
//         return [];
//     }
// };

// async function questionPage(){
//     const [questions, setQuestions] = useState([]);
//     // console.log(`fetchData: ${JSON.stringify(questions, null, 2)}`);
//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await getRandomQuestions();
//             setQuestions(data);
//         };
//         fetchData();
//     }, []);
    

//     const handleAnswerChange = (id, answer) => {
//         const updatedQuestions = questions.map(q => 
//             q.id === id ? { ...q, answer } : q
//         );
//         setQuestions(updatedQuestions);
//     };

//     return(
//         <div className = "body">
//             <div className="py-12">
//                 <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-gray-300 overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             <h2 className='text-center'>質問回答ページ</h2>
//                             <form action={postAnswer} className="answer">
//                                 <div className='px-5'>
//                                     {questions.map((question) => (
//                                         <div key={question.id}>
//                                             <p>{question.content}</p>
//                                             <input type="hidden" name="written_date"/>
//                                             <input type="hidden" name="question_id"/>
//                                             <div className='text-center'>
//                                                 <textarea
//                                                     className='w-full'
//                                                     name="answer"
//                                                     rows="3"
//                                                     onChange={e => handleAnswerChange(question.id, e.target.value)}
//                                                     >{question.answer}</textarea>
//                                             </div>
                                            
//                                         </div>
//                                     ))}
//                                     <div className='mt-6 px-4 text-center'>
//                                         <input type="submit" className='rounded text-center p-2 bg-gray-900 text-gray-100 w-64 hover:bg-gray-700 w-full' value="保存"></input>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default withAuth(questionPage)
