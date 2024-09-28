// app/question-answer-form/page.tsx
// This is a test of AI marking

"use client";

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const questions = [
  {
    id: 1,
    text: "What is the difference between a food chain and a food web?",
    marks: 1,
    markingScheme: `Marking Instructions:
- A food web has a number of connected food chains, (whereas a food chain consists of only one straight chain) (1)
- A food chain is only a branch of the entire web and it fails to show that most of the animals get eaten and eat more than one species. (1)
- In a food chain, there is a straight line from producers to each consumer. In a food web, each organism eats may be eaten by 2 or more organisms. (1)
An (implied) comparison is required.`,
  },
  {
    id: 2,
    text: "Outline one reason why the number of deaths caused by tropical storms varies.",
    marks: 2,
    markingScheme: `Marking Instructions:
Some storms have much greater wind speeds (1) so people may be killed by debris being blown around. (d) (1)
Some storms may cause severe flooding (1) so many people drown. (d) (1)
Some storms occur in areas of high population density (1) which means that more people are killed. (d) (1)
In some poorer countries there may be a lack of clean water (1), so many people are killed by disease. (d) (1)
Some tropical storms produce a storm surge (1), which moves quickly inland and results in 90% of cyclone deaths. (d)(1)
Some storms have severe secondary events such as landslides (1), which can result in many more injuries and deaths (d) (1)
Some poorer countries may not have the resources to invest in early warning systems/emergency response (1), so people are more at risk from tropical storm hazards (d) (1)
Some storms may not go over land/use up their energy over the sea (1) so they don't affect areas where people live (d) (1)
Some countries have greater wealth and ability to manage and/or mitigate (1)
Some storms are much more powerful (1)`,
  },
  {
    id: 3,
    text: "Using the figure below complete the following paragraph.",
    marks: 3,
    imageUrl: "/images/winds.png",
    blankText: "Air from the Equator rises and moves towards the poles, then cools down and sinks at approximately _____________________________ north and south of the Equator. The sinking air creates an area of _____________________________ pressure with very little rainfall. Some of the air moves back to the Equator as surface winds called _____________________________.",
    note: "NOTE: Please copy the text with the blanks into your answer space and replace the blanks with the correct words / your answers.",
    markingScheme: `Marking Instructions:

Correct answers:
1. 30° (Accept 30, 28, or 29)
2. high
3. trade winds (Accept trade or trades)

Award 1 mark for each correct answer.

Full answer:
Air from the Equator rises and moves towards the poles, then cools down and sinks at approximately 30° north and south of the Equator. The sinking air creates an area of high pressure with very little rainfall. Some of the air moves back to the Equator as surface winds called trade winds.

Provide feedback on the accuracy of each part of the answer.`,
  },
  {
    id: 4,
    text: "Tropical rainforest deforestation has major economic and environmental impacts. Do you agree? Use the figure below and your own understanding to explain your answer.",
    marks: 6,
    imageUrl: "/images/rainforest.png",
    markingScheme: `Level 3 (5–6 marks):
Award 5–6 marks for a thorough geographical understanding of both economic and environmental impacts of deforestation. The student should thoroughly apply knowledge in assessing the statement and include a reasoned argument that considers both types of impacts in depth.

Level 2 (3–4 marks):
Award 3–4 marks for some understanding of the economic and/or environmental impacts of deforestation. The student should show reasonable application of knowledge but may focus more on one impact type (either economic or environmental).

Level 1 (1–2 marks):
Award 1–2 marks for limited understanding of the impacts of deforestation. The response may be basic or underdeveloped and may lack sufficient explanation or depth.

Marking Instructions:

Check if the student has considered both economic and environmental impacts, using Figure 10 and their own understanding. Award higher marks if the student has assessed both impacts with depth and reasoning.

Economic impacts (from Figure 10 and own understanding):

Cattle ranching: Accounts for 80% of deforestation in Brazil, bringing revenue but also degrading pasture.
Palm oil plantations: Forests are cleared in Indonesia for oil palm plantations, providing jobs but harming the land.
Mining: Extraction of resources like bauxite, iron ore, gold, and diamonds in tropical forests generates income but leads to deforestation and environmental degradation.
Environmental impacts (from Figure 10 and own understanding):

Loss of biodiversity: Rainforests house over 50% of the world's species, and deforestation causes species loss.
Carbon dioxide emissions: From 2001 to 2019, deforestation released 105 gigatonnes of CO2 into the atmosphere, contributing to climate change.
Flooding and soil erosion: Forest removal increases the risk of these hazards.
Award Level 3 for a well-rounded response that discusses both economic and environmental impacts in detail, with a reasoned conclusion. Award Level 1 for minimal understanding and brief, underdeveloped answers.

Figure 10 Information:
- Tropical rainforests are home to more than 50% of the plant and animal species on Earth.
- Deforestation from 2001 to 2019 released 105 gigatonnes of carbon dioxide into the atmosphere.
- Cattle ranching accounts for 80% of current deforestation in Brazil.
- Indonesia's forests are being cleared to create oil palm plantations.
- Bauxite, iron ore, manganese, gold and diamonds are mined in tropical forests.
- Removal of forest increases the risk of flooding and soil erosion.`,
  },
];

export default function QuestionAnswerForm() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
  const [openAIResponses, setOpenAIResponses] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (id: number) => {
      try {
        const question = questions.find((q) => q.id === id);
        const answer = answers[id];

        if (!question || answer === undefined) {
          throw new Error('Question or answer is missing');
        }

        // Check if the answer is empty, only whitespace, or contains only special characters
        if (answer.trim() === '' || !/[a-zA-Z0-9]/.test(answer)) {
          setOpenAIResponses((prev) => ({
            ...prev,
            [id]: "Marks: 0\nFeedback: Your response is empty, contains only whitespace, or consists only of special characters. Please provide a valid answer to the question."
          }));
          return;
        }

        // Special handling for question 3 (fill-in-the-blank)
        if (question.id === 3) {
          const correctAnswers = ['30', '29', '28'];
          const thirdBlankAnswers = ['trade winds', 'trades', 'trade'];

          const userAnswers = answer.split(' ').map((word) => word.trim());
          const firstBlankAnswer = userAnswers[userAnswers.length - 3]; // Assuming the first blank is the third last word
          const secondBlankAnswer = userAnswers[userAnswers.length - 2]; // Assuming the second blank is the second last word
          const thirdBlankAnswer = userAnswers[userAnswers.length - 1]; // Assuming the third blank is the last word

          const firstBlankCorrect = correctAnswers.includes(firstBlankAnswer);
          const secondBlankCorrect = secondBlankAnswer.toLowerCase() === 'high'; // Check for the second blank
          const thirdBlankCorrect = thirdBlankAnswers.includes(thirdBlankAnswer.toLowerCase());

          const totalMarks = (firstBlankCorrect ? 1 : 0) + (secondBlankCorrect ? 1 : 0) + (thirdBlankCorrect ? 1 : 0);
          // Set the response based on totalMarks
          setOpenAIResponses((prev) => ({
            ...prev,
            [id]: `Marks: ${totalMarks}\nFeedback: ${totalMarks === 3 ? 'Excellent work!' : 'Please review your answers.'}`
          }));
        }

        let evaluationGuidelines = '';
        if (question.id === 1) {
          evaluationGuidelines = `Evaluation Guidelines for this 1-mark question:
1. Award 1 mark ONLY for a clear and complete comparison between a food chain and a food web.
2. The answer MUST explicitly state or clearly imply that a food web is more complex and interconnected than a food chain.
3. The response should include BOTH of the following elements:
   a) A description of a food chain as a single, linear sequence
   b) A description of a food web as multiple interconnected food chains or a network of feeding relationships
4. Do NOT award the mark for partial or incomplete comparisons.
5. Do NOT award the mark if the answer only describes one without comparing to the other.
6. Do NOT award any marks if the answer does not contain a clear and complete comparison between food chains and food webs.
7. Be strict in your evaluation. If there's any doubt about the completeness or clarity of the comparison, do not award the mark.`;
        } else if (question.id === 2) {
          evaluationGuidelines = `Evaluation Guidelines for this 2-mark question:
1. Award 1 mark for mentioning a valid reason why the number of deaths caused by tropical storms varies.
2. Award an additional 1 mark for developing that reason with an explanation or example.
3. The student can earn a maximum of 2 marks, even if they mention multiple reasons.
4. The response doesn't need to match the marking instructions word-for-word, but should convey the same idea.
5. Some reasons (like storm power or country wealth) can earn 1 mark without needing development.
6. Be flexible in interpretation, focusing on the core idea rather than exact wording.`;
        } else {
          evaluationGuidelines = `Evaluation Guidelines:
1. Be critical and thorough in your evaluation. Do not award high marks unless the response truly demonstrates comprehensive understanding and in-depth analysis.
2. For Level 3 (5-6 marks), the response must show:
   - Thorough understanding of BOTH economic AND environmental impacts
   - In-depth consideration of multiple aspects of each impact
   - Clear use of information from Figure 10 AND own knowledge
   - A well-reasoned argument or conclusion
3. For Level 2 (3-4 marks), the response:
   - May show good understanding of one impact and limited understanding of the other
   - OR may show some understanding of both, but lack depth in explanation
   - Should use some information from Figure 10, but may not fully integrate it
4. For Level 1 (1-2 marks), the response:
   - Shows only basic understanding of one or both impacts
   - Lacks detail and may contain inaccuracies
   - Makes limited or no use of Figure 10
5. Award 0 marks if the response is irrelevant, does not attempt to answer the question, or shows no understanding of the impacts.`;
        }

        const prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. Your task is to evaluate ONLY the exact student response provided, without adding any information or making assumptions about the student's knowledge. Be strict and critical in your evaluation.

Question:
${question.text}

Marks: ${question.marks} marks total

${question.markingScheme}

IMPORTANT: The student's response is enclosed between triple asterisks (***) below. Do not consider any text outside these markers as part of the student's answer. Evaluate ONLY the text within the asterisks, exactly as it appears. If the response is incomplete, unclear, or does not fully address the question, award 0 marks.

Student Response: ***${answer}***

${evaluationGuidelines}

Provide your evaluation in the following format:
Marks: [number of marks awarded]
Feedback: [your explanation to the student, including what they did well and what they need to improve]

Be specific in your feedback, referencing the actual content of the student's response and explaining why it does or does not meet the criteria for each mark. Do not invent or assume any part of the student's answer that is not explicitly written in their response. Do not repeat the student's response in your feedback. Be critical and do not award marks unless the response fully meets the criteria.`;

        // Log the prompt to the console
        console.log('Prompt being sent to OpenAI:', prompt);

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
          const errorData = await response.json();
          throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        setOpenAIResponses((prev) => ({ ...prev, [id]: data.evaluation }));
      } catch (error: unknown) {
        console.error('Error submitting to OpenAI:', error);
        const errorMessage = (error as Error).message || 'An error occurred';
        setOpenAIResponses((prev) => ({
          ...prev,
          [id]: `An error occurred while evaluating your answer: ${errorMessage}`,
        }));
      }
    },
    [answers]
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Exam Questions from Paper 1 Living with the physical environment - June 2023
      </h1>
      
      {questions.map((question) => (
        <Card key={question.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{question.text}</span>
              <span className="text-sm font-normal">Marks: {question.marks}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.imageUrl && (
              <div className="relative w-full h-48 md:h-64 lg:h-80">
                <Image
                  src={question.imageUrl}
                  alt={`Image for ${question.text}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-md"
                />
              </div>
            )}
            {question.blankText && (
              <div className="mt-4">
                <p className="font-medium">{question.blankText}</p>
                {question.note && (
                  <p className="text-xs text-gray-600 mt-2 bg-gray-100 p-2 rounded">
                    <strong>NOTE:</strong> {question.note.slice(5)}
                  </p>
                )}
              </div>
            )}
            {!showAnswer[question.id] && (
              <Button
                onClick={() =>
                  setShowAnswer((prev) => ({ ...prev, [question.id]: true }))
                }
              >
                Answer
              </Button>
            )}
            {showAnswer[question.id] && (
              <>
                <Textarea
                  placeholder="Enter your answer here (up to 4000 characters)"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  maxLength={4000}
                  className="min-h-[150px]"
                />
                <Button
                  onClick={() => handleSubmit(question.id)}
                  disabled={!answers[question.id]}
                >
                  Submit
                </Button>
              </>
            )}
            {openAIResponses[question.id] && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                {openAIResponses[question.id].split('\n').map((line, index) => (
                  <p key={index}>
                    {line.startsWith('Marks:') || line.startsWith('Feedback:') ? (
                      <>
                        <strong>{line.split(':')[0]}:</strong>{line.split(':')[1]}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}