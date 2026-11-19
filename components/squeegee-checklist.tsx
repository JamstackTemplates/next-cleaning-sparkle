'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  checklistRooms,
  checklistTasks,
  taskStatusForPackage,
  type ChecklistRoom,
  type RoomIconId,
} from '../content/checklist';
import { extras } from '../content/extras';
import { packages, type PackageId } from '../content/packages';
import { ClothTab, RoomIcon, SqueegeeBlade, clothLabelText } from './art/cleaning-icons';

const PACKAGE_IDS: readonly PackageId[] = ['regular', 'end-of-lease', 'office'];

function parseHashPackage(hash: string): PackageId | null {
  const clean = hash.replace(/^#/, '');
  if (clean === 'regular' || clean === 'end-of-lease' || clean === 'office') {
    return clean;
  }
  return null;
}

/**
 * Signature Squeegee Checklist:
 * - Radio-group switcher with arrow-key navigation across Regular, End-of-lease and Office.
 * - Switching sends a squeegee blade across the misted glass pane (600ms; instant under reduced motion).
 * - Included tasks clear to crisp surface glass with an aqua tick inside a droplet; add-on tasks
 *   show "+ $59 add-on"; excluded tasks remain misted as "Not included".
 * - Static / Print view renders a full 3-column comparison table across all three packages.
 */
export function SqueegeeChecklist({
  roomIds,
  syncHash = false,
  showPrintButton = false,
}: {
  /** Limit to specific rooms (e.g. ['kitchen', 'bathroom'] for Home teaser); omit for all rooms. */
  roomIds?: readonly RoomIconId[];
  /** Sync selected package with URL hash (#regular, #end-of-lease, #office). */
  syncHash?: boolean;
  /** Show a Print checklist button beside the switcher. */
  showPrintButton?: boolean;
}) {
  const [selected, setSelected] = useState<PackageId>('regular');
  const [wipeTick, setWipeTick] = useState(0);
  const [wiping, setWiping] = useState(false);
  const radioRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const wipeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const visibleRooms: readonly ChecklistRoom[] = roomIds
    ? checklistRooms.filter(room => roomIds.includes(room.id))
    : checklistRooms;

  useEffect(() => {
    if (!syncHash) return;
    const initial = parseHashPackage(window.location.hash);
    if (initial) setSelected(initial);
    const onHashChange = () => {
      const next = parseHashPackage(window.location.hash);
      if (next) setSelected(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [syncHash]);

  useEffect(() => () => clearTimeout(wipeTimer.current), []);

  function selectPackage(next: PackageId) {
    if (next === selected) return;
    setSelected(next);
    setWipeTick(t => t + 1);
    setWiping(true);
    clearTimeout(wipeTimer.current);
    wipeTimer.current = setTimeout(() => setWiping(false), 620);

    if (syncHash && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${next}`);
    }
  }

  function handleRadioKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % PACKAGE_IDS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + PACKAGE_IDS.length) % PACKAGE_IDS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = PACKAGE_IDS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const nextPkg = PACKAGE_IDS[nextIndex];
    selectPackage(nextPkg);
    radioRefs.current[nextIndex]?.focus();
  }

  const activePkg = packages.find(p => p.id === selected) ?? packages[0];

  return (
    <div>
      {/* Interactive view (hidden in print) */}
      <div className="interactive-checklist">
        {/* Top bar: radio-group package switcher + optional Print button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="radiogroup"
            aria-label="Choose a cleaning package to wipe the checklist"
            className="inline-flex flex-wrap gap-1.5 rounded-ui border border-line bg-surface p-1.5 shadow-xs"
          >
            {PACKAGE_IDS.map((pkgId, index) => {
              const pkg = packages.find(p => p.id === pkgId)!;
              const checked = selected === pkgId;
              return (
                <button
                  key={pkgId}
                  ref={el => { radioRefs.current[index] = el; }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => selectPackage(pkgId)}
                  onKeyDown={e => handleRadioKeyDown(index, e)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
                    checked
                      ? 'bg-accent text-on-accent shadow-xs'
                      : 'bg-transparent text-ink hover:bg-mist'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      pkg.stripe === 'aqua'
                        ? 'bg-aqua'
                        : pkg.stripe === 'dawn'
                          ? 'bg-dawn'
                          : checked
                            ? 'bg-sea-glass'
                            : 'bg-ink'
                    }`}
                  />
                  {pkg.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">
              Showing: <strong className="text-ink">{activePkg.name}</strong>
            </span>
            {showPrintButton ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="button button-quiet min-h-10 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider no-print"
              >
                Print all 3 packages
              </button>
            ) : null}
          </div>
        </div>

        {/* Window mullion grid with squeegee blade runner */}
        <div
          key={wipeTick}
          className={`relative overflow-hidden rounded-ui border-2 border-line bg-mist p-3 sm:p-5 ${
            wiping ? 'squeegee-sweep-active' : ''
          }`}
        >
          {/* Squeegee blade sweeps across when switching package */}
          {wiping ? (
            <div
              aria-hidden="true"
              className="squeegee-blade-runner pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center"
            >
              <SqueegeeBlade horizontal className="h-full w-6 drop-shadow-md" />
            </div>
          ) : null}

          <div
            className={`squeegee-cleared-layer grid gap-4 ${
              visibleRooms.length > 1 ? 'md:grid-cols-2' : ''
            }`}
          >
            {visibleRooms.map(room => {
              const tasks = checklistTasks.filter(t => t.roomId === room.id);
              const includedCount = tasks.filter(
                t => taskStatusForPackage(t, selected, extras).kind === 'included',
              ).length;

              return (
                <section
                  key={room.id}
                  aria-labelledby={`room-${room.id}`}
                  className="overflow-hidden rounded-ui border border-line bg-surface/95 shadow-xs"
                >
                  {/* Room pane header with droplet icon + folded cloth colour tab */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist/70 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <RoomIcon id={room.icon} className="h-9 w-8" />
                      <div>
                        <h3 id={`room-${room.id}`} className="font-display text-lg text-ink">
                          {room.name}
                        </h3>
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                          {includedCount} of {tasks.length} included
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-ink">
                      <ClothTab colour={room.cloth} />
                      <span>{clothLabelText[room.cloth]}</span>
                    </span>
                  </div>

                  {/* Tasks list: wiped clear for included, misted for not included */}
                  <ul className="divide-y divide-line/70 list-none m-0 p-0">
                    {tasks.map(task => {
                      const status = taskStatusForPackage(task, selected, extras);
                      const isIncluded = status.kind === 'included';
                      const isAddon = status.kind === 'addon';

                      return (
                        <li
                          key={task.id}
                          className={`flex items-start justify-between gap-3 px-4 py-3 text-sm transition-colors ${
                            isIncluded
                              ? 'bg-surface text-ink'
                              : isAddon
                                ? 'bg-mist/40 text-ink'
                                : 'mist-pane rounded-none border-0 text-muted/85'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {isIncluded ? (
                              <span
                                aria-hidden="true"
                                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/20 text-accent-ink"
                              >
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                  <path
                                    d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="2.1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            ) : isAddon ? (
                              <span
                                aria-hidden="true"
                                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-aqua/60 bg-surface font-mono text-xs font-bold text-accent-ink"
                              >
                                +
                              </span>
                            ) : (
                              <span
                                aria-hidden="true"
                                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-mist text-muted"
                              >
                                –
                              </span>
                            )}
                            <span className={isIncluded ? 'font-medium' : ''}>{task.task}</span>
                          </div>

                          <span
                            className={`shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-wider ${
                              isIncluded
                                ? 'text-accent-ink'
                                : isAddon
                                  ? 'rounded-[3px] border border-aqua/50 bg-surface px-2 py-0.5 text-accent-ink'
                                  : 'text-muted'
                            }`}
                          >
                            {isIncluded
                              ? 'Included'
                              : isAddon
                                ? `+ $${status.extra.price} add-on`
                                : 'Not included'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Static table rendered for print (and inside noscript for no-JS visitors) */}
      <div className="print-only-checklist mt-6">
        <StaticChecklistTable rooms={visibleRooms} />
      </div>
      <noscript>
        <div className="mt-6">
          <StaticChecklistTable rooms={visibleRooms} />
        </div>
      </noscript>
    </div>
  );
}

function StaticChecklistTable({ rooms }: { rooms: readonly ChecklistRoom[] }) {
  return (
    <div className="overflow-x-auto rounded-ui border border-line bg-surface">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Room-by-room cleaning checklist across all three packages</caption>
        <thead>
          <tr className="border-b border-line bg-mist font-mono text-xs uppercase tracking-wider text-ink">
            <th scope="col" className="px-4 py-3">Room &amp; task</th>
            <th scope="col" className="px-3 py-3">Regular</th>
            <th scope="col" className="px-3 py-3">End-of-lease</th>
            <th scope="col" className="px-3 py-3">Office</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rooms.flatMap(room => {
            const tasks = checklistTasks.filter(t => t.roomId === room.id);
            return [
              <tr key={`room-${room.id}`} className="bg-mist/50">
                <th scope="colgroup" colSpan={4} className="px-4 py-2 font-display text-base text-ink">
                  {room.name} ({clothLabelText[room.cloth]})
                </th>
              </tr>,
              ...tasks.map(task => (
                <tr key={task.id}>
                  <td className="px-4 py-2.5 text-ink">{task.task}</td>
                  {PACKAGE_IDS.map(pkgId => {
                    const status = taskStatusForPackage(task, pkgId, extras);
                    return (
                      <td key={pkgId} className="px-3 py-2.5 font-mono text-xs">
                        {status.kind === 'included'
                          ? 'Included'
                          : status.kind === 'addon'
                            ? `Add-on $${status.extra.price}`
                            : '—'}
                      </td>
                    );
                  })}
                </tr>
              )),
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}
