   // src/app/page.tsx
   import React from 'react';
   import { redirect } from 'next/navigation';

   const HomePage = () => {
     // Redirect to the question-answer-form page
     redirect('/question-answer-form');
     return null; // This will not be rendered due to the redirect
   };

   export default HomePage;