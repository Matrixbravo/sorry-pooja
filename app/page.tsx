
"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// PERSONALIZE THESE DETAILS
const herName = "Pooja";
const yourName = "Uday";

const photoUrl = `${basePath}/my-photo.jpg`;
const slapSoundUrl = `${basePath}/slap.mp3`;

const slapMessages = [
  "Ouch! Okay, I understand. 🥲",
  "Message received, my love! ❤️",
  "I promise I'll listen better. 🥺",
  "That was a powerful one! 😵‍💫",
  "Okay, okay! I deserve the cartoon slap! 😂",
  "Can I have a hug now? 🥹",
  "I love you, even after that slap! 💗",
  "I'm working on being better, I promise. ❤️",
  "My cheeks have officially learned their lesson! 😭",
  "Baby, please have mercy! 🥹❤️",
];

type Answer = "forgiven" | "time" | null;

export default function Home() {
  // STATE
  const [slaps, setSlaps] = useState(0);
  const [slapping, setSlapping] = useState(false);
  const [photoMissing, setPhotoMissing] = useState(false);
  const [answer, setAnswer] = useState<Answer>(null);
  const [soundError, setSoundError] = useState(false);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  // REFS - MUST BE INSIDE THE COMPONENT
  const slapTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const slapSoundRef = useRef<HTMLAudioElement>(null);

  // CLEANUP
  useEffect(() => {
    return () => {
      if (slapTimer.current) {
        clearTimeout(slapTimer.current);
      }
    };
  }, []);

  // PLAY SLAP SOUND
  function playSlapSound() {
    const audio = slapSoundRef.current;

    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.8;

      // Play directly from the click event for mobile support.
      void audio
        .play()
        .then(() => {
          setSoundError(false);
        })
        .catch((error) => {
          console.warn("Slap sound playback failed:", error);
          setSoundError(true);
        });
    } catch (error) {
      console.warn("Unable to play slap sound:", error);
      setSoundError(true);
    }
  }

  // HANDLE SLAP
  function handleSlap() {
    // Prevent overlapping slap animations.
    if (slapping) return;

    setSlapping(true);

    // Increase slap counter.
    setSlaps((previous) => previous + 1);

    // Play the sound.
    playSlapSound();

    // Reset 3D tilt during the slap.
    setTilt({
      x: 0,
      y: 0,
    });

    // Clear previous animation timer.
    if (slapTimer.current) {
      clearTimeout(slapTimer.current);
    }

    // Existing CSS slap animation lasts about 800ms.
    slapTimer.current = setTimeout(() => {
      setSlapping(false);
    }, 850);
  }

  // 3D PHOTO TILT ON MOUSE MOVEMENT
  function handlePointerMove(
    event: PointerEvent<HTMLButtonElement>
  ) {
    if (event.pointerType !== "mouse" || slapping) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const relativeX =
      (event.clientX - rect.left) / rect.width - 0.5;

    const relativeY =
      (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: -relativeY * 14,
      y: relativeX * 14,
    });
  }

  function resetTilt() {
    setTilt({
      x: 0,
      y: 0,
    });
  }

  // FUNNY MESSAGES AFTER EVERY SLAP
  const currentSlapMessage =
    slaps === 0
      ? "Go on, give me a little cartoon slap! 👋"
      : slapMessages[(slaps - 1) % slapMessages.length];

  return (
    <main className="main-page">
      {/* SLAP SOUND */}
      <audio
        ref={slapSoundRef}
        src={slapSoundUrl}
        preload="auto"
      />

      {/* BACKGROUND DECORATION */}
      <div
        className="background-decoration"
        aria-hidden="true"
      >
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-logo">
          <span className="logo-heart">♥</span>
          <span>A little note for you</span>
        </div>

        <span className="header-right">
          From {yourName}, with love
        </span>
      </header>

      <div className="content">
        {/* LEFT SIDE: APOLOGY LETTER */}
        <section className="apology-section">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            A LETTER FROM MY HEART
          </div>

          <h1 className="main-heading">
            I&apos;m sorry,
            <br />
            <span>{herName}.</span>
          </h1>

          <p className="heading-description">
            For losing my patience. For getting frustrated.
            And most importantly, for making the same mistake
            again when I should have known better.
          </p>

          {/* LOVE LETTER */}
          <div className="letter-card">
            <span className="quote-mark">“</span>

            <p>
              My love, I know I&apos;ve apologized before,
              and I know hearing the same apology again
              doesn&apos;t make things better.
            </p>

            <p>
              Sometimes, I let my anger and frustration
              get the better of me. And in those moments,
              I forget how much my words and reactions
              can hurt the person I love the most.
            </p>

            <p>
              You deserve patience, kindness, understanding,
              and someone who makes you feel safe and heard.
              I&apos;m truly sorry for the moments when
              I failed to give you that.
            </p>

            <p>
              I don&apos;t want to keep making promises
              and repeating the same mistakes. I want to
              learn to pause when I&apos;m upset, listen
              instead of reacting, and communicate with
              you more gently.
            </p>

            <p>
              I know I need to show you that through my
              actions, not just my words. And I understand
              if rebuilding that trust takes time.
            </p>

            <p className="letter-highlight">
              Because loving you should never mean
              hurting you with my anger.
            </p>

            <div className="letter-signature">
              <span>With all my love,</span>
              <strong>{yourName} ♥</strong>
            </div>
          </div>

          {/* PROMISE */}
          <div className="promise-box">
            <span className="promise-icon">♡</span>

            <p>
              <strong>My promise to you</strong>
              <br />
              Less reacting. More listening.
              More patience. More understanding.
              And real effort, every single day.
            </p>
          </div>

          {/* FORGIVENESS SECTION */}
          <div className="forgiveness-section">
            <h2>
              Can you forgive me, my love? ❤️
            </h2>

            <p>
              I understand that forgiveness takes time.
              Whatever you feel, I want to hear it.
            </p>

            <div className="answer-buttons">
              <button
                type="button"
                className="forgive-button"
                onClick={() => setAnswer("forgiven")}
              >
                I forgive you ❤️
              </button>

              <button
                type="button"
                className="time-button"
                onClick={() => setAnswer("time")}
              >
                I need some time
              </button>
            </div>

            {/* FORGIVEN RESPONSE */}
            {answer === "forgiven" && (
              <div
                className="answer-message"
                role="status"
              >
                <span className="answer-emoji">
                  💗
                </span>

                <h3>Thank you, my love.</h3>

                <p>
                  Your forgiveness means so much to me.
                  I won&apos;t take it for granted.
                  I love you, {herName}. ❤️
                </p>
              </div>
            )}

            {/* NEED TIME RESPONSE */}
            {answer === "time" && (
              <div
                className="answer-message"
                role="status"
              >
                <span className="answer-emoji">
                  🌷
                </span>

                <h3>
                  Take all the time you need.
                </h3>

                <p>
                  I understand, sweetheart. I won&apos;t
                  rush you or pressure you. Your feelings
                  matter to me, and I&apos;ll respect
                  the space you need.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT SIDE: INTERACTIVE PHOTO */}
        <section className="interactive-section">
          <div className="photo-introduction">
            <span className="photo-kicker">
              A LITTLE SOMETHING FOR YOU
            </span>

            <h2>
              Okay, I might
              <br />
              deserve this one...
              <span> 🥲</span>
            </h2>

            <p>
              Since I made you angry, you get a few
              free cartoon slaps. Go ahead, tap my face!
            </p>
          </div>

          {/* PHOTO AREA */}
          <div className="photo-stage">
            <div className="photo-perspective">
              <button
                type="button"
                aria-label="Give Uday a playful cartoon slap"
                className={`portrait-card ${
                  slapping ? "slapped" : ""
                }`}
                onClick={handleSlap}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetTilt}
                style={{
                  transform: slapping
                    ? undefined
                    : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="portrait-window">
                  {/* YOUR PHOTO */}
                  {photoMissing ? (
                    <div className="photo-placeholder">
                      <span>📷</span>

                      <strong>
                        Add your photo
                      </strong>

                      <small>
                        public/my-photo.jpg
                      </small>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={`${yourName} smiling`}
                      draggable={false}
                      onError={() =>
                        setPhotoMissing(true)
                      }
                    />
                  )}

                  {/* PHOTO LIGHTING */}
                  <div className="photo-shine" />

                  {/* ANIMATED HAND */}
                  <span
                    className="slap-hand"
                    aria-hidden="true"
                  >
                    🖐️
                  </span>

                  {/* IMPACT EFFECT */}
                  <span
                    className="cheek-impact"
                    aria-hidden="true"
                  >
                    💥
                  </span>

                  {/* STAR EFFECT */}
                  <span
                    className="impact-star"
                    aria-hidden="true"
                  >
                    ✨
                  </span>
                </div>

                {/* PHOTO CAPTION */}
                <div className="portrait-footer">
                  <span>
                    your slightly guilty future husband ♡
                  </span>

                  <span className="tap-indicator">
                    TAP ME 👆
                  </span>
                </div>
              </button>
            </div>

            {/* REACTION MESSAGE */}
            <div
              className="reaction-bubble"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentSlapMessage}
            </div>

            {/* SLAP COUNTER */}
            <div className="slap-counter">
              <span>
                Cartoon slaps received
              </span>

              <strong>{slaps}</strong>
            </div>

            {/* SOUND ERROR MESSAGE */}
            {soundError && (
              <p
                role="status"
                style={{
                  fontSize: "12px",
                  color: "#b7476c",
                  marginTop: "12px",
                }}
              >
                🔇 Slap sound unavailable.
                Check public/slap.mp3.
              </p>
            )}
          </div>

          {/* CLOSING NOTE */}
          <div className="side-note">
            <span>♥</span>

            <p>
              All jokes aside, I know changing my
              behaviour matters more than this little
              website. I&apos;m going to work on it.
            </p>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        Made with love, a little humour,
        and a sincere apology.

        <span>
          Forever yours, {yourName} ♡
        </span>
      </footer>
    </main>
  );
}
