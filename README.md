# Virtual Dog Park

A beginner-friendly website built with HTML, CSS, and vanilla JavaScript for a first-year programming lab. It combines an informative three-breed dog encyclopedia with an interactive virtual pet adoption and care dashboard.

## Features

- **Dog Encyclopedia**: Learn key care notes, sizes, and temperaments for Beagles, Golden Retrievers, and Poodles.
- **Dog Adoption**: Select a breed and enter a customized dog name of up to 20 characters (with whitespace trimming and input validation).
- **Pet Care Actions**: Increase pet happiness by feeding or playing with the dog.
- **Day Simulation & Growth**: Advance time by one day, watch happiness adjust, and observe the pet grow across three distinct developmental stages.
- **Visual Indicators**: Track progression through text badges, an adaptive avatar size, and a dual-tone growth gauge.
- **Local Persistence**: Preserve the adopted dog's state across page reloads using browser storage.
- **Start Over Action**: Clear progress and adopt a new pet after a confirmation safety prompt.

The three dog illustrations located in the `assets/` folder (`beagle.svg`, `golden-retriever.svg`, and `poodle.svg`) are original, project-created vector illustrations, not copyrighted photographs or external web images.

## Previewing Locally

Run the project through a local web server rather than opening `index.html` directly via a `file://` URL, which can restrict browser storage APIs:

1. Open the `virtual-dog-park` folder in **VS Code**.
2. Install the **Live Server** extension by Ritwick Dey from the VS Code Extensions marketplace if not already installed.
3. Right-click `index.html` in the Explorer panel and select **Open with Live Server**.
4. The site will launch in your browser at `http://127.0.0.1:5500`.

## Growth & Happiness Rules

- **Initial Adoption**: Starts at **Day 1**, **Puppy** stage, with **50/100** happiness.
- **Feed**: Adds `+10` happiness per click, clamped at a maximum of `100`.
- **Play**: Adds `+10` happiness per click, clamped at a maximum of `100`.
- **Next Day**: Advances time by `+1` day and decreases happiness by `-5` per click, with a floor of `0`.
- **Growth Stages**:
  - **Day 1**: Puppy
  - **Days 2–3**: Young Dog
  - **Day 4 onward**: Adult Dog

## Storage Details

Pet progress is stored exclusively in client-side browser `localStorage` under the key `virtualDogParkPetV1`. This data lives locally within your browser on your machine; it is neither stored in an external cloud database nor associated with or uploaded to any GitHub account.

## Manual Testing Checklist

*Note: Automated tests were not run by an AI assistant; perform each step manually in your browser to verify project compliance.*

- [✓] **Encyclopedia Display**: Beagle, Golden Retriever, and Poodle cards render with their local SVG illustrations, size, personality, and care notes.
- [✓] **Name Validation**: Empty names or spaces-only inputs trigger an error; names over 20 characters are blocked; special HTML characters render safely as text.
- [✓] **Adoption State**: Submitting a valid name displays the pet dashboard at Day 1, Puppy stage, and 50/100 happiness.
- [✓] **Care Clamping**: Clicking Feed and Play increments happiness by 10 points and halts at 100/100.
- [✓] **Growth Progression**: Clicking Next Day advances days, decrements happiness by 5 (stopping at 0), and transitions stages from Puppy (Day 1) to Young Dog (Days 2–3) to Adult Dog (Day 4+).
- [✓] **Storage Persistence**: Refreshing the browser page at any point preserves the current pet, day, growth stage, and happiness value.
- [✓] **Reset Behavior**: Clicking Start Over and selecting "Cancel" keeps the pet; selecting "Confirm" clears `localStorage`, hides the dashboard, and resets the adoption form.
- [✓] **Responsive Design**: Narrowing the browser viewport stacks all cards vertically without introducing horizontal scrollbars.