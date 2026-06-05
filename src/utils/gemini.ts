import { GoogleGenerativeAI } from "@google/generative-ai";
const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getExamQuestions(content: string, count: number) {
  const model = genAi.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(
    `다음 학습 내용을 기반으로 객관식 문제를 생성해줘.
조건
- JSON 배열만 parse 해서 반환 
- 문제 수: ${count}개
- 객관식 4지선다
- 정답 포함
- 해설 포함

형식:

[
  {
    "question": "React에서 상태를 관리하는 Hook은?",
    "options": [
      "useState",
      "useRef",
      "useMemo",
      "useEffect"
    ],
    "answer": 0,
    "explanation": "useState는 컴포넌트 상태를 관리한다."
  }
]

학습 내용:
${content}`,
  );
  const text = result.response.text();
  return JSON.parse(text);
}
