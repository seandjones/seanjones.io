<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="hero__inner">
      <div class="hero__base">
        <div class="sign">
          <h1 id="hero-name" class="t-display sign__name">{{ profile.name }}</h1>
          <p class="sign__role t-label">{{ profile.role }}</p>
          <p class="sign__line">{{ profile.line }}</p>
          <p class="sign__open">{{ profile.positioning }}</p>
          <div class="sign__actions">
            <a href="#contact" class="btn btn--sign-solid">Get in touch</a>
            <a href="#work" class="btn btn--sign-outline">See the work</a>
          </div>
        </div>

        <dl class="legend" aria-label="Results">
          <div v-for="r in results" :key="r.figure" class="legend__row">
            <dt class="legend__figure">
              <span class="bullet legend__line" :class="`bullet--${r.line}`">{{ lineNames[r.line] }}</span>
              <span class="legend__number">{{ r.figure }}</span>
            </dt>
            <dd class="legend__caption">{{ r.caption }}</dd>
          </div>
        </dl>
      </div>
      <!-- Focus listeners live on the figure: Chromium makes any SVG element with a
           focus listener tabbable, which put the svg and every line group in the tab order. -->
      <figure
        class="map"
        :class="{ 'map--drawing': drawing }"
        :data-active="activeLine ?? undefined"
        @focusin="onMapFocus"
        @focusout="onMapBlur"
      >
        <svg
          class="map__svg"
          viewBox="0 0 1200 410"
          preserveAspectRatio="xMinYMid meet"
          role="group"
          aria-labelledby="map-caption"
          aria-describedby="map-hint"
          @mouseleave="activeLine = null"
          @keydown="onMapKey"
        >
          <!-- Line bodies -->
          <g
            v-for="line in mapLines"
            :key="line.id"
            class="map__line"
            :data-line="line.id"
            @mouseenter="activeLine = line.id"
          >
            <path
              class="map__stroke"
              :d="linePath(line.id)"
              :style="{ stroke: `var(--line-${line.id})` }"
              pathLength="1"
              aria-hidden="true"
            />
            <g aria-hidden="true">
              <rect x="0" :y="line.y - 15" width="128" height="30" :style="{ fill: `var(--line-${line.id})` }" />
              <text
                class="map__badge"
                x="14"
                :y="line.y + 6"
                :style="{ fill: line.id === 'ai' ? 'var(--on-line-ai)' : line.id === 'leadership' ? 'var(--on-ink)' : 'var(--on-line)' }"
              >
                {{ line.name.toUpperCase() }}
              </text>
            </g>

            <a
              v-for="(station, si) in line.stations"
              :key="station.href + station.x"
              class="map__station"
              :href="station.href"
              :data-key="`${line.id}-${si}`"
              :data-line="line.id"
              :tabindex="tabStop(`${line.id}-${si}`)"
              :aria-label="`${line.name} line: ${station.label.join(' ')}`"
            >
              <rect class="map__hit" v-bind="stationHit(line, si)" />
              <rect
                v-if="station.terminus"
                class="map__terminus"
                :x="station.x - 4"
                :y="line.y - 16"
                width="8"
                height="32"
                :style="{ fill: `var(--line-${line.id})` }"
              />
              <rect
                v-else
                class="map__tick"
                :x="station.x - 5"
                :y="line.y - 10"
                width="10"
                height="20"
              />
              <text
                :ref="(el) => setLabel(`${line.id}-${si}`, el)"
                class="map__label"
                :text-anchor="station.terminus ? 'end' : 'middle'"
              >
                <tspan
                  v-for="(part, i) in station.label"
                  :key="i"
                  :x="station.terminus ? station.x + 4 : station.x"
                  :y="line.y - 20 - (station.label.length - 1 - i) * 18"
                >
                  {{ part }}
                </tspan>
              </text>
            </a>
          </g>

          <!-- Interchanges -->
          <a
            v-for="(ix, xi) in mapInterchanges"
            :key="ix.href + ix.x"
            class="map__station map__interchange"
            :href="ix.href"
            :data-lines="`${ix.from} ${ix.to}`"
            :data-key="`ix-${xi}`"
            :tabindex="tabStop(`ix-${xi}`)"
            :aria-label="`Interchange, ${lineNames[ix.from]} and ${lineNames[ix.to]} lines: ${ix.label.join(' ')}`"
            @mouseenter="activeLine = null"
          >
            <rect class="map__hit" v-bind="interchangeHit(ix, xi)" />
            <rect
              class="map__ring"
              :x="ix.x - 13"
              :y="midOf(ix) - LANE - 13"
              width="26"
              :height="LANE * 2 + 26"
              rx="13"
            />
            <text :ref="(el) => setLabel(`ix-${xi}`, el)" class="map__label map__label--ix" text-anchor="start">
              <tspan
                v-for="(part, i) in ix.label"
                :key="i"
                :x="ix.x + JOG_W + jogOf(ix) + 14"
                :y="midOf(ix) - 4 + i * 18"
              >
                {{ part }}
              </tspan>
            </text>
          </a>
        </svg>

        <!-- Phone and tablet: one strip map per line -->
        <div class="strips">
          <h2 class="visually-hidden">System map</h2>
          <section v-for="line in mapLines" :key="line.id" class="strip" :data-line="line.id">
            <h3 class="bullet" :class="`bullet--${line.id}`">{{ line.name }}</h3>
            <ol class="strip__stations" @keydown="onStripKey($event, line.id)">
              <li
                v-for="(station, sti) in stripStations(line.id)"
                :key="station.href + station.text"
                :class="{ 'strip__stop--ix': station.with }"
              >
                <a
                  :href="station.href"
                  class="strip__link"
                  :data-index="sti"
                  :tabindex="(stripActive[line.id] ?? 0) === sti ? 0 : -1"
                  @focus="stripActive[line.id] = sti"
                >
                  {{ station.text }}<span v-if="station.with" class="strip__with">Change for {{ station.with }}</span>
                </a>
              </li>
            </ol>
          </section>
        </div>

        <figcaption id="map-caption" class="map__caption">{{ mapCaption }}</figcaption>
        <p id="map-hint" class="map__hint">Tab moves between lines. Arrow keys move between stations.</p>
      </figure>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import {
  lineNames,
  mapCaption,
  mapInterchanges,
  mapLines,
  profile,
  results,
  type LineId,
  type MapInterchange,
  type MapLine,
} from '../content/site'

const activeLine = ref<LineId | null>(null)
const drawing = ref(false)
let drawTimer: number | undefined

// Octilinear routing: lines that share an interchange jog in at 45°,
// run side by side through it, and jog back out to their own row.
const LANE = 6
const JOG_W = 35

function yOf(id: LineId): number {
  return mapLines.find((l) => l.id === id)?.y ?? 0
}

function midOf(ix: MapInterchange): number {
  return (yOf(ix.from) + yOf(ix.to)) / 2
}

function jogOf(ix: MapInterchange): number {
  return Math.abs(midOf(ix) - LANE - yOf(ix.from))
}

// ─── Keyboard: one tab stop per line, arrows between stations ──────────────
// 20 station links in a row made the map a long tab trap. Each line now keeps
// a single tab stop (a roving tabindex); arrow keys move along and across lines.

interface Stop {
  key: string
  x: number
}

/** Stations and the interchanges a line passes through, in left-to-right order. */
function lineStops(id: LineId): Stop[] {
  const line = mapLines.find((l) => l.id === id)
  if (!line) return []
  const stops: Stop[] = line.stations.map((s, si) => ({ key: `${id}-${si}`, x: s.x }))
  mapInterchanges.forEach((ix, xi) => {
    if (ix.from === id || ix.to === id) stops.push({ key: `ix-${xi}`, x: ix.x })
  })
  return stops.sort((a, b) => a.x - b.x)
}

const lineOrder = mapLines.map((l) => l.id)
const roving = reactive<Record<string, string>>(
  Object.fromEntries(lineOrder.map((id) => [id, lineStops(id)[0]!.key])),
)
let currentLine: LineId = lineOrder[0]!

function tabStop(key: string): number {
  return Object.values(roving).includes(key) ? 0 : -1
}

function focusStop(svg: Element, line: LineId, key: string) {
  roving[line] = key
  currentLine = line
  svg.querySelector<SVGElement>(`[data-key="${key}"]`)?.focus()
}

function onMapBlur(event: FocusEvent) {
  const to = event.relatedTarget as Node | null
  if (!to || !(event.currentTarget as Element).contains(to)) activeLine.value = null
}

function onMapFocus(event: FocusEvent) {
  const el = (event.target as Element | null)?.closest<SVGElement>('svg [data-key]')
  if (!el) return
  const key = el.dataset.key!
  const own = el.dataset.line as LineId | undefined
  if (own) currentLine = own
  else if (!lineStops(currentLine).some((s) => s.key === key)) {
    currentLine = lineOrder.find((id) => roving[id] === key) ?? (el.dataset.lines!.split(' ')[0] as LineId)
  }
  roving[currentLine] = key
  // Highlight the line being travelled, including while on one of its interchanges.
  activeLine.value = currentLine
}

function onMapKey(event: KeyboardEvent) {
  const svg = event.currentTarget as Element
  const el = (event.target as Element | null)?.closest<SVGElement>('[data-key]')
  if (!el) return
  const stops = lineStops(currentLine)
  const i = stops.findIndex((s) => s.key === el.dataset.key)
  if (i < 0) return

  let line = currentLine
  let next: Stop | undefined
  switch (event.key) {
    case 'ArrowRight':
      next = stops[Math.min(i + 1, stops.length - 1)]
      break
    case 'ArrowLeft':
      next = stops[Math.max(i - 1, 0)]
      break
    case 'Home':
      next = stops[0]
      break
    case 'End':
      next = stops[stops.length - 1]
      break
    case 'ArrowDown':
    case 'ArrowUp': {
      const li = lineOrder.indexOf(currentLine) + (event.key === 'ArrowDown' ? 1 : -1)
      if (li < 0 || li >= lineOrder.length) return
      line = lineOrder[li]!
      const here = stops[i]!
      // On an interchange, moving to its other line only changes which line you
      // are travelling; focus stays put and Left/Right now follow that line.
      if (lineStops(line).some((s) => s.key === here.key)) {
        event.preventDefault()
        roving[line] = here.key
        currentLine = line
        activeLine.value = line
        return
      }
      const candidates = lineStops(line)
      next = candidates.reduce((best, s) => (Math.abs(s.x - here.x) < Math.abs(best.x - here.x) ? s : best))
      break
    }
    default:
      return
  }
  event.preventDefault()
  if (next) focusStop(svg, line, next.key)
}

const stripActive = reactive<Record<string, number>>({})

function onStripKey(event: KeyboardEvent, id: LineId) {
  const list = event.currentTarget as Element
  const links = [...list.querySelectorAll<HTMLAnchorElement>('a[data-index]')]
  const i = links.indexOf(event.target as HTMLAnchorElement)
  if (i < 0) return
  const last = links.length - 1
  const to =
    event.key === 'ArrowDown' ? Math.min(i + 1, last)
    : event.key === 'ArrowUp' ? Math.max(i - 1, 0)
    : event.key === 'Home' ? 0
    : event.key === 'End' ? last
    : null
  if (to === null) return
  event.preventDefault()
  stripActive[id] = to
  links[to]?.focus()
}

// ─── Hit areas ───────────────────────────────────────────────────────────────
// Each station's clickable area is its label's measured box plus its tick, so
// neighbouring stations can never overlap. Fixed-width boxes did: the
// "Deploy time" terminus covered half of "EC2 to ECS".

interface Box {
  x: number
  y: number
  width: number
  height: number
}

const PAD = 4
const labelEls = new Map<string, SVGTextElement>()
const labelBoxes = reactive<Record<string, Box>>({})

function setLabel(key: string, el: unknown) {
  if (el instanceof SVGElement && 'getBBox' in el) labelEls.set(key, el as SVGTextElement)
  else labelEls.delete(key)
}

function measureLabels() {
  for (const [key, el] of labelEls) {
    try {
      const b = el.getBBox()
      if (b.width > 0) labelBoxes[key] = { x: b.x, y: b.y, width: b.width, height: b.height }
    } catch {
      /* not rendered yet */
    }
  }
}

function span(left: number, top: number, right: number, bottom: number): Box {
  return { x: left, y: top, width: right - left, height: bottom - top }
}

function stationHit(line: MapLine, i: number): Box {
  const station = line.stations[i]!
  const label = labelBoxes[`${line.id}-${i}`]
  const tickLeft = station.x - 10
  const tickRight = station.x + (station.terminus ? 6 : 10)
  const bottom = line.y + (station.terminus ? 16 : 12)
  if (!label) {
    // Before measurement: a conservative box around the tick only.
    return span(tickLeft, line.y - 20, tickRight, bottom)
  }
  return span(
    Math.min(label.x, tickLeft) - PAD,
    label.y - PAD,
    Math.max(label.x + label.width, tickRight) + PAD,
    bottom,
  )
}

function interchangeHit(ix: MapInterchange, i: number): Box {
  const label = labelBoxes[`ix-${i}`]
  const top = midOf(ix) - LANE - 14
  const bottom = midOf(ix) + LANE + 14
  if (!label) return span(ix.x - 16, top, ix.x + 16, bottom)
  return span(
    ix.x - 16,
    Math.min(top, label.y - PAD),
    label.x + label.width + PAD,
    Math.max(bottom, label.y + label.height + PAD),
  )
}

function linePath(id: LineId): string {
  const y = yOf(id)
  let d = `M128 ${y}`
  const shared = mapInterchanges.filter((ix) => ix.from === id || ix.to === id).sort((a, b) => a.x - b.x)
  for (const ix of shared) {
    const lane = ix.from === id ? midOf(ix) - LANE : midOf(ix) + LANE
    const dy = Math.abs(lane - y)
    d += ` H${ix.x - JOG_W - dy} L${ix.x - JOG_W} ${lane} H${ix.x + JOG_W} L${ix.x + JOG_W + dy} ${y}`
  }
  return `${d} H1180`
}

/** Stations in reading order for the strip maps, interchanges folded into each line. */
function stripStations(id: LineId) {
  const line = mapLines.find((l) => l.id === id)
  if (!line) return []
  const stations: { x: number; text: string; href: string; with?: string }[] = line.stations.map((s) => ({
    x: s.x,
    text: s.label.join(' '),
    href: s.href,
  }))
  for (const ix of mapInterchanges) {
    if (ix.from === id || ix.to === id) {
      const other = ix.from === id ? ix.to : ix.from
      stations.push({ x: ix.x, text: ix.label.join(' '), href: ix.href, with: lineNames[other] })
    }
  }
  return stations.sort((a, b) => a.x - b.x)
}

let labelSizeQuery: MediaQueryList | null = null

onMounted(() => {
  measureLabels()
  document.fonts?.ready.then(measureLabels).catch(() => {})
  // Label size changes below 1200px wide or 820px tall, so re-measure there.
  labelSizeQuery = window.matchMedia?.('(max-width: 1199px), (max-height: 820px)') ?? null
  labelSizeQuery?.addEventListener?.('change', measureLabels)
})

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  drawing.value = true
  drawTimer = window.setTimeout(() => {
    drawing.value = false
  }, 1400)
})

onUnmounted(() => {
  window.clearTimeout(drawTimer)
  labelSizeQuery?.removeEventListener?.('change', measureLabels)
})
</script>

<style lang="scss" scoped>
.hero {
  padding: clamp(1rem, 2vw, 1.25rem) var(--gutter) clamp(3rem, 6vw, 5rem);
  border-bottom: 2px solid var(--rule-strong);
}

.hero__inner {
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.map {
  order: 1;
}

.hero__base {
  order: 2;
}

// ─── Map ────────────────────────────────────────────────────────────────────

.map {
  position: relative;
  margin: 0;
}

.map__svg {
  display: block;
  width: 100%;
  height: auto;
  // The first viewport must hold the map, the name panel and its actions at any
  // desktop height down to 720px. The panel needs about 28.5rem with the header
  // and gaps, so the map takes what is left and gives up height on short screens.
  max-height: max(16rem, calc(100svh - 28.5rem));
  overflow: visible;
  font-family: var(--font);

  @media (max-width: 959px) {
    display: none;
  }
}

.map__stroke {
  fill: none;
  stroke-width: 10;
  stroke-linecap: butt;
  stroke-linejoin: round;
}

.map__tick {
  fill: var(--ground);
  stroke: var(--ink);
  stroke-width: 2.5;
}

.map__badge {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.map__line,
.map__interchange {
  transition: opacity 160ms var(--ease-out);
}

.map[data-active] .map__line,
.map[data-active] .map__interchange {
  opacity: 0.16;
}

.map[data-active='ai'] .map__line[data-line='ai'],
.map[data-active='platform'] .map__line[data-line='platform'],
.map[data-active='frontend'] .map__line[data-line='frontend'],
.map[data-active='extensions'] .map__line[data-line='extensions'],
.map[data-active='leadership'] .map__line[data-line='leadership'],
.map[data-active='ai'] .map__interchange[data-lines~='ai'],
.map[data-active='platform'] .map__interchange[data-lines~='platform'],
.map[data-active='frontend'] .map__interchange[data-lines~='frontend'],
.map[data-active='extensions'] .map__interchange[data-lines~='extensions'],
.map[data-active='leadership'] .map__interchange[data-lines~='leadership'] {
  opacity: 1;
}

.map__hit {
  fill: transparent;
}

.map__label {
  font-size: 15px;
  font-weight: 600;
  fill: var(--ink);

  // The map scales with its column; below 1200px raise the label size in map
  // units so station names never render under about 13px on screen.
  @media (max-width: 1199px), (max-height: 820px) {
    font-size: 17px;
  }
}

.map__label--ix {
  font-weight: 800;
}

.map__station {
  cursor: pointer;
  outline: none;

  &:hover .map__label,
  &:focus-visible .map__label {
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
  }

  &:focus-visible .map__hit {
    stroke: var(--focus);
    stroke-width: 3;
  }
}

.map__ring {
  fill: var(--ground);
  stroke: var(--ink);
  stroke-width: 4;
}

// One authored moment: each line draws in once on load.
.map--drawing .map__stroke {
  stroke-dasharray: 1;
  animation: draw-line 900ms var(--ease-out) both;
}

@for $i from 1 through 5 {
  .map--drawing .map__line:nth-of-type(#{$i}) .map__stroke {
    animation-delay: #{($i - 1) * 90}ms;
  }
}

@keyframes draw-line {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.map__hint {
  font-size: var(--fs-label);
  font-weight: 700;
  color: var(--ink);

  // Desktop: takes the caption's line while the map has keyboard focus, so it
  // covers nothing on the map and never moves the page. Screen readers get it
  // through aria-describedby either way.
  @media (min-width: 960px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    line-height: 1.6;
    background: var(--ground);
    visibility: hidden;
  }

  // Strip maps: the hint keeps a reserved line under the caption.
  @media (max-width: 959px) {
    order: -1;
    min-height: 1.3em;
    margin: 0 0 0.5rem;
    visibility: hidden;
  }
}

.map:focus-within .map__hint {
  visibility: visible;
}

.map__caption {
  margin-top: 0.5rem;
  font-size: var(--fs-label);
  color: var(--ink-2);

  @media (max-width: 959px) {
    margin: 0 0 0.25rem;
    order: -1;
  }
}

// ─── Strip maps (narrow screens) ────────────────────────────────────────────

.strips {
  display: none;

  @media (max-width: 959px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1.75rem 2rem;
  }
}

@media (max-width: 959px) {
  .map {
    display: flex;
    flex-direction: column;
    order: 3;
    margin-top: 1.5rem;
  }

  .hero__inner > .hero__base {
    display: contents;
  }

  .sign {
    order: 1;
  }
}

.strip {
  --line-color: var(--line-leadership);

  &[data-line='ai'] {
    --line-color: var(--line-ai);
  }
  &[data-line='platform'] {
    --line-color: var(--line-platform);
  }
  &[data-line='frontend'] {
    --line-color: var(--line-frontend);
  }
  &[data-line='extensions'] {
    --line-color: var(--line-extensions);
  }
}

.strip__stations {
  list-style: none;
  margin-top: 0.5rem;
  margin-left: 0.6rem;
  border-left: 8px solid var(--line-color);
}

.strip__stations li {
  position: relative;
  padding-left: 1.1rem;

  &::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 50%;
    width: 20px;
    height: 10px;
    background: var(--ground);
    border: 2.5px solid var(--ink);
    transform: translateY(-50%);
  }
}

.strip__stations li.strip__stop--ix {
  padding-block: 0.4rem;

  &::before {
    left: -17px;
    width: 26px;
    height: 26px;
    border-width: 4px;
    border-radius: 50%;
  }
}

.strip__with {
  display: block;
  font-size: var(--fs-label);
  font-weight: 700;
  color: var(--ink-2);
}

.strip__link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 44px;
  font-weight: 600;
  line-height: 1.3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

// ─── Signage panel + legend ─────────────────────────────────────────────────

.hero__base {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(1.5rem, 3vw, 3rem);
  margin-top: clamp(1rem, 2vw, 1.25rem);
  align-items: stretch;

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    margin-top: 0;
  }
}

.sign {
  background: var(--sign-bg);
  color: var(--sign-fg);
  border: 2px solid var(--sign-border);
  padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 3vw, 2.25rem);

  @media (min-width: 960px) and (max-height: 920px) {
    padding-block: 1.1rem;
  }
}

.sign__name {
  color: var(--sign-fg);
}

.sign__role {
  margin-top: 0.85rem;
  opacity: 0.86;
}

.sign__open {
  margin-top: 0.5rem;
  max-width: 52ch;
  font-weight: 700;
  line-height: 1.4;
}

.sign__line {
  margin-top: 0.75rem;
  max-width: 52ch;
  line-height: 1.5;
}

.sign__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn--sign-solid {
  background: var(--sign-fg);
  border-color: var(--sign-fg);
  color: var(--sign-bg);

  &:hover {
    background: color-mix(in srgb, var(--sign-fg) 86%, var(--sign-bg));
    border-color: color-mix(in srgb, var(--sign-fg) 86%, var(--sign-bg));
  }
}

.btn--sign-outline {
  color: var(--sign-fg);

  &:hover {
    background: color-mix(in srgb, var(--sign-fg) 14%, transparent);
  }
}

.sign :focus-visible {
  outline-color: var(--sign-fg);
}

.legend {
  display: grid;
  align-content: center;
  border-top: 2px solid var(--rule-strong);
}

.legend__row {
  display: grid;
  grid-template-columns: 13.5rem 1fr;
  align-items: baseline;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--rule);
}

// Each result is labelled with its line by name, so nobody has to match a
// colour back to the map.
.legend__figure {
  display: grid;
  grid-template-columns: 7.5rem auto;
  align-items: baseline;
  gap: 0.75rem;
}

.legend__line {
  justify-self: start;
}

.legend__number {
  font-size: var(--fs-title);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.legend__caption {
  color: var(--ink-2);
  line-height: 1.35;
}

// Phones: the results sit right under the sign as compact rows, so the map
// strips still start inside the first screen.
@media (max-width: 959px) {
  .legend {
    order: 2;
    margin-top: 1rem;
  }

  .legend__row {
    grid-template-columns: 11rem 1fr;
    gap: 0.75rem;
    padding: 0.55rem 0;
  }

  .legend__figure {
    grid-template-columns: 6.5rem auto;
    gap: 0.5rem;
  }

  .legend__caption {
    font-size: var(--fs-label);
  }
}

@media (prefers-reduced-motion: reduce) {
  .map__line,
  .map__interchange {
    transition: none;
  }
}
</style>
