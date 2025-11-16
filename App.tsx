
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MyTrips from './pages/MyTrips';
import TripDetail from './pages/TripDetail';
import Community from './pages/Community';
import Login from './pages/Login';
import TravelChecklist from './pages/TravelChecklist';
import Support from './pages/Support';
import UsefulInfo from './pages/UsefulInfo';
import UsefulInfoDetail from './pages/UsefulInfoDetail';
import ItineraryReview from './pages/ItineraryReview';
import MyPage from './pages/MyPage';
import CommunityPostDetail from './pages/CommunityPostDetail';
import ItineraryReviewDetail from './pages/ItineraryReviewDetail';
import PlanChallengeAbout from './pages/PlanChallengeAbout';
import PlanChallengeOngoing from './pages/PlanChallengeOngoing';
import PlanChallengeEvaluating from './pages/PlanChallengeEvaluating';
import PlanChallengeEnded from './pages/PlanChallengeEnded';
import PlanChallengeSubmit from './pages/PlanChallengeSubmit';
import PlanChallengeEvaluatingDetail from './pages/PlanChallengeEvaluatingDetail';
import PlanChallengeResult from './pages/PlanChallengeResult';
import PlanChallengeEndedDetail from './pages/PlanChallengeEndedDetail';
import Withdrawal from './pages/Withdrawal';
import Main from './pages/Main';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login />} 
      />
      
      <Route path="/app" element={<Layout />}>
        {/* Public routes */}
        <Route path="main" element={<Main />} />
        <Route path="community" element={<Community />} />
        <Route path="community/:postId" element={<CommunityPostDetail />} />
        <Route path="itinerary-review" element={<ItineraryReview />} />
        <Route path="itinerary-review/:postId" element={<ItineraryReviewDetail />} />
        <Route path="travel-checklist" element={<TravelChecklist />} />
        <Route path="plan-challenge" element={<Navigate to="ongoing" replace />} />
        <Route path="plan-challenge/about" element={<PlanChallengeAbout />} />
        <Route path="plan-challenge/ongoing" element={<PlanChallengeOngoing />} />
        <Route path="plan-challenge/evaluating" element={<PlanChallengeEvaluating />} />
        <Route path="plan-challenge/evaluating/:planId" element={<PlanChallengeEvaluatingDetail />} />
        <Route path="plan-challenge/ended" element={<PlanChallengeEnded />} />
        <Route path="plan-challenge/ended/:challengeId" element={<PlanChallengeResult />} />
        <Route path="plan-challenge/ended/:challengeId/plan/:planId" element={<PlanChallengeEndedDetail />} />
        <Route path="useful-info" element={<UsefulInfo />} />
        <Route path="useful-info/:postId" element={<UsefulInfoDetail />} />
        <Route path="support" element={<Support />} />
        <Route index element={<Navigate to="main" replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="trip/:tripId" element={<TripDetail />} />
          <Route path="plan-challenge/submit" element={<PlanChallengeSubmit />} />
          <Route path="my-page" element={<MyPage />} />
          <Route path="withdrawal" element={<Withdrawal />} />
        </Route>
      </Route>
      
      <Route 
        path="/" 
        element={<Navigate to="/app/main" replace />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;