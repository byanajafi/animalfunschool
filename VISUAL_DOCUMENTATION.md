# 🎨 VISUAL DOCUMENTATION - SECTION MENULIS

## UI LAYOUT

```
┌─────────────────────────────────────────────────────────────┐
│                    ✏️ CALISTUNG TAB                         │
│  [📖 Membaca]  [✏️ Menulis*]  [🔢 Menghitung]              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            ✏️ Trace & Tulis Nama Hewan                      │
│         Ikuti petunjuk untuk menulis nama hewan!            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   1️⃣ PILIH HEWAN                            │
│                                                              │
│  Pilih hewan: [▼ 🦁 Singa          ]                        │
│               [🐘 Gajah             ]                        │
│               [🐯 Harimau           ]                        │
│               [🐦 Burung            ]                        │
│               [🐱 Kucing            ]                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           2️⃣ REFERENSI (Tampilan Nama Benar)               │
│                                                              │
│    📝 REFERENSI TULIS:                                      │
│    ╔═════════════════════════════════════╗                  │
│    ║         SINGA                       ║                  │
│    ║   (Font size 36px, bold, red)       ║                  │
│    ╚═════════════════════════════════════╝                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              3️⃣ INSTRUKSI & AREA MENULIS                    │
│                                                              │
│  ✏️ Tulis nama hewan di area bawah ini:                     │
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │                                                 │        │
│  │  ~~~~ (user draws here - 700x200 canvas) ~~~~  │        │
│  │  ╲                                              │        │
│  │   ╲___  SINGA (faded guide text)               │        │
│  │                                                 │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  👆 Klik dan drag untuk menulis di area ini!               │
│                                                              │
│  ─────  ATAU  ──────────────────────────────────────────    │
│                                                              │
│  Ketik nama hewan (alternatif):                            │
│  ┌─────────────────────────────────────────────────┐        │
│  │ Ketik nama hewan di sini...                     │        │
│  │ (Font 20px, border secondary color)            │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  4️⃣ ACTION BUTTONS                          │
│                                                              │
│   ┌──────────────┐         ┌──────────────────────┐        │
│   │🗑️  HAPUS    │         │ ✓ PERIKSA JAWABAN   │        │
│   │(Secondary)  │         │  (Green Gradient)    │        │
│   └──────────────┘         └──────────────────────┘        │
│      16px font              18px font (lebih prominent)    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              5️⃣ ATTEMPT COUNTER (Optional)                  │
│                                                              │
│  Percobaan: 1/3                                             │
│  (Tampil jika attempt > 0)                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            6️⃣ FEEDBACK AREA (Dynamic)                       │
│                                                              │
│  CASE 1 - BENAR:                                            │
│  ┌─────────────────────────────────────────────────┐        │
│  │ ✓ Bagus! Benar sekali 🎉                       │        │
│  │ 🦁 SINGA                                        │        │
│  │ (Background: Green gradient, 20px font)        │        │
│  │ + Confetti animation 🎉🎊✨                    │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  CASE 2 - SALAH (attempt < 3):                             │
│  ┌─────────────────────────────────────────────────┐        │
│  │ ❌ Belum tepat, coba lagi ya! 💪              │        │
│  │ (Sisa percobaan: 2)                            │        │
│  │ (Background: Red, + shake animation)           │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  CASE 3 - HINT (attempt >= 2):                             │
│  ┌─────────────────────────────────────────────────┐        │
│  │ Percobaan: 2/3                                 │        │
│  │ 💡 Hint: Nama dimulai dengan huruf "S"        │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  CASE 4 - SELESAI (attempt >= 3):                          │
│  ┌─────────────────────────────────────────────────┐        │
│  │ ❌ Sayang! Jawaban yang benar adalah:          │        │
│  │ SINGA 🦁                                        │        │
│  │ + Tombol "Hewan Berikutnya" muncul             │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          7️⃣ NEXT BUTTON (Appears After Success)             │
│                                                              │
│        ┌────────────────────────────────┐                   │
│        │ ➡️ Hewan Berikutnya           │                   │
│        │ (Primary button, 16px font)   │                   │
│        └────────────────────────────────┘                   │
│        (Display: none initially)                             │
│        (Display: block after correct answer)               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## STATE TRANSITIONS

### Success Flow (Benar ✅)

```
INITIAL
  ↓
USER SELECTS ANIMAL
  ↓
  Canvas + Reference displayed
  Attempt counter: 0/3
  ↓
USER INPUTS ANSWER (Canvas or Text)
  ↓
CLICK "PERIKSA JAWABAN"
  ↓
✅ VALIDATION PASS
  ↓
  Feedback: GREEN with "Bagus! Benar sekali 🎉"
  Confetti animation starts
  Canvas highlights (brightness flash)
  Input turns green
  Sound: Success beep
  Next button appears
  ↓
USER CLICKS "HEWAN BERIKUTNYA"
  ↓
STATE RESETS → GO TO INITIAL (for next animal)
```

### Failure Flow (Salah ❌)

```
INITIAL
  ↓
USER SELECTS ANIMAL
  ↓
USER INPUTS ANSWER (wrong)
  ↓
CLICK "PERIKSA JAWABAN"
  ↓
❌ VALIDATION FAIL
  ↓
  attemptCount++
  Feedback: RED with "Belum tepat, coba lagi ya! 💪"
  Input shakes (shake animation)
  Input turns red
  Sound: Error beep
  Show: "Sisa percobaan: 2"
  ↓
  ┌─────────────────────────────┐
  │ attemptCount >= 2?          │
  └──────────┬──────────────────┘
             │
             ├─ NO: Loop back to INPUT
             │
             └─ YES: Show HINT
                "💡 Hint: Nama dimulai dengan huruf X"
                Loop back to INPUT
                ↓
  ┌─────────────────────────────┐
  │ attemptCount >= 3?          │
  └──────────┬──────────────────┘
             │
             ├─ NO: Loop back to INPUT
             │
             └─ YES: 
                Feedback: RED with "Sayang! Jawaban benar: SINGA 🦁"
                Next button appears
                ↓
USER CLICKS "HEWAN BERIKUTNYA"
  ↓
STATE RESETS → GO TO INITIAL (for next animal)
```

---

## INTERACTION POINTS

### 🎯 Interaction 1: Animal Selection
```
User Action: Click dropdown + select animal
Result: 
  - initWriting() called
  - writingState updated
  - Reference displayed
  - Canvas cleared & reset
  - Attempt counter cleared
```

### 🎯 Interaction 2: Canvas Drawing
```
User Action: Mouse down → drag → mouse up
Events:
  - startDrawing() → mousedown
  - draw() → mousemove (repeated)
  - stopDrawing() → mouseup
Result:
  - Red line appears on canvas
  - Max line width: 4px, rounded caps
```

### 🎯 Interaction 3: Text Input
```
User Action: Type text + clear (backspace)
Result:
  - Text input value updated
  - Border color tracks state
```

### 🎯 Interaction 4: Check Answer
```
User Action: Click "PERIKSA JAWABAN"
Logic:
  1. Priority: Check text input
  2. Fallback: Check canvas pixels
  3. Validate: toLowerCase + trim
  4. Decision: isCorrect boolean
Result:
  - If correct → handleCorrectAnswer()
  - If wrong → handleWrongAnswer()
```

### 🎯 Interaction 5: Clear Canvas
```
User Action: Click "HAPUS"
Result:
  - Canvas reset to white
  - Text input cleared
  - Attempt counter reset
  - Hints cleared
  - Can restart same animal
```

### 🎯 Interaction 6: Next Animal
```
User Action: Click "HEWAN BERIKUTNYA"
Result:
  - nextWritingAnimal() called
  - Next animal index: (current + 1) % total
  - initWriting() re-run
  - All state reset
  - Next button hidden
```

---

## VISUAL STATES

### Canvas States
```
┌─────────────────────────────┐
│ STATE 1: EMPTY (initial)    │
│ White bg + border           │
│ Guide text (faded)          │
└─────────────────────────────┘

┌─────────────────────────────┐
│ STATE 2: DRAWING            │
│ User draws red line         │
│ Line cap: round             │
│ Line width: 4px             │
└─────────────────────────────┘

┌─────────────────────────────┐
│ STATE 3: ANSWERED (Correct) │
│ Canvas highlighted          │
│ Brightness: 1.3x (500ms)    │
│ Background: Light green tint│
└─────────────────────────────┘
```

### Input Text States
```
┌─────────────────────────────┐
│ STATE 1: NORMAL (initial)   │
│ Border: #4ECDC4 (secondary) │
│ Background: white           │
│ Placeholder: "Ketik..."     │
└─────────────────────────────┘

┌─────────────────────────────┐
│ STATE 2: FOCUSED            │
│ Border: Same                │
│ Background: Same            │
│ Cursor: Text cursor         │
└─────────────────────────────┘

┌─────────────────────────────┐
│ STATE 3: WRONG ANSWER       │
│ Border: #FF6B6B (red)       │
│ Background: rgba red 0.1    │
│ Animation: shake 0.5s       │
└─────────────────────────────┘

┌─────────────────────────────┐
│ STATE 4: CORRECT ANSWER     │
│ Border: #95E1D3 (success)   │
│ Background: rgba green 0.1  │
│ Disabled: true              │
└─────────────────────────────┘
```

### Feedback Display States
```
┌──────────────────────────┐
│ STATE 1: HIDDEN          │
│ Display: none            │
│ Height: 0                │
└──────────────────────────┘

┌──────────────────────────┐
│ STATE 2: SUCCESS         │
│ Background: Green        │
│ Color: White             │
│ Animation: slideDown 0.5s│
│ Message: "Bagus..."      │
└──────────────────────────┘

┌──────────────────────────┐
│ STATE 3: ERROR           │
│ Background: Red          │
│ Color: White             │
│ Animation: shake 0.5s    │
│ Message: "Belum..."      │
└──────────────────────────┘

┌──────────────────────────┐
│ STATE 4: HINT            │
│ Background: Light red    │
│ Color: Red               │
│ Message: "💡 Hint..."   │
└──────────────────────────┘
```

### Button States
```
HAPUS Button:
┌──────────────┐
│  🗑️ HAPUS   │  → Click
└──────────────┘
Background: #95E1D3 (secondary)
Color: Dark text
State: Always enabled

PERIKSA JAWABAN Button:
┌─────────────────────┐
│ ✓ PERIKSA JAWABAN   │  → Click
└─────────────────────┘
Background: Green gradient
Color: White
State: Always enabled
Transform on hover: -3px

HEWAN BERIKUTNYA Button:
┌──────────────────────┐
│ ➡️ HEWAN BERIKUTNYA  │  → Click (after success)
└──────────────────────┘
Background: #FF6B6B (primary)
Color: White
Display: Initially hidden
Display: Block after correct answer
```

---

## ANIMATION TIMELINE

### ✅ Success Animation (Benar)

```
T=0ms:    User clicks "PERIKSA"
          → checkWriting() starts

T=100ms:  Validation complete → isCorrect = true
          → handleCorrectAnswer() triggered

T=100ms:  Canvas highlight starts
          brightness: 1.0 → 1.3

T=100ms:  Feedback message appears
          opacity: 0 → 1 (slideDown 0.5s)

T=100ms:  Sound plays (success.mp3)

T=100ms:  Confetti particles created (12 pieces)
          Each particle: 
          - Random emoji (🎉🎊⭐🌟✨🎈)
          - Random color
          - animationDelay: 0-200ms

T=100ms:  Input text turns green
          border: #95E1D3
          background: rgba(149, 225, 211, 0.1)

T=200ms:  Canvas highlight ends
          brightness: 1.3 → 1.0

T=500ms:  Feedback animation complete (slideDown)

T=200-3000ms: Confetti particles animate
              translateY: 0 → -500px
              rotateZ: 0 → 720deg
              scale: 1 → 0
              opacity: 1 → 0

T=3000ms: Next button becomes visible
          display: none → block

T=3000ms: Confetti particles removed from DOM
```

### ❌ Wrong Answer Animation (Salah)

```
T=0ms:    User clicks "PERIKSA"
          → checkWriting() starts

T=100ms:  Validation complete → isCorrect = false
          → handleWrongAnswer() triggered
          → attemptCount++

T=100ms:  Feedback message appears
          opacity: 0 → 1 (slideDown 0.5s)
          background color: Red

T=100ms:  Sound plays (wrong.mp3)

T=100ms:  Input text turns red (if has value)
          border: #FF6B6B
          background: rgba(255, 107, 107, 0.1)

T=100ms:  Shake animation starts on input
          translateX: 0 → -5 → +5 → ... (10 cycles)
          duration: 0.5s

T=500ms:  Shake animation complete

T=800ms:  If attemptCount == 2:
          Hint appears
          "💡 Hint: Nama dimulai dengan huruf X"

T=≥1500ms: User can try again
           Input ready for next attempt
```

---

## COLOR SCHEME

```
PRIMARY COLORS:
  Success (Correct):  #95E1D3  (Teal/Green)
  Error (Wrong):      #FF6B6B  (Red)
  Warning (Hint):     #FFE66D  (Yellow)
  Secondary:          #4ECDC4  (Cyan)

BACKGROUNDS:
  Canvas:              White (#FFFFFF)
  Reference Box:       #FFF8DC (Cream)
  Feedback Success:    Linear gradient(#95E1D3, #52C9B5)
  Feedback Error:      #FF6B6B (Red)
  Hint Area:           rgba(255, 107, 107, 0.1) (Light red)

TEXT COLORS:
  Success:             White
  Error:               White
  Hint:                #FF6B6B (Red)
  Reference:           #FF6B6B (Red)
  Normal:              #2C3E50 (Dark)
```

---

## RESPONSIVE BREAKPOINTS

### Desktop (> 768px)
```
Canvas: 700x200 px
Input: 80% width, max 500px
Buttons: Full width layout
Font sizes: As specified
```

### Tablet (480-768px)
```
Canvas: 80% width, maintain aspect
Input: 90% width
Buttons: Stack if needed
Font sizes: Reduce 10%
```

### Mobile (< 480px)
```
Canvas: 90% width, height auto
Input: 95% width
Buttons: Full width, stack vertically
Font sizes: Reduce 15-20%
Touch areas: Increase padding
```

---

## EMOJI & ICONS

```
Reference: 📝
Action: ✏️
Correct: ✓, 🎉, 🎊, ⭐, 🌟, ✨, 🎈
Wrong: ❌, 💪
Hint: 💡
Clear: 🗑️
Next: ➡️
Animal: 🦁🐘🐯🐦🐱 (contextual)
```

---

**Last Updated**: June 2, 2026  
**Documentation Version**: 1.0  
**Status**: ✅ Complete
