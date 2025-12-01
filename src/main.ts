import './style.css';

let score = 20;
let highscore = 0;
let secretNumber: number;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function syncText<T extends HTMLElement>(text: string, element: T | null) {
  if (!element) return;

  if (element instanceof HTMLInputElement) {
    element.value = text;
  } else {
    element.textContent = text;
  }
}

(() => {
  secretNumber = randomInt(1, 20);

  // When a Check button is clicked
  document
    .querySelector<HTMLButtonElement>('[data-check="true"]')
    ?.addEventListener('click', () => {
      const guessEl = document.querySelector<HTMLInputElement>('[data-guess="true"]');

      if (!guessEl) return;
      const guessNumber = Number(guessEl.value);

      // When there is no input
      if (!guessNumber || isNaN(guessNumber)) {
        syncText(
          '⛔ No number!',
          document.querySelector<HTMLParagraphElement>('[data-message="true"]')
        );

        // When a player wins
      } else if (guessNumber == secretNumber) {
        syncText(
          '🎉 Correct number!',
          document.querySelector<HTMLParagraphElement>('[data-message="true"]')
        );

        syncText(
          String(secretNumber),
          document.querySelector<HTMLDivElement>('[data-secret="true"]')
        );

        const bodyEl = document.querySelector<HTMLBodyElement>('body');
        if (!bodyEl) return;
        bodyEl.style.backgroundColor = '#60b347';

        // Update a highscore
        if (score > highscore) {
          highscore = score;
          syncText(
            String(highscore),
            document.querySelector<HTMLSpanElement>('[data-highscore="true"]')
          );
        }

        // When a guess is wrong
      } else if (guessNumber != secretNumber) {
        // When a player still guessing
        if (score > 1) {
          syncText(
            guessNumber > secretNumber ? '📈 Too high!' : '📉 Too low!',
            document.querySelector<HTMLParagraphElement>('[data-message="true"]')
          );
          score--;
          syncText(String(score), document.querySelector<HTMLSpanElement>('[data-score="true"]'));

          // When a player loses
        } else {
          syncText(
            '💥 You lost the game!',
            document.querySelector<HTMLParagraphElement>('[data-message="true"]')
          );
          syncText(String(0), document.querySelector<HTMLSpanElement>('[data-score="true"]'));
        }
      }
    });

  // When a again button is clicked
  document
    .querySelector<HTMLButtonElement>('[data-again="true"]')
    ?.addEventListener('click', () => {
      // Reset states
      score = 20;
      secretNumber = randomInt(1, 20);

      syncText(
        'Start guessing...',
        document.querySelector<HTMLParagraphElement>('[data-message="true"]')
      );
      syncText(String(score), document.querySelector<HTMLSpanElement>('[data-score="true"]'));
      syncText('?', document.querySelector<HTMLDivElement>('[data-secret="true"]'));
      syncText('', document.querySelector<HTMLInputElement>('[data-guess="true"]'));

      const bodyEl = document.querySelector<HTMLBodyElement>('body');
      if (!bodyEl) return;
      bodyEl.style.backgroundColor = '#222';
    });
})();
