import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const LessonPage = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();

  // Update page title based on practice ID
  useEffect(() => {
    const practiceTitles = {
      'tellmeabout': 'Tell Me About'
    };
    const title = practiceTitles[practiceId] || 'Lesson';
    document.title = `${title} - Practizio`;
  }, [practiceId]);

  const handleStartPractice = () => {
    // Navigate to practice session with autostart parameter
    navigate(`/practice-session?autostart=true&practiceId=${practiceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-practizio-beige to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-practizio-navy hover:text-practizio-coral transition">
            Practizio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="inline-block mb-4">
            <span className="bg-practizio-coral bg-opacity-10 text-practizio-coral px-4 py-2 rounded-full text-sm font-semibold">
              Communication Skills
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-practizio-navy mb-4">
            {practiceId === 'tellmeabout' ? 'Transform Questions into Conversations' : 'Practice Lesson'}
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to turn closed questions into open-ended "Tell me about..." statements
          </p>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-practizio-navy mb-4">
              Why "Tell Me About" Works Better
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When meeting someone new, direct questions can feel too personal or intrusive. 
              A question that feels normal to you might feel too personal to them, and sometimes 
              an open-ended question still gets a short answer.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When that happens, switch to <strong>"Tell me about..."</strong> so they can share 
              their experience at a pace that feels comfortable.
            </p>
          </section>

          {/* Examples Section */}
          <section>
            <h2 className="text-2xl font-bold text-practizio-navy mb-4">
              Examples
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Instead Column */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Instead of asking:
                  </p>
                  <p className="text-base text-gray-700 font-medium">
                    Are you married?
                  </p>
                </div>

                {/* Try This Column */}
                <div className="bg-practizio-coral bg-opacity-10 rounded-xl p-4 border-2 border-practizio-coral border-opacity-30">
                  <p className="text-xs font-semibold text-practizio-coral uppercase tracking-wide mb-2">
                    Try this:
                  </p>
                  <p className="text-base text-practizio-navy font-semibold">
                    Tell me about your family.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Instead of asking:
                  </p>
                  <p className="text-base text-gray-700 font-medium">
                    What do you do for a living?
                  </p>
                </div>

                <div className="bg-practizio-coral bg-opacity-10 rounded-xl p-4 border-2 border-practizio-coral border-opacity-30">
                  <p className="text-xs font-semibold text-practizio-coral uppercase tracking-wide mb-2">
                    Try this:
                  </p>
                  <p className="text-base text-practizio-navy font-semibold">
                    Tell me about your work.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Instead of asking:
                  </p>
                  <p className="text-base text-gray-700 font-medium">
                    Do you have kids?
                  </p>
                </div>

                <div className="bg-practizio-coral bg-opacity-10 rounded-xl p-4 border-2 border-practizio-coral border-opacity-30">
                  <p className="text-xs font-semibold text-practizio-coral uppercase tracking-wide mb-2">
                    Try this:
                  </p>
                  <p className="text-base text-practizio-navy font-semibold">
                    Tell me about your family.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-bold text-practizio-navy mb-4">
              How It Works
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-practizio-coral rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Identify the Topic</h3>
                  <p className="text-gray-600 text-sm">
                    Start with a closed question you want to ask (e.g., "Do you cook?")
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-practizio-coral rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transform with "Tell Me About"</h3>
                  <p className="text-gray-600 text-sm">
                    Convert it to "Tell me about [topic]" to give them space to share
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-practizio-coral rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Experience Maps</h3>
                  <p className="text-gray-600 text-sm">
                    Think about the steps or stages of that experience to guide the conversation
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Important Note */}
          <section className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-800 text-sm">
              💡 <strong>Remember:</strong> This method is only for practicing how to use "tell me about" 
              when you are unsure whether a direct question is safe to ask. Use it to give people space 
              to choose what they want to share, not as a replacement for normal questions.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleStartPractice}
            className="bg-practizio-coral text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-practizio-orange transition-all transform hover:scale-105 shadow-xl"
          >
            Start Practicing
          </button>
          <p className="mt-4 text-gray-600">
            You'll practice transforming questions into "Tell me about..." statements
          </p>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
