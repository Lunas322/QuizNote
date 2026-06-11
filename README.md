# QuizNote

AI가 생성한 문제를 풀고, 결과를 분석할 수 있는 퀴즈 학습 서비스입니다.

## 📌 프로젝트 소개

QuizNote는 사용자가 원하는 주제를 입력하면 Gemini AI가 문제를 생성하고, 생성된 문제를 시험 형식으로 풀어 결과를 저장 및 분석할 수 있는 서비스입니다.

사용자는 자신의 학습 결과를 확인하고, 마이페이지에서 시험 통계를 조회할 수 있습니다.

---

## 🛠 기술 스택

### Frontend

- React
- TypeScript
- React Router
- Zustand
- Tailwind CSS

### Backend / DB

- Firebase Authentication
- Firestore Database

### AI

- Gemini API

---

## ✨ 주요 기능

### 🔐 회원가입 / 로그인

- Firebase Authentication 기반 인증
- 로그인 상태 유지
- 인증 페이지 접근 제어(AuthGuard)

### 📝 문제 생성

- Gemini API를 활용한 문제 생성
- 문제 수 선택 가능
- 사용자 입력 기반 문제 생성

### 🎯 시험 응시

- 객관식 문제 풀이
- 답안 선택
- 진행 상태 관리

### 📊 시험 결과

- 점수 계산
- 정답 / 오답 분석
- 결과 저장

### 📚 결과 이력 조회

- 이전 시험 결과 목록 확인
- 상세 결과 조회

### 👤 마이페이지

- 사용자 정보 조회
- 평균 점수 확인
- 총 응시 문제 수 확인
- 생성한 시험 목록 확인

---

## 📂 프로젝트 구조

```bash
src
├── components
├── hooks
├── pages
├── store
├── types
├── utils
├── firebase
└── router
```
