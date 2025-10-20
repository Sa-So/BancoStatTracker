# Banco Card Game Tracker - Design Guidelines

## Design Approach

**Hybrid Approach**: Casino-Modern aesthetic combining Material Design's clarity with gaming UI patterns inspired by modern poker apps (PokerStars, 888poker) and data visualization tools.

**Core Principle**: Create an immersive card game experience while maintaining crystal-clear data visibility for probability tracking and game state management.

---

## Color Palette

### Dark Mode (Primary)
- **Background**: Deep casino green `150 40% 12%` for main game area
- **Surface**: Elevated card table `150 25% 18%`
- **Surface Variant**: Player zones `150 20% 22%`
- **Primary Brand**: Rich emerald `150 60% 45%` for active states, winning indicators
- **Accent**: Gold `45 85% 55%` for currency, betting highlights (use sparingly)
- **Danger**: Casino red `0 75% 55%` for losses, double-loss warnings
- **Text Primary**: `0 0% 95%`
- **Text Secondary**: `0 0% 70%`

### Light Mode (Secondary)
- **Background**: Soft cream `40 25% 94%`
- **Surface**: White with subtle green tint `150 15% 98%`
- **Primary Brand**: Deep emerald `150 55% 35%`
- **Accent**: Amber `40 80% 45%`

---

## Typography

**Font Stack**: 
- Primary: 'Inter' for UI elements, data displays
- Accent: 'Playfair Display' for game title, decorative headers
- Monospace: 'JetBrains Mono' for probability percentages, currency values

**Scale**:
- Hero/Title: 3xl to 4xl, bold
- Player Names: lg, semibold
- Card Values: 2xl, bold
- Probabilities: base to lg, mono
- Currency: base, mono, medium
- Body/Labels: sm to base

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16 (p-2, m-4, gap-6, etc.)

**Container Structure**:
- Max width: 7xl for game board
- Game setup screens: max-w-2xl centered
- Responsive breakpoints: Mobile-first, stacked on mobile, grid on md+

**Grid Patterns**:
- Player cards: CSS Grid with auto-fit columns (2-4 players per row based on N)
- Control panels: Flexbox for betting interface
- Probability displays: Dedicated sidebar or cards with clear visual hierarchy

---

## Component Library

### A. Game Setup Components
**Player Input Screen**:
- Centered card-style container with form fields
- Number input for player count (1-8 range)
- Currency inputs for max bet and starting balance
- Large "Start Game" CTA button

**Card Dealing Interface**:
- Sequential card dealing animation
- Clear visual indication of whose turn to receive card
- "Deal Round 1" and "Deal Round 2" distinct phases

### B. Game Board Components

**Player Card Display**:
- Individual player zone with rounded corners, subtle elevation
- Player name badge at top
- Two large card displays (playing card aesthetic with suits and values)
- Current balance prominently displayed
- Probability breakdown (Win%, Lose%, Double Loss%) with color coding
- Active turn indicator (glowing border or spotlight effect)

**Card Visualization**:
- Traditional playing card design (white background, red/black suits)
- Large readable values (J=11, Q=12, K=13 displayed clearly)
- Suit symbols: ♠ ♥ ♦ ♣
- 3:4 aspect ratio, shadow for depth

**Betting Interface** (appears for active player):
- Slider for bet amount (0-max bet) with live value display
- Three distinct action buttons:
  - "Bet" (primary emerald)
  - "Skip" (neutral gray)
  - "Split" (conditional, gold, shows when cards match, displays 10 Rs cost)
- Clear indication of bet amount in bold currency format

**Deck Status Panel**:
- Remaining cards count with visual indicator (52 → decreasing)
- Cards revealed this round (scrollable list or compact display)
- "New Round" button when deck depletes

**Split Interface**:
- Modal or expanded view showing original card pairs
- Two new pairs displayed side-by-side
- Radio selection or click to choose preferred pair
- Clear "Confirm Selection" action

### C. Data Display Components

**Probability Cards**:
- Compact cards showing:
  - Win probability (green accent)
  - Lose probability (red accent)  
  - Double loss probability (dark red, emphasized)
- Visual bar charts or percentage circles
- Updates in real-time with smooth transitions

**Balance Tracker**:
- Running balance for each player
- Transaction history (won +25, lost -15, double loss -30)
- Color-coded gain/loss indicators

**Game History Log**:
- Scrollable sidebar or collapsible panel
- Each turn recorded: Player name, bet amount, card drawn, outcome
- Filterable by player

---

## Animations & Interactions

**Card Animations**:
- Flip animation when dealing cards (0.3s ease)
- Slide-in when revealing community card
- Pulse effect on active player's zone

**State Transitions**:
- Smooth probability updates (0.2s ease)
- Balance changes animate with color flash
- Winning/losing outcomes: Brief celebratory/commiseration animation

**Micro-interactions**:
- Button hover states with slight scale (1.02)
- Active card selection with shadow lift
- Betting slider with haptic-like feedback (color change on drag)

---

## Accessibility Features

**Color Independence**:
- All probability states use icons + text + color
- Win: ✓ icon + green
- Lose: ✗ icon + red  
- Double Loss: ⚠ icon + dark red

**Keyboard Navigation**:
- Tab through betting options
- Arrow keys for bet amount adjustment
- Enter to confirm actions

**Screen Reader Support**:
- Clear ARIA labels for all game states
- Announcements for turn changes and outcomes

---

## Responsive Behavior

**Desktop (lg+)**:
- Multi-column player grid (3-4 players visible)
- Sidebar for deck status and history
- Betting interface as overlay on active player zone

**Tablet (md)**:
- 2-column player grid
- Collapsible sidebar
- Simplified probability displays

**Mobile**:
- Single column stacked players
- Swipe between players
- Bottom sheet for betting interface
- Condensed probability view (tap to expand)

---

## Visual Hierarchy Principles

1. **Active Player First**: Spotlight effect, elevated z-index
2. **Probabilities Immediately Visible**: No hidden calculations
3. **Clear Action Path**: Setup → Deal → Bet → Reveal → Outcome
4. **Persistent Context**: Always show current round, deck count, total players

---

## Images

**No hero images required** - This is a functional game tracker focused on gameplay.

**Card Graphics**: Use Unicode suit symbols or simple SVG card designs. No need for photograph-quality card images.

**Optional Decorative Elements**: Subtle poker chip icons, playing card watermarks in background (very low opacity, non-distracting).