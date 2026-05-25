const AGENTS = [
  // ─── LLMs & Chat ───
  { name: 'GPT-4 Turbo', category: 'LLMs & Chat', description: 'OpenAI\'s most capable model — text, code, reasoning, tool use, 128K context.', pricing: 'Paid', platform: 'Web, API, App', best_for: 'General-purpose reasoning, coding, writing' },
  { name: 'Claude 3.5 Sonnet', category: 'LLMs & Chat', description: 'Anthropic\'s balanced model — nuanced对话, long documents, safety-first reasoning.', pricing: 'Freemium', platform: 'Web, API, App', best_for: 'Long-form analysis, safe reasoning, document processing' },
  { name: 'Gemini Ultra', category: 'LLMs & Chat', description: 'Google DeepMind\'s multimodal model — natively handles text, images, audio, video.', pricing: 'Freemium', platform: 'Web, API, App', best_for: 'Multimodal understanding, Google ecosystem integration' },
  { name: 'Llama 3.1 405B', category: 'LLMs & Chat', description: 'Meta\'s open-weight flagship — state-of-the-art open-source LLM with 128K context.', pricing: 'Free (Open)', platform: 'API, Self-host', best_for: 'Self-hosted deployment, fine-tuning, research' },
  { name: 'Mistral Large 2', category: 'LLMs & Chat', description: 'Mistral AI\'s flagship — fast, efficient, multilingual with strong code performance.', pricing: 'Freemium', platform: 'API, Cloud', best_for: 'Multilingual tasks, efficient inference, code' },
  { name: 'DeepSeek V3', category: 'LLMs & Chat', description: 'DeepSeek\'s Mixture-of-Experts model — high performance at fraction of compute cost.', pricing: 'Free (Open)', platform: 'API, Self-host', best_for: 'Cost-effective reasoning, math, code' },
  { name: 'Grok 3', category: 'LLMs & Chat', description: 'xAI\'s real-time model — web-native personality with up-to-date X/Twitter data.', pricing: 'Paid', platform: 'Web, App', best_for: 'Real-time information, witty conversation' },
  { name: 'Command R+', category: 'LLMs & Chat', description: 'Cohere\'s retrieval-augmented model — built for enterprise RAG and tool use.', pricing: 'Freemium', platform: 'API, Cloud', best_for: 'Enterprise RAG, tool calling, grounding' },
  { name: 'Qwen 2.5 72B', category: 'LLMs & Chat', description: 'Alibaba Cloud\'s open model — strong in Chinese, math, coding, and long context.', pricing: 'Free (Open)', platform: 'API, Self-host', best_for: 'Chinese language tasks, math, open-source' },

  // ─── Image Generation ───
  { name: 'DALL-E 3', category: 'Image Generation', description: 'OpenAI\'s text-to-image — highly accurate prompt adherence, photorealistic results.', pricing: 'Paid', platform: 'Web, API', best_for: 'Accurate prompt following, photorealistic images' },
  { name: 'Midjourney', category: 'Image Generation', description: 'Leading creative AI — artistic, stylized generations with strong composition.', pricing: 'Paid', platform: 'Discord, Web', best_for: 'Artistic, stylized, creative concept art' },
  { name: 'Stable Diffusion 3.5', category: 'Image Generation', description: 'Stability AI\'s open model — customizable, local-first image generation.', pricing: 'Free (Open)', platform: 'Self-host, API, Web', best_for: 'Local generation, customization, fine-tuning' },
  { name: 'Flux Pro', category: 'Image Generation', description: 'Black Forest Labs\' cutting-edge model — fastest high-quality text-to-image.', pricing: 'Freemium', platform: 'API, Web', best_for: 'Fast high-quality generation, typography' },
  { name: 'Imagen 3', category: 'Image Generation', description: 'Google DeepMind\'s photorealistic generator — exceptional text rendering.', pricing: 'Paid', platform: 'API, Web', best_for: 'Photorealism, text rendering, Google Cloud' },
  { name: 'Firefly Image 3', category: 'Image Generation', description: 'Adobe\'s commercially-safe generator — integrated with Creative Cloud.', pricing: 'Paid', platform: 'Web, Creative Cloud', best_for: 'Commercial use, Photoshop integration' },
  { name: 'Ideogram', category: 'Image Generation', description: 'Specialized in accurate text rendering within generated images and logos.', pricing: 'Freemium', platform: 'Web, API', best_for: 'Text in images, logos, typography' },
  { name: 'Leonardo AI', category: 'Image Generation', description: 'Game-asset focused generator with fine-grained style control.', pricing: 'Freemium', platform: 'Web, API', best_for: 'Game assets, character design, style consistency' },

  // ─── Video Generation ───
  { name: 'Sora', category: 'Video Generation', description: 'OpenAI\'s video model — photorealistic 60s clips from text, with consistent physics.', pricing: 'Paid', platform: 'Web', best_for: 'Photorealistic text-to-video, physics simulation' },
  { name: 'Runway Gen-3 Alpha', category: 'Video Generation', description: 'Professional video generation — text-to-video, video-to-video, inpainting.', pricing: 'Paid', platform: 'Web, API', best_for: 'Professional editing, video-to-video, inpainting' },
  { name: 'Pika 2.0', category: 'Video Generation', description: 'Fast, accessible video generation with precise motion control and lip sync.', pricing: 'Freemium', platform: 'Web, Discord', best_for: 'Quick prototypes, lip sync, motion brushes' },
  { name: 'Veo 2', category: 'Video Generation', description: 'Google DeepMind\'s high-quality video — 4K resolution, cinematic quality.', pricing: 'Paid', platform: 'API, Web', best_for: 'Cinematic quality, 4K resolution, long clips' },
  { name: 'Kling AI', category: 'Video Generation', description: 'Kuaishou\'s video model — strong in physics and character consistency.', pricing: 'Freemium', platform: 'Web', best_for: 'Character consistency, physics accuracy' },
  { name: 'Luma Dream Machine', category: 'Video Generation', description: 'Fast text-to-video and image-to-video with motion control.', pricing: 'Freemium', platform: 'Web, API', best_for: 'Fast iteration, image-to-video, motion control' },
  { name: 'Haiper', category: 'Video Generation', description: 'Academic-origin video generation with strong temporal coherence.', pricing: 'Freemium', platform: 'Web', best_for: 'Temporal coherence, research-grade quality' },
  { name: 'Kaiber', category: 'Video Generation', description: 'Creative video generation for music videos and abstract animations.', pricing: 'Paid', platform: 'Web', best_for: 'Music videos, abstract animation, creative effects' },

  // ─── Music & Audio ───
  { name: 'Suno', category: 'Music & Audio', description: 'Full song generation — lyrics, vocals, instruments from text prompts.', pricing: 'Freemium', platform: 'Web, Discord', best_for: 'Full songs with vocals, lyrics generation' },
  { name: 'Udio', category: 'Music & Audio', description: 'High-fidelity music generation — professional-grade audio quality.', pricing: 'Freemium', platform: 'Web', best_for: 'High-fidelity music, professional audio quality' },
  { name: 'ElevenLabs', category: 'Music & Audio', description: 'Voice cloning and TTS — ultra-realistic speech with emotion control.', pricing: 'Freemium', platform: 'Web, API, App', best_for: 'Voice cloning, realistic TTS, audiobooks' },
  { name: 'MusicLM', category: 'Music & Audio', description: 'Google\'s music generator — generates 24kHz from text descriptions.', pricing: 'Free', platform: 'Web (AI Test Kitchen)', best_for: 'Experimental music generation, research' },
  { name: 'Jukebox', category: 'Music & Audio', description: 'OpenAI\'s music model — genre-specific music with singing in various styles.', pricing: 'Free (Open)', platform: 'Self-host', best_for: 'Genre-specific music, open-source research' },
  { name: 'AIVA', category: 'Music & Audio', description: 'AI composer for classical and cinematic music — copyright assignable.', pricing: 'Paid', platform: 'Web, App', best_for: 'Classical composition, cinematic scores, commercial use' },
  { name: 'Soundraw', category: 'Music & Audio', description: 'Royalty-free AI music generator with fine-grained editing controls.', pricing: 'Paid', platform: 'Web', best_for: 'Royalty-free music, content creator tracks' },
  { name: 'Murf AI', category: 'Music & Audio', description: 'AI voiceover studio — 120+ voices, multi-language, fine-grained control.', pricing: 'Freemium', platform: 'Web', best_for: 'Voiceovers, narration, e-learning audio' },

  // ─── Code & Development ───
  { name: 'GitHub Copilot', category: 'Code & Development', description: 'AI pair programmer — inline code completion, chat, agent mode in IDE.', pricing: 'Paid', platform: 'VS Code, JetBrains, Neovim, API', best_for: 'Everyday code completion, IDE integration' },
  { name: 'Cursor', category: 'Code & Development', description: 'AI-first code editor — multi-file edits, codebase understanding, agent mode.', pricing: 'Freemium', platform: 'Desktop App', best_for: 'Multi-file refactoring, codebase-aware coding' },
  { name: 'Claude Code', category: 'Code & Development', description: 'Anthropic\'s terminal agent — reads/writes files, runs commands, manages git.', pricing: 'Paid', platform: 'Terminal (CLI)', best_for: 'Terminal-based development, agentic workflows' },
  { name: 'Devin', category: 'Code & Development', description: 'Autonomous SWE agent — plans, codes, tests, deploys entire features.', pricing: 'Paid', platform: 'Web', best_for: 'Autonomous feature development, end-to-end tasks' },
  { name: 'Codeium Windsurf', category: 'Code & Development', description: 'AI-native IDE with deep codebase indexing, cascade commands, and agent flows.', pricing: 'Freemium', platform: 'Desktop App', best_for: 'Deep codebase understanding, cascade workflows' },
  { name: 'Replit Agent', category: 'Code & Development', description: 'Browser-based full-stack agent — describes apps into existence.', pricing: 'Freemium', platform: 'Web', best_for: 'Rapid prototyping, full-stack from prompt' },
  { name: 'v0 by Vercel', category: 'Code & Development', description: 'Generates production-ready React components and pages from text prompts.', pricing: 'Freemium', platform: 'Web', best_for: 'React/Next.js UI generation, shadcn components' },
  { name: 'Lovable', category: 'Code & Development', description: 'Full-stack app builder — generates complete web apps from natural language.', pricing: 'Freemium', platform: 'Web', best_for: 'Full-stack web app generation, Supabase integration' },
  { name: 'Bolt.new', category: 'Code & Development', description: 'In-browser code sandbox with AI — build and deploy apps instantly.', pricing: 'Freemium', platform: 'Web', best_for: 'Instant prototyping, in-browser development' },

  // ─── Video & Image Editing ───
  { name: 'Adobe Firefly', category: 'Video & Image Editing', description: 'Generative AI in Creative Cloud — fill, extend, retouch, and create assets.', pricing: 'Paid', platform: 'Creative Cloud', best_for: 'Photoshop/Illustrator integration, commercial use' },
  { name: 'CapCut', category: 'Video & Image Editing', description: 'ByteDance\'s editor — auto-captions, AI effects, motion tracking, text-to-video.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Auto-captions, TikTok/Reels, quick edits' },
  { name: 'Topaz Photo AI', category: 'Video & Image Editing', description: 'AI image enhancement — denoise, upscale, sharpen with professional results.', pricing: 'Paid', platform: 'Desktop App', best_for: 'Photo upscaling, denoising, restoration' },
  { name: 'Descript', category: 'Video & Image Editing', description: 'AI-powered video editor — edit video by editing text, voice cloning, studio sound.', pricing: 'Freemium', platform: 'Web, Desktop', best_for: 'Text-based video editing, podcast production' },
  { name: 'Runway', category: 'Video & Image Editing', description: 'Professional AI video suite — green screen, inpainting, super-resolution, tracking.', pricing: 'Paid', platform: 'Web, API', best_for: 'Professional video effects, AI compositing' },
  { name: 'Cutout Pro', category: 'Video & Image Editing', description: 'AI visual design platform — background removal, enhancement, and generation.', pricing: 'Freemium', platform: 'Web, API', best_for: 'Background removal, photo enhancement API' },
  { name: 'Klap', category: 'Video & Image Editing', description: 'AI video repurposing — clips long videos into shorts with captions.', pricing: 'Freemium', platform: 'Web', best_for: 'Long→short video clipping, auto-captions' },
  { name: 'Filmora AI', category: 'Video & Image Editing', description: 'Wondershare\'s AI editor — text-to-video, audio ducking, auto-beat sync.', pricing: 'Paid', platform: 'Desktop App', best_for: 'Beginner video editing, auto-beat sync' },

  // ─── Research & Search ───
  { name: 'Perplexity Pro', category: 'Research & Search', description: 'AI search engine — real-time web research with cited sources and deep dives.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Real-time research, cited answers, web search' },
  { name: 'Consensus', category: 'Research & Search', description: 'Academic search — finds, summarizes research papers with evidence scores.', pricing: 'Freemium', platform: 'Web, Browser Ext', best_for: 'Academic research, paper summaries, evidence-based' },
  { name: 'Elicit', category: 'Research & Search', description: 'AI research assistant — automates literature review, extracts data from papers.', pricing: 'Freemium', platform: 'Web', best_for: 'Literature reviews, data extraction from PDFs' },
  { name: 'SciSpace', category: 'Research & Search', description: 'Chat with any PDF — explains figures, math, and tables from research papers.', pricing: 'Freemium', platform: 'Web, App', best_for: 'PDF Q&A, paper explanation, math/formula help' },
  { name: 'Google Gemini Deep Research', category: 'Research & Search', description: 'Multi-step research agent — explores hundreds of sources into comprehensive reports.', pricing: 'Paid', platform: 'Web', best_for: 'Deep research reports, multi-source analysis' },
  { name: 'NotebookLM', category: 'Research & Search', description: 'Google\'s personalized research AI — upload sources and generate podcasts, summaries.', pricing: 'Free', platform: 'Web', best_for: 'Source-based audio summaries, personalized research' },
  { name: 'ChatGPT Search', category: 'Research & Search', description: 'OpenAI\'s integrated web search — real-time info within chat interface.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Web search in chat, current events' },
  { name: 'You.com', category: 'Research & Search', description: 'AI search with app integrations — coding, writing, image generation in one place.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Multi-tool search, app integrations' },

  // ─── Productivity & Writing ───
  { name: 'Notion AI', category: 'Productivity & Writing', description: 'AI assistant in Notion — write, summarize, brainstorm, translate inside docs.', pricing: 'Paid', platform: 'Web, App', best_for: 'Note-taking, document writing, brainstorming' },
  { name: 'Grammarly', category: 'Productivity & Writing', description: 'AI writing assistant — tone, clarity, grammar, and style suggestions everywhere.', pricing: 'Freemium', platform: 'Web, Browser Ext, App', best_for: 'Grammar correction, tone adjustment, clarity' },
  { name: 'Otter.ai', category: 'Productivity & Writing', description: 'AI meeting assistant — records, transcribes, summarizes meetings in real-time.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Meeting transcription, action item extraction' },
  { name: 'Mem.ai', category: 'Productivity & Writing', description: 'AI knowledge management — automatically organizes notes with graph-based recall.', pricing: 'Freemium', platform: 'Web, App', best_for: 'Personal knowledge management, auto-organization' },
  { name: 'Jasper', category: 'Productivity & Writing', description: 'AI marketing copywriter — brand-voiced content for ads, blogs, social media.', pricing: 'Paid', platform: 'Web, App', best_for: 'Marketing copy, brand-aligned content' },
  { name: 'Motion', category: 'Productivity & Writing', description: 'AI project manager — auto-schedules tasks, sets priorities, manages calendars.', pricing: 'Paid', platform: 'Web, App', best_for: 'Auto-scheduling, task prioritization, calendar' },
  { name: 'Rewind', category: 'Productivity & Writing', description: 'AI memory capture — records screen/meetings, makes everything searchable.', pricing: 'Freemium', platform: 'Desktop App, Mobile', best_for: 'Screen recording search, meeting memory' },
  { name: 'Fireflies.ai', category: 'Productivity & Writing', description: 'AI meeting assistant — joins calls, transcribes, and integrates with CRM tools.', pricing: 'Freemium', platform: 'Web, App, Integrations', best_for: 'Sales call analysis, CRM integration, transcripts' },

  // ─── Speech & Voice ───
  { name: 'ElevenLabs', category: 'Speech & Voice', description: 'Industry-leading TTS — voice cloning, emotion control, 29+ languages.', pricing: 'Freemium', platform: 'Web, API, App', best_for: 'Voice cloning, ultra-realistic TTS' },
  { name: 'OpenAI TTS', category: 'Speech & Voice', description: 'OpenAI\'s text-to-speech — 6 natural voices, streaming, multiple formats.', pricing: 'Paid', platform: 'API', best_for: 'Integration with GPT, streaming TTS' },
  { name: 'Whisper', category: 'Speech & Voice', description: 'OpenAI\'s speech-to-text — highly accurate transcription in 100+ languages.', pricing: 'Free (Open)', platform: 'API, Self-host', best_for: 'Speech-to-text, multilingual transcription' },
  { name: 'Google Cloud TTS', category: 'Speech & Voice', description: 'WaveNet-based TTS — 380+ voices, 50+ languages, custom voice creation.', pricing: 'Paid', platform: 'API, Cloud', best_for: 'Multi-language TTS, custom voice creation' },
  { name: 'Play.ht', category: 'Speech & Voice', description: 'AI voice generator — voice cloning, multi-voice dialogues, SSML support.', pricing: 'Paid', platform: 'Web, API', best_for: 'Multi-voice dialogues, podcast voices' },
  { name: 'Respeecher', category: 'Speech & Voice', description: 'Professional voice cloning — used in film/TV for ethical voice replication.', pricing: 'Paid', platform: 'Web', best_for: 'Professional voice cloning, film/TV production' },
  { name: 'Descript Overdub', category: 'Speech & Voice', description: 'Voice synthesis for corrections — fix audio mistakes by typing.', pricing: 'Paid', platform: 'Desktop App', best_for: 'Audio correction, podcast editing' },
  { name: 'Rime AI', category: 'Speech & Voice', description: 'Emotion-aware TTS — natural pauses, inflections, expressive speech.', pricing: 'Freemium', platform: 'API, Web', best_for: 'Expressive TTS, emotional speech, storytellers' },

  // ─── 3D & Design ───
  { name: 'Meshy', category: '3D & Design', description: 'Text-to-3D and image-to-3D — generates game-ready 3D models in minutes.', pricing: 'Freemium', platform: 'Web, API', best_for: 'Text-to-3D, game-ready models, prototyping' },
  { name: 'Luma AI', category: '3D & Design', description: 'NeRF-based 3D capture — photorealistic 3D scenes from phone videos.', pricing: 'Freemium', platform: 'App, Web', best_for: 'NeRF 3D capture, photorealistic scenes' },
  { name: 'Kaedim', category: '3D & Design', description: 'AI 3D model generation — professional topology, texture-ready outputs.', pricing: 'Paid', platform: 'Web, API', best_for: 'Professional 3D assets, game development' },
  { name: 'Polycam', category: '3D & Design', description: 'LiDAR + Gaussian splatting — capture real-world spaces into 3D models.', pricing: 'Freemium', platform: 'App, Web', best_for: '3D scanning, architectural capture' },
  { name: 'Vizcom', category: '3D & Design', description: 'AI industrial design — sketches to product renders, materials, lighting.', pricing: 'Paid', platform: 'Web', best_for: 'Industrial design, product visualization' },
  { name: 'Galileo AI', category: '3D & Design', description: 'UI/UX design agent — generates editable Figma designs from text descriptions.', pricing: 'Paid', platform: 'Web, Figma Plugin', best_for: 'UI design generation, Figma prototyping' },
  { name: 'Dora AI', category: '3D & Design', description: 'AI website design — builds 3D animated sites from text, no-code editor.', pricing: 'Freemium', platform: 'Web', best_for: '3D websites, animated no-code sites' },
  { name: 'Uizard', category: '3D & Design', description: 'AI UI design — screenshots to editable wireframes, auto-design system.', pricing: 'Freemium', platform: 'Web', best_for: 'Wireframe generation, screenshot to design' },

  // ─── Data & Analytics ───
  { name: 'Julius AI', category: 'Data & Analytics', description: 'AI data analyst — chat with datasets, generate charts, insights, and reports.', pricing: 'Freemium', platform: 'Web', best_for: 'Dataset chat, chart generation, data insights' },
  { name: 'Tableau Pulse', category: 'Data & Analytics', description: 'AI-powered insights — automated data summaries, natural language exploration.', pricing: 'Paid', platform: 'Web, Desktop', best_for: 'Automated insights, enterprise BI' },
  { name: 'DataRobot', category: 'Data & Analytics', description: 'Automated ML platform — builds, deploys, and monitors ML models at scale.', pricing: 'Paid', platform: 'Web, API', best_for: 'AutoML, enterprise MLOps, model deployment' },
  { name: 'Hex', category: 'Data & Analytics', description: 'AI data workspace — notebooks with AI assist, collaborative analytics, and apps.', pricing: 'Freemium', platform: 'Web', best_for: 'Collaborative notebooks, AI-assisted analysis' },
  { name: 'Obviously AI', category: 'Data & Analytics', description: 'No-code ML — build predictive models from CSV in minutes, no coding required.', pricing: 'Paid', platform: 'Web', best_for: 'No-code ML, CSV-based predictions' },
  { name: 'Akio', category: 'Data & Analytics', description: 'Customer sentiment analytics — transcribes and analyzes calls, chat, and reviews.', pricing: 'Paid', platform: 'Web, API', best_for: 'Sentiment analysis, call analytics, customer voice' },
  { name: 'Monitaur', category: 'Data & Analytics', description: 'AI governance — monitors model performance, bias, and compliance.', pricing: 'Paid', platform: 'Web', best_for: 'AI governance, bias detection, compliance' },
  { name: 'RapidMiner', category: 'Data & Analytics', description: 'AI/ML platform — visual workflow designer, automated model building, deployment.', pricing: 'Freemium', platform: 'Web, Desktop, API', best_for: 'Visual ML workflows, model building' },
]
