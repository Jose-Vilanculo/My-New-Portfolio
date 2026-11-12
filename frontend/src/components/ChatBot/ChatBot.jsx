import { useState, useRef, useEffect } from 'react';
import classes from './ChatBot.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const WELCOME_MESSAGE =
    "Hi there! I'm Emly, Jose's AI assistant. Ask me about his projects, tech stack, or experience, and I'll point you to the right place.";

const iconProps = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

const SUGGESTED_QUESTIONS = [
    {
        label: 'What projects has Jose built?',
        icon: (
            <svg {...iconProps}>
                <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
            </svg>
        ),
    },
    {
        label: "What's Jose's tech stack?",
        icon: (
            <svg {...iconProps}>
                <path d="M12 3l9 5-9 5-9-5 9-5z" />
                <path d="M3 13l9 5 9-5" />
            </svg>
        ),
    },
    {
        label: "Tell me about Jose's experience",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
            </svg>
        ),
    },
    {
        label: 'How can I contact Jose?',
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
            </svg>
        ),
    },
];

export const ChatBot = () => {
    const [opened, setOpened] = useState(false);
    // Conversation only; the welcome message is rendered separately
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [clicked, setClicked] = useState(false);

    const nextId = useRef(1);
    const wasOpened = useRef(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const launcherRef = useRef(null);

    const hasStarted = messages.length > 0;

    // Keep the newest message in view
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping, opened]);

    // Focus the input on open, and hand focus back to the launcher on close
    useEffect(() => {
        if (opened) {
            inputRef.current?.focus();
        } else if (wasOpened.current) {
            launcherRef.current?.focus();
        }
        wasOpened.current = opened;
    }, [opened]);

    const sendMessage = async (rawText) => {
        const text = rawText.trim();
        if (!text || isTyping) return;

        // Capture the previous conversation before adding the new message.
        const history = messages.slice(-10).map((message) => ({
            role: message.role === 'bot' ? 'assistant' : 'user',
            text: message.text,
        }));

        setMessages((prev) => [
            ...prev,
            { id: nextId.current++, role: 'user', text },
        ]);
        setInput('');
        setIsTyping(true);

        // Set VITE_CHATBOT_API_URL in your frontend .env file.
        // Local default: http://127.0.0.1:8000/api
        const apiBaseUrl = (
            import.meta.env.VITE_CHATBOT_API_URL ||
            'http://127.0.0.1:8000/api'
        ).replace(/\/$/, '');

        try {
            const response = await fetch(`${apiBaseUrl}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    history,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || 'The chat request failed.');
            }

            if (typeof data.reply !== 'string' || !data.reply.trim()) {
                throw new Error('The assistant returned an empty response.');
            }

            setMessages((prev) => [
                ...prev,
                { id: nextId.current++, role: 'bot', text: data.reply.trim() },
            ]);
        } catch (error) {
            console.error('Emly chat request failed:', error);
            setMessages((prev) => [
                ...prev,
                {
                    id: nextId.current++,
                    role: 'bot',
                    text: "Sorry, I couldn't connect just now. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(input);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') setOpened(false);
    };


    /* useEffect to lock scrolling while chatBot is open */
    useEffect(() => {
    const html = document.documentElement;

        if (opened) {
            html.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            html.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            html.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [opened]);

    return (
        <>
            {/* Chat window: sits exactly where the launcher was */}
            <section
                className={`${classes.chatWindow} ${opened ? classes.chatWindowOpen : ''}`}
                aria-label="Chat with AI assistant"
                aria-hidden={!opened}
                onKeyDown={handleKeyDown}
            >
                {/* Liquid background */}
                <div className={classes.blobs} aria-hidden="true">
                    <span className={`${classes.blob} ${classes.blobA}`} />
                    <span className={`${classes.blob} ${classes.blobB}`} />
                    <span className={`${classes.blob} ${classes.blobC}`} />
                </div>

                <header className={classes.header}>
                    <img
                        src="/ai-chatbot/Robot-Mascot-Smiling-Transparent.png"
                        alt=""
                        className={classes.headerAvatar}
                    />
                    <div className={classes.headerText}>
                        <h2 className={classes.headerTitle}>Emly AI Assistant</h2>
                        <p className={classes.headerStatus}>
                            <span className={classes.statusDot} />
                            Online
                        </p>
                    </div>
                    <button
                        type="button"
                        className={classes.closeButton}
                        onClick={() => setOpened(false)}
                        aria-label="Close chat"
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </header>

                <div
                    className={classes.body}
                    ref={scrollRef}
                    role="log"
                    aria-live="polite"
                >
                    {!hasStarted ? (
                        /* Welcome state */
                        <div className={classes.welcome}>
                            <div className={classes.hero}>
                                <div className={classes.heroIcon}>
                                    <img
                                        src="/ai-chatbot/icons-ai.png"
                                        alt=""
                                        className={classes.heroIconImg}
                                    />
                                </div>
                                <h3 className={classes.heroTitle}>
                                    Need help? What would you <strong>like to know</strong>?
                                </h3>
                                <p className={classes.heroText}>{WELCOME_MESSAGE}</p>
                            </div>

                            <div className={classes.tiles}>
                                {SUGGESTED_QUESTIONS.map(({ label, icon }, index) => (
                                    <button
                                        key={label}
                                        type="button"
                                        className={`${classes.tile} ${index === 3 ? classes.tileAccent : ''}`}
                                        onClick={() => sendMessage(label)}
                                    >
                                        <span className={classes.tileIcon}>{icon}</span>
                                        <span className={classes.tileLabel}>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Conversation */
                        <div className={classes.thread}>
                            <div className={`${classes.message} ${classes.messageBot}`}>
                                {WELCOME_MESSAGE}
                            </div>

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${classes.message} ${
                                        message.role === 'user' ? classes.messageUser : classes.messageBot
                                    }`}
                                >
                                    {message.role === 'bot' ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {message.text}
                                        </ReactMarkdown>
                                    ) : (
                                        <p>{message.text}</p>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div
                                    className={`${classes.message} ${classes.messageBot} ${classes.typing}`}
                                    aria-label="Assistant is typing"
                                >
                                    <span className={classes.dot} />
                                    <span className={classes.dot} />
                                    <span className={classes.dot} />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <form className={classes.inputRow} onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        className={classes.input}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Ask me anything..."
                        aria-label="Message"
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        className={classes.sendButton}
                        disabled={!input.trim() || isTyping}
                        aria-label="Send message"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>
                </form>
            </section>

            {/* Launcher: removed while the chat is open */}
            {!opened && (
                <button
                    ref={launcherRef}
                    type="button"
                    className={classes.robotContainer}
                    onClick={() => {
                        setOpened(true);
                        setClicked(true)
                    }}
                    aria-label="Open AI assistant"
                    aria-expanded={false}
                >
                    {/* Onlt greet once */}
                    {!clicked && (
                        <span className={classes.speechBubble}>
                            Hi, there
                            <img
                                src="/ai-chatbot/icons-ai.png"
                                alt=""
                                className={classes.aiStars}
                            />
                        </span>
                    )}
                    

                    <img
                        src="/ai-chatbot/Robot-Mascot-Waiving-Transparent.png"
                        alt=""
                        className={classes.robotImage}
                    />
                </button>
            )}
        </>
    );
};