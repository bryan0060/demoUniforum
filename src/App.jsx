import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import ExplorePage from '@/pages/ExplorePage';
import ForumPage from '@/pages/ForumPage';
import CreatePostPage from '@/pages/CreatePostPage';
import ProfilePage from '@/pages/ProfilePage'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore" 
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/forums" 
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-post" 
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          {/* Add more routes here as UniForum grows */}
          {/* Example:
          <Route path="/forum/:subjectId" element={<ProtectedRoute><SubjectForumPage /></ProtectedRoute>} />
          <Route path="/post/:postId" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
          */}
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;