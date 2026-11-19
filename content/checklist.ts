import { extras, type Extra } from './extras.ts';
import { packages, type CleaningPackage, type PackageId } from './packages.ts';

export type ClothColour = 'green' | 'yellow' | 'red' | 'blue';
export type RoomIconId = 'kitchen' | 'bathroom' | 'toilets' | 'living' | 'floors' | 'workspace';

export interface ClothSpec {
  colour: ClothColour;
  name: string;
  rooms: string;
  rule: string;
}

export interface ChecklistRoom {
  /** Stable URL-safe identifier referenced by tasks. */
  id: RoomIconId;
  /** Room heading shown on its window pane. */
  name: string;
  /** Microfibre cloth colour code used exclusively in this room. */
  cloth: ClothColour;
  /** Icon key rendered inside a droplet beside the room title. */
  icon: RoomIconId;
}

export interface ChecklistTask {
  /** Stable URL-safe identifier. */
  id: string;
  /** Matches a room id in checklistRooms. */
  roomId: RoomIconId;
  /** Plain-English description of the cleaning task. */
  task: string;
  /** Packages where this task is included in the base price. */
  includedIn: readonly PackageId[];
  /** Optional add-on id from content/extras.ts that covers this task when not included. */
  extraId?: string;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_CLOTHS = new Set<ClothColour>(['green', 'yellow', 'red', 'blue']);

export const clothCode: readonly ClothSpec[] = [
  {
    colour: 'green',
    name: 'Green cloth',
    rooms: 'Kitchen & kitchenette',
    rule: 'Food-contact surfaces, benchtops, sinks and appliances only.',
  },
  {
    colour: 'yellow',
    name: 'Yellow cloth',
    rooms: 'Bathrooms & mirrors',
    rule: 'Basins, vanities, shower screens and bathroom wall tiles.',
  },
  {
    colour: 'red',
    name: 'Red cloth',
    rooms: 'Toilets only',
    rule: 'Bagged separately after every clean — never touches another room.',
  },
  {
    colour: 'blue',
    name: 'Blue cloth',
    rooms: 'Living, bedrooms, floors & offices',
    rule: 'General dusting, skirting boards, door handles and workspaces.',
  },
];

export const checklistRooms: readonly ChecklistRoom[] = [
  { id: 'kitchen', name: 'Kitchen', cloth: 'green', icon: 'kitchen' },
  { id: 'bathroom', name: 'Bathroom', cloth: 'yellow', icon: 'bathroom' },
  { id: 'toilets', name: 'Toilets', cloth: 'red', icon: 'toilets' },
  { id: 'living', name: 'Living rooms & bedrooms', cloth: 'blue', icon: 'living' },
  { id: 'floors', name: 'Floors', cloth: 'blue', icon: 'floors' },
  { id: 'workspace', name: 'Workspace & office', cloth: 'blue', icon: 'workspace' },
];

export const checklistTasks: readonly ChecklistTask[] = [
  // Kitchen (green)
  { id: 'benchtops', roomId: 'kitchen', task: 'Wipe benchtops and splashback', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'sink-taps', roomId: 'kitchen', task: 'Scrub the sink and polish taps', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'stovetop', roomId: 'kitchen', task: 'Degrease the stovetop', includedIn: ['regular', 'end-of-lease'] },
  { id: 'appliance-fronts', roomId: 'kitchen', task: 'Wipe appliance fronts and handles', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'inside-microwave', roomId: 'kitchen', task: 'Clean inside the microwave', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'inside-oven', roomId: 'kitchen', task: 'Clean inside the oven, racks and door glass', includedIn: ['end-of-lease'], extraId: 'inside-oven' },
  { id: 'inside-fridge', roomId: 'kitchen', task: 'Clean inside the fridge', includedIn: ['end-of-lease'], extraId: 'inside-fridge' },
  { id: 'inside-cupboards', roomId: 'kitchen', task: 'Wipe inside cupboards and drawers', includedIn: ['end-of-lease'], extraId: 'inside-cupboards' },
  { id: 'rangehood', roomId: 'kitchen', task: 'Degrease the rangehood and filter', includedIn: ['end-of-lease'] },
  { id: 'dishwasher-cycle', roomId: 'kitchen', task: 'Load and run the kitchenette dishwasher', includedIn: ['office'] },

  // Bathroom (yellow)
  { id: 'shower-screen', roomId: 'bathroom', task: 'Descale and squeegee the shower screen', includedIn: ['regular', 'end-of-lease'] },
  { id: 'basin-vanity', roomId: 'bathroom', task: 'Scrub basin and vanity top', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'mirrors', roomId: 'bathroom', task: 'Streak-free mirrors', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'tiles-grout', roomId: 'bathroom', task: 'Scrub wall tiles and grout lines', includedIn: ['end-of-lease'] },
  { id: 'exhaust-fan', roomId: 'bathroom', task: 'Dust the exhaust fan cover', includedIn: ['end-of-lease'] },

  // Toilets (red)
  { id: 'toilet', roomId: 'toilets', task: 'Clean the toilet bowl, seat, cistern and base', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'restock', roomId: 'toilets', task: 'Restock paper and hand soap', includedIn: ['office'] },

  // Living rooms and bedrooms (blue)
  { id: 'dust-surfaces', roomId: 'living', task: 'Dust reachable surfaces and shelves', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'touchpoints', roomId: 'living', task: 'Wipe light switches, door handles and touchpoints', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'skirting', roomId: 'living', task: 'Wipe skirting boards', includedIn: ['end-of-lease'] },
  { id: 'wardrobes', roomId: 'living', task: 'Wipe inside wardrobes', includedIn: ['end-of-lease'] },
  { id: 'blinds', roomId: 'living', task: 'Dust blinds', includedIn: ['end-of-lease'], extraId: 'blinds' },
  { id: 'interior-windows', roomId: 'living', task: 'Interior windows and tracks', includedIn: ['end-of-lease'], extraId: 'interior-windows' },
  { id: 'wall-marks', roomId: 'living', task: 'Spot clean wall marks', includedIn: ['end-of-lease'], extraId: 'wall-spot-clean' },
  { id: 'linen', roomId: 'living', task: 'Change bed linen', includedIn: [], extraId: 'linen-change' },

  // Floors (blue)
  { id: 'vacuum', roomId: 'floors', task: 'Vacuum carpets, rugs and hard floors', includedIn: ['regular', 'end-of-lease', 'office'] },
  { id: 'mop', roomId: 'floors', task: 'Mop hard floors', includedIn: ['regular', 'end-of-lease', 'office'] },

  // Workspace (blue)
  { id: 'desks', roomId: 'workspace', task: 'Wipe clear desks and phones', includedIn: ['office'] },
  { id: 'bins', roomId: 'workspace', task: 'Empty and reline bins', includedIn: ['regular', 'office'] },
  { id: 'meeting-room', roomId: 'workspace', task: 'Reset meeting rooms and wipe whiteboards', includedIn: ['office'] },
];

export type TaskStatus =
  | { kind: 'included' }
  | { kind: 'addon'; extra: Extra }
  | { kind: 'excluded' };

export function taskStatusForPackage(
  task: ChecklistTask,
  packageId: PackageId,
  allExtras: readonly Extra[] = extras,
): TaskStatus {
  if (task.includedIn.includes(packageId)) return { kind: 'included' };
  if (task.extraId) {
    const extra = allExtras.find(item => item.id === task.extraId);
    if (extra && extra.appliesTo.includes(packageId)) {
      return { kind: 'addon', extra };
    }
  }
  return { kind: 'excluded' };
}

export function validateChecklist(
  rooms: readonly ChecklistRoom[] = checklistRooms,
  tasks: readonly ChecklistTask[] = checklistTasks,
  allPackages: readonly CleaningPackage[] = packages,
  allExtras: readonly Extra[] = extras,
): void {
  const pkgIds = new Set<string>(allPackages.map(p => p.id));
  const extraMap = new Map<string, Extra>(allExtras.map(e => [e.id, e]));
  const roomIds = new Set<string>();

  for (const room of rooms) {
    if (!SLUG.test(room.id)) {
      throw new Error(`checklistRooms[${room.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (roomIds.has(room.id)) {
      throw new Error(`checklistRooms[${room.id}]: duplicate room id`);
    }
    roomIds.add(room.id);
    if (!room.name.trim()) throw new Error(`checklistRooms[${room.id}]: name is required`);
    if (!VALID_CLOTHS.has(room.cloth)) {
      throw new Error(`checklistRooms[${room.id}]: invalid cloth colour "${room.cloth}"`);
    }
  }

  const seenTasks = new Set<string>();
  for (const task of tasks) {
    if (!SLUG.test(task.id)) {
      throw new Error(`checklistTasks[${task.id}]: id must be lowercase URL-safe kebab-case`);
    }
    if (seenTasks.has(task.id)) {
      throw new Error(`checklistTasks[${task.id}]: duplicate task id`);
    }
    seenTasks.add(task.id);
    if (!roomIds.has(task.roomId)) {
      throw new Error(`checklistTasks[${task.id}]: unknown roomId "${task.roomId}"`);
    }
    if (!task.task.trim()) {
      throw new Error(`checklistTasks[${task.id}]: task text is required`);
    }
    for (const pkgId of task.includedIn) {
      if (!pkgIds.has(pkgId)) {
        throw new Error(`checklistTasks[${task.id}]: unknown package "${pkgId}" in includedIn`);
      }
    }
    if (!task.includedIn.length && !task.extraId) {
      throw new Error(`checklistTasks[${task.id}]: task must be included in at least one package or linked to an extraId`);
    }
    if (task.extraId) {
      const extra = extraMap.get(task.extraId);
      if (!extra) {
        throw new Error(`checklistTasks[${task.id}]: unknown extraId "${task.extraId}"`);
      }
      const taskSet = [...task.includedIn].sort().join(',');
      const extraSet = [...extra.includedIn].sort().join(',');
      if (taskSet !== extraSet) {
        throw new Error(
          `checklistTasks[${task.id}]: includedIn [${taskSet}] must match extra "${extra.id}" includedIn [${extraSet}]`,
        );
      }
    }
  }
}
