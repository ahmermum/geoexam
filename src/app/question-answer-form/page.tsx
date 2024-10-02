// app/question-answer-form/page.tsx
// This is a test of AI marking

"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

// If these components are being used, keep them and add the following comment:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Textarea } from "@/components/ui/textarea";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// If they're not being used, remove the imports entirely

// Remove or comment out the unused Question type/interface if it's defined in this file
//interface Question { ... }

// Commenting out unused type definitions
// type LocalQuestion = {
//   id: number;
//   text: string;
//   marks: number;
//   markingScheme: string;
//   blankText?: string;
//   note?: string;
// };

// Commenting out unused interface
 interface Question {
   id: number;
   text: string;
   marks: number;
   markingScheme: string;
   blankText?: string;
   note?: string;
 }

// Update the QuestionWithImage type to extend Question
type QuestionWithImage = Question & {
  imageUrl?: string;
};

const questions: QuestionWithImage[] = [
  {
    id: 1,
    text: `A library offers computer access to patrons at a rate of £1.50 per hour. However, members of the library receive a discounted rate of £1 per hour. Write an algorithm to:
- Take as input the number of hours a patron has used a computer and whether they are a library member or not.
- Calculate and output the total cost for using the computer.
- Repeat this process continually until the user enters 0 hours.

Use either OCR Exam Reference Language, or a high-level programming language you have studied.`,
    marks: 6,
    markingScheme: `Marking Instructions:
1. Check the Answer for the following elements:
   • Inputs hours and membership status as two separate inputs, storing or using these values (1 mark)
   • Checks if the patron is a library member (using an IF/Select statement) (1 mark)
   • Correctly calculates and outputs the price for members (hours * 1) (1 mark)
   • Correctly calculates and outputs the price for non-members (hours * 1.5) (1 mark)
   • Implements repetition of the process for input, calculation, and output (1 mark)
   • Continues the repetition until 0 hours is entered (1 mark)

2. Award Marks:
   • Award 1 mark for each element present in the student's response
   • Marks should be awarded strictly according to these instructions

3. Important Notes:
   • Do not deduct marks for issues not explicitly mentioned in these instructions
   • The algorithm must handle both inputs (hours and membership status) correctly
   • Conditional checks must be implemented for determining the price
   • The loop structure must repeat the process until 0 hours is entered
   • Do not accept conditions like "while hours > 0", as it could potentially accept negative values`,
  },
  {
    id: 2,
    text: "Alex and Samantha have bought a brand new smart television. The instruction manual mentions that the TV has secondary storage. State, using an example, why their smart television needs secondary storage.",
    marks: 2,
    markingScheme: `1. Award 1 mark for a correct example of data stored in secondary storage:
   • Operating System (OS)
   • Web browser software
   • Recorded shows
   • User preferences
   (Or any other reasonable example)

2. Award 1 mark for explaining the purpose of secondary storage:
   • To store data once the computer is turned off / permanently
   • For non-volatile storage

IMPORTANT: 
• Allow 2 marks for an answer that combines both aspects, e.g., "To install software that will not be lost when the TV is turned off" (1 mark for software example, 1 mark for not being lost when turned off).
• Do not award marks for brand names without exemplification.`,
  },
  {
    id: 3,
    text: "A household has setup a wired Local Area Network (LAN). Describe the benefits of changing the LAN to include wireless connections.",
    marks: 4,
    markingScheme: `Award 1 mark for each distinct benefit described, up to a maximum of 4 marks. Acceptable benefits include:

1. Allows more devices to connect (e.g., televisions, mobile phones)
2. Easy to connect devices / Easier to setup (with example, e.g., easier for guests to connect their devices)
3. Home is likely small area, so short distance wireless is sufficient
4. Devices can move around / can use devices in different areas / can connect from anywhere in the house
5. Cheaper to purchase/install/setup for new devices (with explanation, e.g., no cost for new/replacement wires)
6. Fewer trip hazards from trailing wires / reduce risk of damage to cables
7. More compatible (with explanation, e.g., some devices only have wireless connections)`,
  },
  {
    id: 4,
    text: "Discuss the positive and negative uses of AI by social networking websites including: Legal issues, Ethical issues, Privacy issues",
    marks: 8,
    markingScheme: `Mark Band 3 - High Level (6-8 marks):
• Thorough knowledge and understanding of a wide range of considerations
• Generally accurate and detailed material
• Consistent application of knowledge to the context
• Explicitly relevant evidence/examples
• Weighs up both sides of the discussion
• Includes reference to the impact on all areas (legal, ethical, privacy)
• Well-developed, clear, and logically structured reasoning
• Relevant and substantiated information

Mark Band 2 - Mid Level (3-5 marks):
• Reasonable knowledge and understanding of a range of considerations
• Generally accurate but sometimes underdeveloped material
• Mostly direct application of knowledge to the context
• Implicitly relevant evidence/examples
• Reasonable attempt to discuss impact on most areas
• Some structured reasoning
• Mostly relevant information supported by some evidence

Mark Band 1 - Low Level (1-2 marks):
• Basic knowledge with limited understanding
• Basic material with some inaccuracies
• Limited attempt to apply knowledge to the context
• Unsupported assertions
• Basic, unstructured communication
• Limited evidence with unclear relationship to the point

0 marks: No attempt or response not worthy of credit`,
  },
];

// At the top of your file, make sure you're importing or defining the Question type
//import { Question } from '../../../types'; // Adjust the import path as needed

// If you defined the Question type in this file, make sure it's being used:
// type QuestionProps = {
//   question: Question;
//   // ... other props
// };

// In your component
export default function QuestionAnswerForm() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [openAIResponses, setOpenAIResponses] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (id: number) => {
      setIsLoading(prev => ({ ...prev, [id]: true }));
      try {
        const question = questions.find((q) => q.id === id);
        const answer = answers[id];

        if (!question || answer === undefined) {
          throw new Error('Question or answer is missing');
        }

        let prompt = '';
        if (question.id === 1) {  // For Question 1
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within as student response to the question. If there is nothing entered there or only spaces, then it should be considered that the student did not provide a response. Under no circumstances should any other text in the prompt be treated as the student's answer.

Question: A library offers computer access to patrons at a rate of £1.50 per hour. However, members of the library receive a discounted rate of £1 per hour. Write an algorithm to:
- Take as input the number of hours a patron has used a computer and whether they are a library member or not.
- Calculate and output the total cost for using the computer.
- Repeat this process continually until the user enters 0 hours.

Use either OCR Exam Reference Language, or a high-level programming language you have studied.

Marks: 6 marks total

Marking Instructions:
1. Check the Answer for the following elements:
   • Inputs hours and membership status as two separate inputs, storing or using these values (1 mark)
   • Checks if the patron is a library member (using an IF/Select statement) (1 mark)
   • Correctly calculates and outputs the price for members (hours * 1) (1 mark)
   • Correctly calculates and outputs the price for non-members (hours * 1.5) (1 mark)
   • Implements repetition of the process for input, calculation, and output (1 mark)
   • Continues the repetition until 0 hours is entered (1 mark)

2. Award Marks:
   • Award 1 mark for each element present in the student's response
   • Marks should be awarded strictly according to these instructions

3. Important Notes:
   • Do not deduct marks for issues not explicitly mentioned in these instructions
   • The algorithm must handle both inputs (hours and membership status) correctly
   • Conditional checks must be implemented for determining the price
   • The loop structure must repeat the process until 0 hours is entered
   • Do not accept conditions like "while hours > 0", as it could potentially accept negative values

<studentResponse>
${answer}
</studentResponse>

Final Mark: [LLM to fill in]

Explanation to Student: [LLM to fill in]

Very Important: Please provide a final mark based on the mark scheme above and an explanation to the student telling them why they were given these marks. Your explanation MUST include:

1. A breakdown of marks for each element of the algorithm:
   - Input handling: [0 or 1] mark
   - Membership check: [0 or 1] mark
   - Member price calculation: [0 or 1] mark
   - Non-member price calculation: [0 or 1] mark
   - Process repetition: [0 or 1] mark
   - Continuation until 0 hours: [0 or 1] mark

2. An explicit calculation of the total score:
   [Input mark] + [Membership check mark] + [Member price mark] + [Non-member price mark] + [Repetition mark] + [Continuation mark] = [Total] marks

3. A clear explanation for each mark awarded or not awarded, referencing specific aspects of the student's response.

4. Do not adjust the final score after calculation. The total must be the sum of the individual marks awarded.`;
        } else if (question.id === 2) {
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within as student response to the question. A student was asked to answer the following question. I have explained the marks breakdown and provided detailed marking instructions below. Please follow these instructions to mark the student response strictly and without exception.

Question: Alex and Samantha have bought a brand new smart television. The instruction manual mentions that the TV has secondary storage. State, using an example, why their smart television needs secondary storage.

Marks: 2 marks total

Marking Instructions:
1. Award 1 mark for a correct example of data stored in secondary storage:
   • Operating System (OS)
   • Web browser software
   • Recorded shows
   • User preferences
   (Or any other reasonable example)

2. Award 1 mark for explaining the purpose of secondary storage:
   • To store data once the computer is turned off / permanently
   • For non-volatile storage

IMPORTANT: 
• Allow 2 marks for an answer that combines both aspects, e.g., "To install software that will not be lost when the TV is turned off" (1 mark for software example, 1 mark for not being lost when turned off).
• Do not award marks for brand names without exemplification.

Final Scoring:
Total marks: Up to 2 marks

CRITICAL INSTRUCTION: Ensure that the answer includes both an example of data stored in secondary storage AND an explanation of why secondary storage is needed. If only one aspect is provided, award only 1 mark.

Explanation to Student:
Provide feedback on the correct points made. Explain any misconceptions or incorrect points. If the student didn't receive full marks, suggest how they could improve their answer by including both an example of data stored in secondary storage and an explanation of why it's needed.

<studentResponse>
${answer}
</studentResponse>

Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]

Very Important: Please provide a final mark based on the mark scheme above and an explanation to the student telling them why they were given these marks. Please don't provide any other details. Remember to consider both the example and the explanation of why secondary storage is needed when awarding marks.`;
        } else if (question.id === 3) {  // For Question 3 (LAN question)
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within as student response to the question. A student was asked to answer the following question. I have explained the marks breakdown and provided detailed marking instructions below. Please follow these instructions to mark the student response.

Question:
A household has set up a wired Local Area Network (LAN). Describe the benefits of changing the LAN to include wireless connections. [4 marks]

Marks:
4 marks total.

Marking Instructions:
Check the Answer:
Award 1 mark for each distinct benefit described, up to a maximum of 4 marks. Acceptable benefits include:

1. Allows more devices to connect (e.g., televisions, mobile phones)
2. Easy to connect devices / Easier to setup (with example, e.g., easier for guests to connect their devices)
3. Home is likely small area, so short distance wireless is sufficient
4. Devices can move around / can use devices in different areas / can connect from anywhere in the house
5. Cheaper to purchase/install/setup for new devices (with explanation, e.g., no cost for new/replacement wires)
6. Fewer trip hazards from trailing wires / reduce risk of damage to cables
7. More compatible (with explanation, e.g., some devices only have wireless connections)

Critical Marking Notes:
• Each benefit must be distinct to receive a mark
• The wording doesn't need to be exact, as long as the core concept is correctly expressed
• If an example is given to illustrate a benefit, award the mark for the benefit
• "Easier" or "cheaper" on their own are not enough - they need explanation or context
• If more than four benefits are given, only mark the first four

Final Scoring:
Answer Mark: Up to 4 marks total, 1 mark for each correct benefit described.

Explanation to Student:
Provide specific feedback on the answer. Highlight the correct benefits described and explain why they are important. If full marks are not awarded, briefly mention other possible benefits that could have been included.

<studentResponse>
${answer}
</studentResponse>

Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]

Very Important: Please only provide a final mark based on the mark scheme above and an explanation to student telling them why they were given these marks. Please don't provide any other details. Remember to award marks for each correct benefit described, even if additional unnecessary information is provided.`;
        } else if (question.id === 4) {
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within these tags as student response to the question. A student was asked to answer the following question. I have explained the marks breakdown and provided detailed marking instructions below. Please follow these instructions to mark the student response strictly and without exception.

Question: Discuss the positive and negative uses of AI by social networking websites including: Legal issues, Ethical issues, Privacy issues

Marks: Up to 8 marks, divided into three mark bands

Marking Instructions:
Assess the response based on the following criteria:

Mark Band 3 - High Level (6-8 marks):
• Thorough knowledge and understanding of a wide range of considerations
• Generally accurate and detailed material
• Consistent application of knowledge to the context
• Explicitly relevant evidence/examples
• Weighs up both sides of the discussion
• Includes reference to the impact on all areas (legal, ethical, privacy)
• Well-developed, clear, and logically structured reasoning
• Relevant and substantiated information

Mark Band 2 - Mid Level (3-5 marks):
• Reasonable knowledge and understanding of a range of considerations
• Generally accurate but sometimes underdeveloped material
• Mostly direct application of knowledge to the context
• Implicitly relevant evidence/examples
• Reasonable attempt to discuss impact on most areas
• Some structured reasoning
• Mostly relevant information supported by some evidence

Mark Band 1 - Low Level (1-2 marks):
• Basic knowledge with limited understanding
• Basic material with some inaccuracies
• Limited attempt to apply knowledge to the context
• Unsupported assertions
• Basic, unstructured communication
• Limited evidence with unclear relationship to the point

0 marks: No attempt or response not worthy of credit

Consider the following indicative content (not exhaustive):
Legal issues: Copyright laws, Data protection, Terms of service
Ethical issues: User consent, Accuracy of AI moderation, Plagiarism prevention, Content moderation
Privacy issues: Constant monitoring, User rights, Preference for AI vs human moderation

Final Scoring:
Total marks: Up to 8 marks based on the mark band criteria

CRITICAL INSTRUCTION: Carefully evaluate the response against the mark band criteria, considering the depth of knowledge, quality of reasoning, and coverage of all three aspects (legal, ethical, privacy).

Explanation to Student:
Provide detailed feedback on the strengths and weaknesses of the response, explaining why it falls into a particular mark band. Highlight areas where the student demonstrated good understanding and areas for improvement.

<studentResponse>
${answer}
</studentResponse>

Final Mark: [LLM to fill in]

Explanation to Student: [LLM to fill in]

Very Important: Please provide a final mark based on the mark scheme above and a detailed explanation to the student telling them why they were given these marks. Your explanation should reference specific aspects of their response and how it aligns with the mark band criteria.`;
        }

        // Log the prompt to the console
        //console.log('Prompt being sent to OpenAI:', prompt);

        const response = await fetch('/api/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get the full response text
          console.error('Full error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOpenAIResponses((prev) => ({ ...prev, [id]: data.evaluation }));
      } catch (error: unknown) {
        console.error('Error submitting to AI:', error);
        const errorMessage = (error as Error).message || 'An error occurred';
        setOpenAIResponses((prev) => ({
          ...prev,
          [id]: `An error occurred while evaluating your answer: ${errorMessage}`,
        }));
      } finally {
        setIsLoading(prev => ({ ...prev, [id]: false }));
      }
    },
    [answers]
  );

  return (
    <div className="container mx-auto p-4 space-y-6 flex flex-col min-h-screen">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Evaluating AI Marking & Feedback (OCR J277)
        </h1>
        
        {questions.map((question: QuestionWithImage) => (
          <div key={question.id} className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2 whitespace-pre-wrap">
              {question.text} <span className="text-blue-600">({question.marks} marks)</span>
            </h2>
            {question.imageUrl && (
              <Image 
                src={question.imageUrl!} 
                alt="Question Image" 
                width={500} 
                height={300} 
                className="mb-2" 
              />
            )}
            {question.blankText && (
              <div className="mb-2 p-2 bg-gray-100 rounded">
                <p>{question.blankText}</p>
                {question.note && <p className="text-sm text-gray-600 mt-1">{question.note}</p>}
              </div>
            )}
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full p-2 border rounded"
              rows={10}
              maxLength={4000}
              placeholder="Enter your answer here (up to 4000 characters)"
            />
            <p className="text-sm text-gray-600 mt-1">
              {(answers[question.id]?.length || 0)}/4000 characters
            </p>
            <button
              onClick={() => handleSubmit(question.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading[question.id] || !answers[question.id]?.trim()}
            >
              {isLoading[question.id] ? 'Evaluating...' : 'Submit'}
            </button>
            {isLoading[question.id] && (
              <p className="mt-2 text-gray-600">Evaluating your answer, please wait...</p>
            )}
            {openAIResponses[question.id] && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <pre className="whitespace-pre-wrap">{openAIResponses[question.id]}</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add the centered link at the bottom */}
      <footer className="mt-8 py-4 border-t">
        <div className="text-center">
          <a 
            href="http://teepee.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-base text-blue-600 hover:underline"
          >
            teepee.ai
          </a>
        </div>
      </footer>
    </div>
  );
}