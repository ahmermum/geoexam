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
1. 30° (Accept 30, 29, or 28)
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
  {
    id: 5,
    text: "Explain the formation of the physical features of the coastline shown in the figure below:",
    marks: 6,
    imageUrl: "/images/coast.png",
    markingScheme: `Marking Instructions:

Check the answer for the following elements:

1. Explanation of the formation of headlands and bays due to differential erosion (softer rock eroding faster than harder rock) (softer rock eroding faster than harder rock) (1 mark)
2. Reference to erosional processes involved in the formation of headlands and bays, such as hydraulic action, abrasion, or attrition (1 mark)
3. Explanation of the formation of a wave-cut notch and wave-cut platform through the collapse of cliffs (1 mark)
4. Reference to wave-cut notches forming due to wave action at the base of cliffs (1 mark)
5. Explanation of the role of deposition in forming beaches in bays, linking this to constructive waves (1 mark)
6. Overall coherence, with appropriate geographical terminology and processes clearly explained (1 mark)

Award Marks:

Award 1 mark for each element present in the student's response.
Marks should be awarded strictly according to these instructions.

Important Notes:

- Do not deduct marks for issues not explicitly mentioned in these instructions.
- Explanation must include reference to both erosional and depositional processes to access full marks.
- Reference to specific landforms, such as headlands, bays, and wave-cut platforms, is required.
- Do not accept vague or overly generalized responses.

Final Scoring:
Total marks: 0 to 6 marks based on the criteria above.`,
  },
];

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
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within these tags as student response to the question. If there is nothing entered there or only spaces, then it should be considered that the student did not provide a response. Under no circumstances should any other text in the prompt be treated as the student's answer.
Question: What is the difference between a food chain and a food web? [1 mark]
Marking Instructions:
Award 1 mark for any of the following responses or similar ideas that imply a comparison:

A food web has a number of connected food chains, (whereas a food chain consists of only one straight chain)
A food chain is only a branch of the entire web and it fails to show that most of the animals get eaten and eat more than one species.
In a food chain, there is a straight line from producers to each consumer. In a food web, each organism eats may be eaten by 2 or more organisms.

Important Notes:

An (implied) comparison is required for the mark to be awarded
The response must clearly distinguish between a food chain and a food web
The answer should demonstrate an understanding that a food web is more complex and interconnected than a food chain
Do not deduct marks for any reason not explicitly mentioned in these instructions
Award the full mark if the student provides any one of the accepted responses or a similar valid comparison

<studentResponse>
${answer}
</studentResponse>
Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]
Very Important: Please provide a final mark based on the mark scheme above and an explanation to the student telling them why they were given these marks. Your explanation should reference specific aspects of their response and how it aligns with the marking instructions. Ensure that you have correctly determined whether to award the mark or not. Do not deduct marks for any reason not explicitly stated in the marking instructions.`;
        } else if (question.id === 2) {  // For Question 2
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within these tags as student response to the question. If there is nothing entered there or only spaces, then it should be considered that the student did not provide a response. Under no circumstances should any other text in the prompt be treated as the student's answer.

Question: Outline one reason why the number of deaths caused by tropical storms varies. [2 marks]

Marking Instructions:
- Award 1 mark for stating a valid reason
- Award 1 additional mark for providing a relevant development or explanation of that reason
- Valid reasons with developments include:
  • Some storms have much greater wind speeds (1) so people may be killed by debris being blown around. (1)
  • Some storms may cause severe flooding (1) so many people drown. (1)
  • Some storms occur in areas of high population density (1) which means that more people are killed. (1)
  • In some poorer countries there may be a lack of clean water (1), so many people are killed by disease. (1)
  • Some tropical storms produce a storm surge (1), which moves quickly inland and results in 90% of cyclone deaths. (1)
  • Some storms have severe secondary events such as landslides (1), which can result in many more injuries and deaths (1)
  • Some poorer countries may not have the resources to invest in early warning systems/emergency response (1), so people are more at risk from tropical storm hazards (1)
  • Some storms may not go over land/use up their energy over the sea (1) so they don't affect areas where people live (1)
- The following points are worth 1 mark each:
  • Some countries have greater wealth and ability to manage and/or mitigate (1)
  • Some storms are much more powerful (1)

Important Notes:
- Award marks strictly according to these instructions
- Do not deduct marks for reasons not explicitly mentioned in these instructions
- The student must provide both a reason and its development to receive full marks, except for the last two points which are worth 1 mark each

<studentResponse>
${answer}
</studentResponse>

Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]

Very Important: Please provide a final mark based on the mark scheme above and an explanation to the student telling them why they were given these marks. Your explanation should reference specific aspects of their response and how it aligns with the marking instructions. Ensure that you have correctly tallied the total marks awarded. Do not deduct marks for any reason not explicitly stated in the marking instructions.`;
        } else if (question.id === 3) {  // For Question 3 (fill-in-the-blanks)
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within these tags as student response to the question. If there is nothing entered there or only spaces, then it should be considered that the student did not provide a response. Under no circumstances should any other text in the prompt be treated as the student's answer.
Question: Fill in the blanks in the following paragraph [3 marks]:
Air from the Equator rises and moves towards the poles, then cools down and sinks at approximately _____________________________ north and south of the Equator. The sinking air creates an area of _____________________________ pressure with very little rainfall. Some of the air moves back to the Equator as surface winds called _____________________________.
Marking Instructions:

Award 1 mark for each correctly filled blank
For the first blank:
• Accept: 30°, 29°, 28°, 30 degree, 30 degrees, 29 degree, 29 degrees, 28 degree, 28 degrees, 30, 29, or 28
For the second blank:
• Accept only: "high" or "High"
For the third blank:
• Accept: trade winds, Trade winds, trades, or trade

Important Notes:

The student should have copied the entire paragraph and replaced the blanks with their answers
Evaluate the whole text to ensure valid responses are in the correct places
Do not award marks for correct answers in the wrong blank
Do not deduct marks for any reason not explicitly mentioned in these instructions
Blank spaces or incorrect answers receive 0 marks for that blank

<studentResponse>
${answer}
</studentResponse>
Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]
Very Important: Please provide a final mark based on the mark scheme above and an explanation to the student telling them why they were given these marks. Your explanation should reference specific aspects of their response and how it aligns with the marking instructions. Ensure that you have correctly tallied the total marks awarded. Do not deduct marks for any reason not explicitly stated in the marking instructions. Your explanation should clearly state which blanks were filled correctly or incorrectly, and what the correct answers are for any incorrect responses.`;
        } else if (question.id === 4) {
          // New prompt for Question 4
          prompt = `You are an expert and diligent exam marking officer marking a student's response to an exam question. You are required to mark a student response to the question below. The student response is contained in the section below starting with <studentResponse> and ending with </studentResponse>. Please only treat the text contained within these tags as student response to the question. If there is nothing entered there or only spaces, then it should be considered that the student did not provide a response. Under no circumstances should any other text in the prompt be treated as the student's answer.
Question: Tropical rainforest deforestation has major economic and environmental impacts. Do you agree? Use the figure below and your own understanding to explain your answer. [6 marks]
Figure: Tropical rainforests are home to more than 50% of the plant and animal species on Earth. Deforestation from 2001 to 2019 released 105 gigatonnes of carbon dioxide into the atmosphere. Cattle ranching accounts for 80% of current deforestation in Brazil. Indonesia's forests are being cleared to create oil palm plantations. Bauxite, iron ore, manganese, gold and diamonds are mined in tropical forests. Removal of forest increases the risk of flooding and soil erosion.
Marking Instructions:
First, determine which level the response falls into based on the following criteria:
Level 3 (Detailed) - 5-6 marks:

Shows thorough geographical understanding of the economic and environmental impacts of deforestation.
Demonstrates thorough application of knowledge and understanding in assessing the view that tropical forest deforestation has major economic and environmental impacts.
Developed response with accurate use of geographical terms.
Reasoned examination of the extent of economic and environmental impacts caused by deforestation.
Some (direct or inferred) application of understanding to the given figure.

Level 2 (Clear) - 3-4 marks:

Shows some geographical understanding of the economic and/or environmental impacts of deforestation.
Demonstrates reasonable application of knowledge and understanding in assessing the view that tropical forest deforestation has major economic and/or environmental impacts.
Linked or elaborated statements and some accurate use of geographical terms.
May outline some economic and/or environmental impacts of deforestation.
May start to assess the severity of impacts.
Likely to be some (direct or inferred) application of understanding to the given figure.

Level 1 (Basic) - 1-2 marks:

Shows limited geographical understanding of the economic and/or environmental impacts of deforestation.
Demonstrates limited application of knowledge and understanding in assessing the view that tropical forest deforestation has major economic and/or environmental impacts.
Simple statements, with limited use of subject vocabulary.
Might be limited to generic statements.
May be limited to a single economic and/or environmental impact of deforestation.
Answer likely to be reliant on the given figure.

0 marks:

No relevant content

Important Notes:

After determining the level, decide on the specific mark within that level based on the quality of the response.
No credit for simply copying from the given figure without comment.
Consider the indicative content provided in the mark scheme, including various economic and environmental impacts of deforestation.
Look for distinction between economic and environmental impacts, and classification into local and global impacts.
Credit examples of economic and environmental impacts.
Consider any assessment of the significance of these impacts.
Remember that this question is aimed at 12-13 year old students. Adjust your expectations accordingly.
Be cautious about overestimating the quality of very brief or simple responses.
For Level 1 responses, even mentioning one environmental and one economic impact, however briefly, can be sufficient for 2 marks if there's a hint of understanding.
To achieve Level 2, responses should show clearer understanding and provide more detail or examples.
Level 3 responses from 12-13 year olds are not expected to be highly sophisticated, but should show good understanding and use of examples.

<studentResponse>
${answer}
</studentResponse>
Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]
Very Important:

Please provide a final mark based on the mark scheme above.
Give an explanation to the student telling them why they were given these marks.
Your explanation should:
a. Clearly state which level the response falls into and why.
b. Explain why the specific mark within that level was chosen.
c. Reference specific aspects of their response and how it aligns with the marking instructions.
d. Highlight strengths of the answer and areas for improvement.
e. Provide examples of what could have been included to achieve a higher mark, if applicable.
Ensure that you have correctly determined the level and marks according to the criteria provided.
Do not deduct marks for any reason not explicitly stated in the marking instructions.
Be particularly careful not to overestimate the quality of brief or simple responses.
Remember that this is a response from a 12-13 year old student and adjust your expectations and language accordingly.`;
        } else if (question.id === 5) {
          // New prompt for Question 5
          prompt = `You are an expert and diligent exam marking officer grading a student's response to a geography exam question. You are required to mark the student response below. The student response is contained within the <studentResponse> tags. Only treat the text within these tags as the student's answer. If there is nothing entered there or only spaces, then consider that the student did not provide a response.

Question: Explain the formation of the physical features of the coastline shown in the figure below. [6 marks]

Figure description: The figure has two parts. The top image is an aerial photograph of part of the Dorset coastline, showing a curved bay with headlands extending into the sea on either side. The bottom image consists of two sketch maps labeled "Before" and "After," showing the changes in the coastline's shape. In the "Before" diagram, the coastline is straighter, with softer rock between two areas of harder rock. In the "After" diagram, the softer rock has been eroded away by wave action, creating a more indented coastline. The erosion process has also formed a wave-cut platform along the coast and narrowed the beach. The key explains that harder rock is more resistant to erosion, while softer rock erodes faster, resulting in the headlands and bays seen in the "After" diagram.

Marking Instructions:
First, determine which level the response falls into based on the following criteria:

Level 3 (Detailed) - 5–6 marks:
- Shows thorough geographical understanding of processes and landforms associated with a changing coastline.
- Demonstrates thorough application of knowledge and understanding in analysing the landforms shown in the figure.
- Developed responses with supporting detail of the processes involved and the sequence of changes as the coastline evolves.
- Appropriate terminology used.
- The formation of at least two landforms should be explained to access Level 3.

Level 2 (Clear) - 3–4 marks:
- Shows some geographical understanding of processes and landforms associated with a changing coastline.
- Demonstrates reasonable application of knowledge and understanding in analysing the landforms shown in the figure.
- Likely to contain linked statements showing some understanding of the processes involved and some of the changes that occur as the coastline evolves.
- Some geographical terminology used, but processes may not be named.

Level 1 (Basic) - 1–2 marks:
- Shows limited geographical understanding of processes and landforms associated with a changing coastline.
- May include limited application of knowledge and understanding in analysing one or more landforms shown in the figure.
- Simple ideas or random statements with limited or partial sequence and little reference to the processes involved.
- May consider one landform or focus on sequence only.
- Geographical terminology will be limited.

Level 0 - No relevant content.

Important Notes:
- After determining the level, decide on the specific mark within that level based on the quality of the response.
- Consider the indicative content provided in the mark scheme, including various coastal processes and landforms.
- Look for explanation of processes of erosion as well as the sequence of development of landforms.
- Credit understanding of specific processes relevant to the formation of landforms shown (weathering, erosion, hydraulic action, corrasion/abrasion, attrition, differential erosion, wave refraction, longshore drift).
- Analysis of the figure should emphasize increased unevenness in the shape of the coast from a rounded coastline to jagged headlands and wave-cut platforms with bays in between.

After determining the level and mark, compare your assessment to the example responses provided:

Example Responses:
Student A Response:
Firstly the coast line's headlands and bays are formed as it is a discordant coastline with alternating bands of harder and softer rock. Softer rocks are eroded first (faster) creating (calm areas) bays and headlands are made of harder rock (land just left jutting out in the sea, vulnerable to further erosion). The wave-cut platforms are formed at the headlands as the base of the headland are exposed to erosion (processes such as hydraulic action and abrasion) causes a wave-cut notch. The material above the wave cut notch weakens and collapses causing the headland to retreat. The collapsed material is then transported away eventually the cycles starts again as a new wave cut notch forms. Eventually a wafte cut platforms is formed from the after many cycles. A beach is formed in the bay areas. These areas are calm and sheltered, so the swash is stronger than backwash, this leads to a deposition of sediments building up a beach as the waves have low energy.
Examiner's Commentary for Student A:
This answer provides a thorough understanding of the processes and landforms associated with a changing coastline. Processes are named and integrated into the explanation of formation. A full sequence of development is explained for headlands and bays and wave cut platforms. (AO2). The response analyses evidence from the photograph and maps and shows an awareness of a range of the landforms (AO3). Appropriate terminology used throughout.
Level 3, 6 marks
Student B Response:
Headlands and a bay have formed due to the fact that the rock in the middle is made of softer rock, like clay, which the rock of the headlands is made of harder rock. The softer rock erodes faster while the harder rock does not, meand the soft rock erodes to form a bay, leaving the headlands. A beach has formed where the constructive waves have lost energy and deposited sediments. Wave cut platforms form where a patch of rock erodes creating a notch at the bottom of the rock while more rock remains above it. This rock looses its support, and eventually collapses, leaving a wave cut platform, this process repeats, and the wave cut platform grows.
Examiner's Commentary for Student B:
This response recognises a number of different landforms evident in the photograph and diagram, namely headlands and bays, beaches and wave cut platforms. The sequence of formation is understood, and the answer shows some clarity. There is some explanation of the relevant processes involved, but this is not developed (AO2). The answer demonstrates reasonable application of understanding in analysing the landforms depicted in Figure 15 (AO3).
Level 2, 4 marks
Student C Response:
The sea will use abrasion, solution and attrition to break large volumes of rock into sand. The waves will bash off the cliffs and make the hard rock erode away whilst this is happening the same had been happening to the softer rock at a faster pace. And all the debris from the cliffs will be deposited at the bay to form a beach. Leaving two headlands of harder rock and one bay of softer rock
Examiner's Commentary for Student C:
This response consists of basic ideas and random statements, with limited or partial sequence and little reference to the processes involved, apart from a list of processes at the beginning (AO2). There is some understanding of how headlands and bays evolve, using implied evidence from the maps and photograph (AO3).
Level 1, 2 marks 

Adjust your marking if necessary based on these examples.

<studentResponse>
${answer}
</studentResponse> 

Final Mark: [LLM to fill in]
Explanation to Student: [LLM to fill in]

Very Important: 
1. First determine the level using the mark scheme instructions.
2. Then assign a mark from that level.
3. Check your assessment against the example responses and how the examiner has marked them. Adjust if required.
4. Provide a final mark based on the mark scheme above.
5. Give an explanation to the student telling them why they were given these marks. 
6. Your explanation should:
   a. Clearly state which level the response falls into and why.
   b. Explain why the specific mark within that level was chosen.
   c. Reference specific aspects of their response and how it aligns with the marking instructions.
   d. Highlight strengths of the answer and areas for improvement.
   e. Provide examples of what could have been included to achieve a higher mark, if applicable.
7. Ensure that you have correctly determined the level and marks according to the criteria provided. 
8. Do not deduct marks for any reason not explicitly stated in the marking instructions.
9. Remember that this is a response from a student and adjust your expectations and language accordingly.`;
        } else {
          // Existing prompt construction for other questions
          // ... (keep the existing code for other questions)
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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Exam Questions from Paper 1 Living with the physical environment - June 2023
      </h1>
      
      {questions.map((question) => (
        <div key={question.id} className="mb-4 p-4 border rounded shadow-sm">
          <h2 className="text-xl font-bold mb-2">
            {question.text} <span className="text-blue-600">({question.marks} marks)</span>
          </h2>
          {question.imageUrl && (
            <Image src={question.imageUrl} alt="Question Image" width={500} height={300} className="mb-2" />
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
  );
}