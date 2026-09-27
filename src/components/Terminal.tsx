import { Fragment, useEffect, useRef, useState } from 'react';
import { terminalCommands, terminalPanel, type TerminalAction } from '../data/systemsLab';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface TerminalEntry {
  id: number;
  command: string;
  fullText: string;
  shownText: string;
}

const TYPE_MS = 18;
const MAX_ENTRIES = 3;

let entryId = 0;
const nextId = () => {
  entryId += 1;
  return entryId;
};

/** Handlers keyed by action kind — the command map picks, never an if/else chain. */
const actionHandlers: Record<
  TerminalAction['kind'],
  (entry: { command: string; action: TerminalAction }, api: {
    append: (command: string, text: string) => void;
    clear: () => void;
  }) => void
> = {
  print: ({ command, action }, api) =>
    api.append(command, action.kind === 'print' ? action.text : ''),
  clear: (_, api) => api.clear(),
};

export default function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [value, setValue] = useState('');
  const reduceMotion = usePrefersReducedMotion();
  const timerRef = useRef<number | null>(null);

  const stopTyping = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Complete any in-progress typing instantly.
  const finishTyping = () => {
    stopTyping();
    setEntries((current) =>
      current.map((entry) =>
        entry.shownText === entry.fullText ? entry : { ...entry, shownText: entry.fullText },
      ),
    );
  };

  useEffect(() => stopTyping, []);

  const appendEntry = (command: string, text: string) => {
    const fullText = text;
    const entry: TerminalEntry = {
      id: nextId(),
      command,
      fullText,
      shownText: reduceMotion ? fullText : '',
    };
    setEntries((current) => [...current, entry].slice(-MAX_ENTRIES));
    if (!reduceMotion && fullText.length > 0) {
      timerRef.current = window.setInterval(() => {
        setEntries((current) =>
          current.map((item) => {
            if (item.id !== entry.id || item.shownText.length >= item.fullText.length) return item;
            return { ...item, shownText: item.fullText.slice(0, item.shownText.length + 1) };
          }),
        );
      }, TYPE_MS);
    }
  };

  // Stop the typing timer once every entry is fully shown.
  useEffect(() => {
    if (entries.every((entry) => entry.shownText === entry.fullText)) stopTyping();
  }, [entries]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) return;
    finishTyping();
    const action: TerminalAction = terminalCommands[command] ?? {
      kind: 'print',
      text: terminalPanel.notFound,
    };
    actionHandlers[action.kind](
      { command, action },
      { append: appendEntry, clear: () => setEntries([]) },
    );
    setValue('');
  };

  return (
    <article className="terminal-panel" aria-labelledby="terminal-title">
      <span className="lab-kicker">{terminalPanel.kicker}</span>
      <h3 id="terminal-title">{terminalPanel.title}</h3>
      <div className="terminal-screen" aria-live="polite">
        {entries.length < MAX_ENTRIES && (
          <>
            <p className="terminal-dim">
              {terminalPanel.hint} <span className="terminal-hot">{terminalPanel.hintCommand}</span>{' '}
              {terminalPanel.hintSuffix}
            </p>
            <p>
              <span className="terminal-hot">→</span> {terminalPanel.tryPrefix}{' '}
              {terminalPanel.suggestions.join(' · ')}
            </p>
          </>
        )}
        {entries.map((entry) => (
          <Fragment key={entry.id}>
            <p>
              <span className="terminal-hot">$ </span>
              {entry.command}
            </p>
            <p className="terminal-dim">{entry.shownText}</p>
          </Fragment>
        ))}
      </div>
      <form className="terminal-form" onSubmit={onSubmit}>
        <label className="terminal-prompt" htmlFor="terminalInput">
          $
        </label>
        <input
          className="terminal-input"
          id="terminalInput"
          type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder={terminalPanel.placeholder}
          aria-label={terminalPanel.inputLabel}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </article>
  );
}
