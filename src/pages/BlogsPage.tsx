import React, { useState } from 'react';
import { blogsData, BlogPost } from '../data/blogsData';
import { PageTransition } from '../components/motion/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechBadge } from '../components/ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';
import { ArrowRight, Clock, Calendar, X, BookOpen } from 'lucide-react';

export const BlogsPage: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPost) {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  return (
    <PageTransition className="pt-32 pb-24 bg-[#07090e] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          indexTag="[ INSIGHTS // 2026 ]"
          badge="TECHNICAL ARTICLES & GUIDES"
          title="IT Infrastructure &"
          highlightText="Hardware Insights"
          description="Practical guides, hardware architectures, and engineering best practices from our field technicians."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((post) => (
            <StaggerItem key={post.id}>
              <div className="flex flex-col justify-between h-full p-8 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <TechBadge variant="blue" size="sm">
                      {post.category}
                    </TechBadge>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer transition-colors group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">LR Technical Desk</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-[#0d1322] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-slate-800 relative text-white">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute right-6 top-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <TechBadge variant="blue" size="sm">
                  {selectedPost.category}
                </TechBadge>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPost.date} &bull; {selectedPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {selectedPost.title}
              </h2>

              <p className="text-sm font-semibold text-slate-200 border-l-2 border-amber-400 pl-3 py-0.5">
                {selectedPost.summary}
              </p>

              <div className="space-y-4 pt-2 text-sm text-slate-300 leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null);
                    onNavigate('contact');
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-amber-500/20 transition-all active:scale-98"
                >
                  Consult an IT Architect
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
