import React from 'react';

const ConversationPage = () => {
  const conversationData = [
    {
      instead: "Are you married?",
      tryThis: "Tell me about your family."
    },
    {
      instead: "What do you do for a living?",
      tryThis: "Tell me about your business/work."
    },
    {
      instead: "Do you have kids?",
      tryThis: "Tell me about your family."
    },
    {
      instead: "What's your favorite hobby?",
      tryThis: "Tell me about your favorite hobby."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-practizio-navy">Practizio</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-practizio-navy transition">Browse</a>
            <button className="bg-practizio-coral text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition font-medium">
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-practizio-beige to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-3">
              <span className="bg-practizio-coral bg-opacity-10 text-practizio-coral px-4 py-2 rounded-full text-sm font-semibold">
                Communication Skills
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-practizio-navy mb-4 leading-tight">
              Turn Questions into<br />
              <span className="text-practizio-coral">Tell Me About Statement</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
              Build stronger conversations by inviting people to share real stories.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Introduction */}
          <div className="mb-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-practizio-navy mb-4">
              Why Tell Me About Feels Easier for New People
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              It is usually easier to ask open ended questions when you already know the person. With someone you just met, you need to read the situation. A question that feels normal to you might feel too personal to them, and sometimes an open ended question still gets a short answer. When that happens, switch to Tell me about so they can share their experience at a pace that feels comfortable.
            </p>
          </div>

          {/* Question Comparison Section */}
          <div className="mb-10">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-practizio-navy mb-3">
                Here are some examples
              </h3>
            </div>

            {/* Table Header - Hidden on mobile */}
            <div className="max-w-5xl mx-auto">
              <div className="hidden md:grid md:grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide text-center">
                    Instead of asking:
                  </h4>
                </div>
                <div className="bg-practizio-coral bg-opacity-10 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-practizio-coral uppercase tracking-wide text-center">
                    Try this:
                  </h4>
                </div>
              </div>

              {/* Question Pairs */}
              <div className="space-y-3">
                {conversationData.map((item, index) => (
                  <div 
                    key={index}
                    className="grid md:grid-cols-2 gap-3 items-stretch"
                  >
                    {/* Instead Column */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 md:hidden">
                        Instead of asking:
                      </p>
                      <p className="text-base text-gray-700 text-center font-medium">
                        {item.instead}
                      </p>
                    </div>

                    {/* Try This Column */}
                    <div className="bg-practizio-coral bg-opacity-10 rounded-xl p-4 border-2 border-practizio-coral border-opacity-30">
                      <p className="text-xs font-semibold text-practizio-coral uppercase tracking-wide mb-2 md:hidden">
                        Try this:
                      </p>
                      <p className="text-base text-practizio-navy text-center font-semibold">
                        {item.tryThis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-practizio-navy rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-practizio-coral opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-practizio-orange opacity-10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Practice?
                </h3>
              <a href="/practice?autostart=true">
                <button className="bg-practizio-coral text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-practizio-orange transition-all transform hover:scale-105 shadow-xl animate-gentle-pulse">
                  Start Practicing
                </button>
              </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-practizio-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Practizio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ConversationPage;

