import React, { useState } from 'react';
import CollapsibleHint from './CollapsibleHint';

const PracticePage = () => {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Input mode state
  const [inputMode, setInputMode] = useState('type'); // 'type' or 'speak'
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = React.useRef(null);
  const [transcript, setTranscript] = useState('');

  /**
   * Auto-start question generation if coming from main page
   */
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart');
    
    if (autostart === 'true' && !currentQuestion && !loading) {
      handleStartPracticing();
    }
  }, []);

  /**
   * Initialize speech recognition on component mount
   */
  React.useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  /**
   * Start voice recording
   */
  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      setError(null);
      setTranscript('');
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      let finalText = '';
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += text + ' ';
          } else {
            interimTranscript += text;
          }
        }
        
        const fullTranscript = finalText + interimTranscript;
        setTranscript(fullTranscript);
        setStudentAnswer(fullTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'aborted') {
          // User manually stopped, not an error
          console.log('Recording stopped by user');
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
        setIsRecording(false);
        recognitionRef.current = null;
      };
      
      recognition.onend = () => {
        console.log('Recording ended');
        setIsRecording(false);
        recognitionRef.current = null;
      };
      
      recognition.onstart = () => {
        console.log('Recording started');
        setIsRecording(true);
      };
      
      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('Failed to start recording. Please try again.');
      setIsRecording(false);
    }
  };

  /**
   * Stop voice recording
   */
  const handleStopRecording = () => {
    console.log('Stop recording clicked', recognitionRef.current, isRecording);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
      } catch (err) {
        console.error('Error stopping recognition:', err);
        setIsRecording(false);
        recognitionRef.current = null;
      }
    } else {
      setIsRecording(false);
    }
  };

  /**
   * Toggle between Type and Speak modes
   */
  const handleModeToggle = (mode) => {
    if (isRecording) {
      handleStopRecording();
    }
    setInputMode(mode);
  };

  /**
   * Call backend API to generate a new practice question
   */
  const handleStartPracticing = async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setStudentAnswer('');
    setTranscript('');

    try {
      const response = await fetch('/api/practice/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate practice question');
      }

      const result = await response.json();
      
      if (result.success) {
        setCurrentQuestion(result.data);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error generating question:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submit student's answer for AI review
   */
  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim()) {
      setError('Please write your version of the question first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/practice/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentAnswer: studentAnswer,
          originalTopic: currentQuestion?.closedQuestion || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      const result = await response.json();
      
      if (result.success) {
        setFeedback(result.data);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error getting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset and start a new practice session
   */
  const handleNewQuestion = async () => {
    if (isRecording) {
      handleStopRecording();
    }
    
    // Clear current state and show loading
    setCurrentQuestion(null);
    setStudentAnswer('');
    setTranscript('');
    setFeedback(null);
    setError(null);
    setInputMode('type');
    
    // Automatically generate a new question
    await handleStartPracticing();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-practizio-beige to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-practizio-navy hover:text-practizio-coral transition">
            Practizio
          </a>
          <span className="text-sm bg-practizio-coral bg-opacity-10 text-practizio-coral px-4 py-2 rounded-full font-semibold">
            Practice Mode
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Initial State - No Question Yet */}
        {!currentQuestion && !loading && (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="inline-block bg-practizio-coral bg-opacity-10 rounded-full p-6 mb-6">
                <svg className="w-16 h-16 text-practizio-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-practizio-navy mb-4">
                Ready to Practice?
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Transform closed questions into engaging open-ended conversations. 
                Click the button below to get started!
              </p>
            </div>
            <button
              onClick={handleStartPracticing}
              type="button"
              className="bg-practizio-coral text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-practizio-orange transition-all transform hover:scale-105 shadow-lg"
            >
              Start Practicing
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !currentQuestion && (
          <div className="space-y-6 animate-fadeIn">
            {/* Loading Skeleton for Question */}
            <div className="p-12 text-center bg-white rounded-2xl shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-practizio-coral border-t-transparent"></div>
                <p className="text-xl font-semibold text-practizio-navy">Generating your practice question...</p>
                <p className="text-gray-500">This will just take a moment</p>
              </div>
            </div>
            
            {/* Loading Skeleton for Hint */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            
            {/* Loading Skeleton for Input Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-32 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  {error.includes('Microphone access denied') ? '🎤 Microphone Access Required' : 'Oops! Something went wrong'}
                </h3>
                <p className="text-red-700 mb-2">{error}</p>
                {error.includes('Microphone access denied') && (
                  <div className="mt-3 text-sm text-red-800 bg-red-100 rounded-lg p-3">
                    <p className="font-semibold mb-2">How to enable microphone:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click the 🔒 lock or 🎤 microphone icon in your browser's address bar</li>
                      <li>Find "Microphone" and change it to "Allow"</li>
                      <li>Refresh the page and try again</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Practice Question View */}
        {currentQuestion && (
          <div key={currentQuestion.closedQuestion} className="space-y-4">
            {/* Question Display */}
            <div className="p-6 text-center bg-white rounded-xl shadow-md animate-fadeInScale">
              <p className="text-2xl md:text-3xl text-practizio-orange font-bold leading-relaxed">
                {currentQuestion.closedQuestion}
              </p>
            </div>

            {/* Collapsible Hint */}
            <div className="animate-fadeInDelay1">
              <CollapsibleHint hint={currentQuestion.experienceMapHint} />
            </div>

            {/* Student Input Section */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-practizio-coral border-opacity-30 animate-fadeInDelay2">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-practizio-navy">
                    Now it's your turn! 🎯
                  </h3>
                  
                  {/* Mode Toggle */}
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => handleModeToggle('type')}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      inputMode === 'type'
                        ? 'bg-practizio-coral text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    ⌨️ Type
                  </button>
                  <button
                    onClick={() => handleModeToggle('speak')}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      inputMode === 'speak'
                        ? 'bg-practizio-coral text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🎤 Speak
                  </button>
                </div>
                </div>
                <p className="text-xs bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-2 rounded mb-2">
                  💡 <strong>Remember:</strong> This method is only for practicing how to use tell me about when you are unsure whether a direct question is safe to ask. Use it to give people space to choose what they want to share, not as a replacement for normal questions.
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {inputMode === 'type' 
                  ? 'Write your own "Tell me about..." conversation starters for this topic. Pick any step from the hint above!'
                  : 'Speak your "Tell me about..." conversation starters. Click the microphone to start recording.'}
              </p>
              
              {/* Type Mode */}
              {inputMode === 'type' && (
                <textarea
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Type here"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 text-base focus:border-practizio-coral focus:ring-2 focus:ring-practizio-coral focus:ring-opacity-20 outline-none transition mb-3 min-h-[80px]"
                  disabled={loading}
                />
              )}
              
              {/* Speak Mode */}
              {inputMode === 'speak' && (
                <div className="mb-4">
                  {/* Recording Button */}
                  {!isRecording && (
                    <div className="flex flex-col items-center justify-center py-4">
                      <button
                        onClick={handleStartRecording}
                        disabled={loading}
                        type="button"
                        className="bg-practizio-coral hover:bg-practizio-orange text-white rounded-full p-6 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Start recording"
                      >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <p className="text-gray-500 mt-2 text-xs">Click to start recording</p>
                    </div>
                  )}
                  
                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="flex flex-col items-center justify-center py-4 bg-red-50 rounded-xl border-2 border-red-200">
                      <div className="relative">
                        <button
                          onClick={handleStopRecording}
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-6 transition-all shadow-lg z-10 relative"
                          aria-label="Stop recording"
                        >
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="6" width="12" height="12" rx="2" />
                          </svg>
                        </button>
                        {/* Pulsing Ring Animation */}
                        <div className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping pointer-events-none"></div>
                      </div>
                      <p className="text-red-600 font-semibold mt-2 text-sm flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        Recording... Click the red button to finish
                      </p>
                      <button
                        onClick={() => {
                          if (recognitionRef.current) {
                            try {
                              recognitionRef.current.abort();
                            } catch (e) {
                              console.error('Error aborting:', e);
                            }
                            recognitionRef.current = null;
                          }
                          setIsRecording(false);
                        }}
                        type="button"
                        className="mt-2 text-xs text-red-700 underline hover:text-red-900"
                      >
                        Force stop if stuck
                      </button>
                    </div>
                  )}
                  
                  {/* Transcribed Text Display */}
                  {studentAnswer && (
                    <div className="mt-3">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Your transcribed text:</label>
                      <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-3 text-sm min-h-[80px]">
                        {studentAnswer || <span className="text-gray-400">Your speech will appear here...</span>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={loading || !studentAnswer.trim() || isRecording}
                  type="button"
                  className="flex-1 bg-practizio-coral text-white px-6 py-2.5 rounded-full text-base font-bold hover:bg-practizio-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Getting Feedback...' : 'Submit for Feedback'}
                </button>
                <button
                  onClick={handleNewQuestion}
                  disabled={isRecording}
                  type="button"
                  className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  New Question
                </button>
              </div>
            </div>

            {/* Feedback Section */}
            {feedback && (
              <div className="bg-gradient-to-br from-practizio-navy to-blue-900 rounded-2xl shadow-xl p-6 text-white space-y-4 animate-fadeInScale">
                <div className="flex items-start space-x-2">
                  <svg className="w-6 h-6 text-practizio-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      {feedback.formatReminder ? "Let's try again! 💡" : 
                       feedback.topicReminder ? "Almost there! 🎯" : 
                       "Great work! Here's your feedback"}
                    </h3>
                    <p className="text-blue-200 text-sm">
                      {feedback.formatReminder || feedback.topicReminder || feedback.feedback}
                    </p>
                  </div>
                </div>

                {/* Additional Examples */}
                {feedback.additionalExamples && feedback.additionalExamples.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-practizio-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      3 More Ways to Start This Conversation
                    </h4>
                    <div className="space-y-2">
                      {feedback.additionalExamples.map((example, index) => (
                        <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur">
                          <p className="text-sm">
                            <span className="text-practizio-orange font-bold mr-2">{index + 1}.</span>
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2 text-center">
                  <button
                    onClick={handleNewQuestion}
                    type="button"
                    className="bg-practizio-coral text-white px-6 py-2.5 rounded-full text-base font-bold hover:bg-practizio-orange transition-all transform hover:scale-105 shadow-lg"
                  >
                    Practice Another Question
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticePage;
