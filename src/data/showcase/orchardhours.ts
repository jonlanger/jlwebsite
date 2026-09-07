import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "orchardhours",
  category: "experiments",
  title: "Orchard Hours",
  description:
    "A small, slow browser game about picking apples — four rows of trees, one bear, and no timer. Built entirely in code, with no image files in it at all.",
  image: "/projects/orchardhours/orchardhours_card.webp",
  alt: "An alley between two rows of apple trees at golden hour, a small bear in a straw hat standing in the mown grass.",
  width: 1024,
  height: 576,
  liveUrl: "https://orchardhours.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Orchard Hours is a quiet game about picking apples and putting them away properly. You walk a bear called Pom down four rows of trees, take the fruit that is ripe, and carry it back to the barn — where it can be sold, or pressed into cider, out of a merchant's catalogue kept on a writing desk. There is no timer, no enemy, and nothing to lose.",
      "It is built entirely in code. There are no models, no textures and no image files in the build: every tree, apple, barrel and beam is written as geometry and assembled when the page loads. That made the look and the rules the same job — a barn is drawn and tuned in the same file, and the warm, low-polygon style is what the whole thing was designed around rather than something applied to it afterwards. The other half of the work was the handful of numbers underneath: how much a basket holds, how long an apple stays ripe, and how tired the bear gets.",
    ],
    role: "Solo build — game design, economy, character animation, procedural geometry, interaction and UI",
    scope:
      "Browser game in three.js and TypeScript, 7,958 lines across 39 modules, one runtime dependency, saved in the browser",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "I wanted to make something cosy: a place to potter about in for twenty minutes, with a bear, some apples and a barn. The pleasure in a game like this is in the pottering — walking a row, spotting something ripe, filling a basket and carrying it in.",
        "What gives that shape is having something small and pleasant to weigh up while you do it. In an orchard the natural one is which fruit to take, and that only becomes interesting if not all of it is ready at once. Everything else in the design came out of making that true.",
      ],
      topicGroups: [
        {
          title: "What made it tricky",
          items: [
            {
              title: "Gentle limits, not obstacles",
              body: "Something has to make one apple a better choice than another. But the limits had to stay soft enough to keep the mood — nothing that punishes you, and nothing that takes work back off you.",
            },
            {
              title: "The look is written, not drawn",
              body: "With no textures or models, the whole style is geometry, flat colour and light. A shape that does not read has to be fixed by rebuilding it or by changing how it moves.",
            },
            {
              title: "The numbers set the pace",
              body: "A basket of 24 only means something against a barrel of 60 and a day of 420 seconds. Change one and the rhythm of an afternoon changes with it.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "20",
          label: "Trees in the orchard",
          detail:
            "Four rows of five — nine metres apart along a row, thirteen across. They carry around 470 apples between them, placed on low limbs, on the scaffolds and up in the crown.",
        },
        {
          value: "0",
          label: "Image files in the build",
          detail:
            "No models, no textures, no sprites. The bear, the barn, the trees and the tools are all built from primitives at start-up.",
        },
        {
          value: "71 KB",
          label: "The game itself, gzipped",
          detail:
            "Across 30 code-split chunks. three.js is a further 171 KB, and it is the only runtime dependency.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The first job was to make fruit scarce without taking anything away from the player. Every apple runs one ripening schedule and only one: it colours up, is at its best for two or three minutes, hangs on a little past that, then falls into the grass. The wait before that window is anywhere from 45 seconds to 25 minutes, so only about a tenth of a tree is worth picking at any moment. Ripe apples wear a small mark, and the orchard plan shows which trees have any.",
        "The second job was to make picking cost something. The reach is animated the way apples are actually picked — the fruit is cupped, rolled upwards until the stalk end points at the sky, then twisted off, because pulling down tears out the spur that fruits next year. Anything above two and a half metres has to come down on the pole, and a pole pick costs about 60% more stamina than one taken in the paw. That gap is why the ladder and the barrow are worth walking back to the barn for.",
        "The rest is a loop with one way in and one way out. Fruit comes off the trees into a basket of 24, gets tipped into barrels of 60 in the barn, and is sold at the desk or turned overnight into cider, jelly or dried rings. Money only ever comes from selling, so everything on the merchant's page — a 90-shilling sapling, a 640-shilling barn extension, a field at 1,200 — is paid for in picking. That is what lets the game open up without locking anything behind a level: nothing is unavailable, the barn is just too small until you extend it.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/orchardhours/diagram-ripening.png",
          alt: "Diagram of one apple's single ripening cycle: set, coming on for 45 to 1500 seconds, at its best for 140 to 205, past it for 25 to 65, then a windfall — with notes on why the wait is spread so wide and why an apple that sets again gets a fresh schedule.",
          width: 1200,
          height: 662,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/orchardhours/diagram-reach.png",
          alt: "Diagram of the reach: a height scale from the bear's feet showing 2.5 metres by paw and 4.2 more on the pole, the four-phase and five-phase pick animations with their durations, and what each action costs in stamina.",
          width: 1200,
          height: 1082,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/orchardhours/diagram-day.png",
          alt: "Diagram of a day in the orchard as five steps — the rows, the basket, the barrels, the desk, and overnight — each with its capacity and its prices, plus the windfall loop that feeds the compost heap.",
          width: 1200,
          height: 1179,
        },
      ],
      topicGroups: [
        {
          title: "Decisions worth the argument",
          items: [
            {
              title: "Tiredness slows, it never stops",
              body: "A tired bear stoops and walks more slowly — down to about two thirds of its pace when it is completely spent — and reaches at 0.72 speed. It never refuses to work. A calm game can afford to make you slower; it cannot afford to take the afternoon off you.",
            },
            {
              title: "Sold from the barrels, never the basket",
              body: "Carrying and storing are separate states with separate limits, so the walk back to the barn is a real step rather than a formality — and a full barn is what makes the extension worth buying.",
            },
            {
              title: "Everything happens in the morning",
              body: "Deliveries, finished cider, the compost going out and the trees setting again all resolve on one day rollover. One place to reason about, and it gives the day a shape.",
            },
            {
              title: "A tap is eight pixels and 300 milliseconds",
              body: "The canvas is a camera control and a field of targets at the same time. Move more than eight pixels and it was a drag meant for the camera; stay inside that, and inside a third of a second, and it was a tap meant for the world.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "1/60",
          label: "Fixed gameplay step",
          detail:
            "Movement and animation run on a fixed step; everything cosmetic runs once a frame. After a tab-out it catches up five steps and drops the rest rather than teleporting the bear.",
        },
        {
          value: "8",
          label: "Stages behind the loading screen",
          detail:
            "The world is built one module at a time behind a line-art tree that draws itself. Each stage gets a share of the line matched to what it costs; planting the rows costs the most.",
        },
        {
          value: "v5",
          label: "Save format, reading three back",
          detail:
            "An older season is found under its own key and carried forward, and anything the world builds geometry from is re-checked on load — a half-written key should not cost you the farm.",
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "Screens below are from the live build. The HUD is four small panels and a tool belt; everything else — the almanac, the ledger, the catalogue and the orchard plan — is on one sheet of paper in the barn, and every number on it is read from the same state the world is drawn from.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/orchardhours/figure-hours.webp",
          alt: "The same alley at four times of one day: early morning, midday, golden hour, and dusk with the lantern lit.",
          width: 1800,
          height: 1096,
        },
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/orchardhours/product-wordmark.webp",
            alt: "The finished loading screen: a line-drawn apple tree with three red apples on it, above the words Orchard Hours.",
            width: 1360,
            height: 1165,
            title: "The mark",
            caption:
              "The last thing the loading screen does before it lifts: the line finishes, three apples pop onto the drawn tree, and that is the wordmark. It is inline SVG in the HTML, so it is the first thing on screen and it costs nothing to load.",
          },
          {
            src: "/projects/orchardhours/product-rows.webp",
            alt: "Looking down an alley between two rows of apple trees, the bear standing in the mown grass with its basket.",
            width: 1800,
            height: 1125,
            title: "The rows",
            caption:
              "Four rows of five, thirteen metres apart. Each tree is grown from a trunk, four scaffold limbs branched recursively, and four or five low limbs for the fruit a bear can reach — then planted at a random turn of its own.",
          },
          {
            src: "/projects/orchardhours/product-fruit.webp",
            alt: "Close-up of apples on a branch: a red Honeycrisp and a Golden Delicious with pale bracket marks around them showing they are ripe.",
            width: 1800,
            height: 1125,
            title: "At its best",
            caption:
              "The pale brackets are the ripe mark. They turn to face whoever is looking and fade in and out gently, and only about a tenth of a tree wears them at once — which is what makes crossing the row to a particular branch worth doing.",
          },
          {
            src: "/projects/orchardhours/product-pick-hand.webp",
            alt: "The bear holding a green apple at its paw, mid-twist, under the low limbs of a tree.",
            width: 1800,
            height: 1125,
            title: "The twist",
            caption:
              "Held at the third of four phases. The limb has been drawn down to the bear, the apple rolled until its stalk end points at the sky, and it is being turned off the branch rather than pulled off it.",
          },
          {
            src: "/projects/orchardhours/product-pick-pole.webp",
            alt: "The bear on the ground with a telescoping picking pole raised into the canopy of a tree.",
            width: 1800,
            height: 1125,
            title: "And overhead",
            caption:
              "Anything above two and a half metres comes down on the pole: the hoop goes under the fruit, pushes up and turns, and the apple drops into the bag to be lowered and tipped into the basket.",
          },
          {
            src: "/projects/orchardhours/product-bear.webp",
            alt: "Close-up portrait of Pom the bear in a straw hat and blue dungarees, carrying a wicker basket.",
            width: 1800,
            height: 1283,
            title: "Pom",
            caption:
              "A dozen boxes, two rounded ears and a hat, with no texture on any of it. The character reads from proportion and from movement — the stoop when it is tired, the little bounce it gives when it reaches.",
          },
          {
            src: "/projects/orchardhours/product-barrow.webp",
            alt: "The bear pushing a wooden wheelbarrow down the grass alley between two rows.",
            width: 1800,
            height: 1125,
            title: "The overflow",
            caption:
              "Three basketfuls, so a good tree does not send you back to the barn halfway through. Loaded, it costs a third of your speed, and it will not fit between the trunks the way you do.",
          },
          {
            src: "/projects/orchardhours/product-barn-wide.webp",
            alt: "The barn interior seen in section from the doorway: the plank floor, barrels along the wall, the cider press, the writing desk, and the loft above.",
            width: 1800,
            height: 1125,
            title: "The barn",
            caption:
              "Two floors, a loft and a roof deck, all built from boxes and cylinders. The camera borrows a closer, flatter frame the moment the bear steps under a roof, and hands the player's own settings back when it steps out.",
          },
          {
            src: "/projects/orchardhours/product-barrels.webp",
            alt: "Inside the barn: a row of wooden barrels along the wall, the bear at a bench with a crate of apples.",
            width: 1800,
            height: 1125,
            title: "The barrels",
            caption:
              "Sixty to a variety, one barrel each, and the level in each is drawn from the count. This is the only fruit the merchant will buy.",
          },
          {
            src: "/projects/orchardhours/product-desk.webp",
            alt: "A writing desk in the corner of the barn with an open catalogue, an ink pot and a weighted stack of papers.",
            width: 1800,
            height: 1125,
            title: "The desk",
            caption:
              "Back-left corner of the barn, under the loft. Selling and ordering both happen standing at it, so the catalogue is a place you go rather than a key you press.",
          },
          {
            src: "/projects/orchardhours/product-catalogue.webp",
            alt: "The merchant's catalogue: shillings in the purse, fruit sold out of the barrels, goods the barn has made, and equipment to order.",
            width: 1800,
            height: 1125,
            title: "The catalogue",
            caption:
              "Fruit, made goods, three machines, saplings, the barn extension and the deeds to three fields. Anything you cannot afford tells you how far short you are instead of greying itself out.",
          },
          {
            src: "/projects/orchardhours/product-plan.webp",
            alt: "The orchard plan: the barn and twenty trees drawn to scale, each tree marked with what is ripe on it, and the bear's position and heading.",
            width: 1800,
            height: 1125,
            title: "The orchard plan",
            caption:
              "Drawn from the same list of trees the renderer uses, with a count on every tree that still has ripe fruit on it. It is a map of where the picking is, not of where the trees are.",
          },
          {
            src: "/projects/orchardhours/product-extension.webp",
            alt: "The barn from above with its extension built and the old silo opened up beside it, and the morning's post announced in a toast.",
            width: 1800,
            height: 1125,
            title: "The morning post",
            caption:
              "“The barn extension is up, The Long Meadow is yours, the cider press is in the barn, 3 saplings are by the door.” Everything ordered yesterday, all settled in one rollover.",
          },
          {
            src: "/projects/orchardhours/product-sit.webp",
            alt: "The bear sitting down in the grass with its legs out in front of it, basket beside it.",
            width: 1800,
            height: 1012,
            title: "A sit in the grass",
            caption:
              "One of the three ways to get your wind back, along with eating an apple out of the basket and sleeping. The stoop and the slower reach are the only penalty in the game, and both wear off.",
          },
        ],
        accordion: [
          {
            value: "barn",
            title: "Inside the barn",
            description:
              "Most of the modelling is in one building: a floor of barrels and machines, a loft over it, a roof deck over that, and the old silo alongside once the extension opens it up.",
            slides: [
              {
                src: "/projects/orchardhours/product-barrel-row.webp",
                alt: "The row of barrels along the west wall of the barn, with the writing desk beyond them.",
                width: 1800,
                height: 1125,
                title: "The west wall",
                caption:
                  "One barrel to a variety to start with. The extension frames four more along this wall and opens the silo behind it, taking the store from 60 of each variety to 240.",
              },
              {
                src: "/projects/orchardhours/product-barrels-close.webp",
                alt: "Close-up of the barrel tops, each with a chalked label board and a line marking how full it is.",
                width: 1800,
                height: 1125,
                title: "Chalked up",
                caption:
                  "Each barrel carries a board naming what goes in it and a chalk line that rises as it fills. It is the same number the ledger reports, drawn on the object itself.",
              },
              {
                src: "/projects/orchardhours/product-press.webp",
                alt: "The cider press in the barn: a beam, a wooden screw and a slotted tub, with the chalkboard on the wall behind.",
                width: 1800,
                height: 1125,
                title: "The cider press",
                caption:
                  "Beam, screw and a slotted tub, with a pail underneath. Twelve apples the pressing, loaded last thing, and the jug is waiting in the morning.",
              },
              {
                src: "/projects/orchardhours/product-kettle.webp",
                alt: "The preserving kettle end of the barn, with the tool rack and barrels along the wall.",
                width: 1800,
                height: 1125,
                title: "The preserving kettle",
                caption:
                  "A copper kettle and a hearth to stand it on, at the opposite end from the press. Eight apples the batch — the cheapest thing on the page, and the one an orchard can sell in January.",
              },
              {
                src: "/projects/orchardhours/product-loft.webp",
                alt: "The barn loft: a plank deck with a rail along its front edge and the stairs coming up at one side.",
                width: 1800,
                height: 1125,
                title: "The loft",
                caption:
                  "Five metres deep with very little headroom, which is why the camera pulls in to under four metres and flattens out as soon as the bear steps up here.",
              },
              {
                src: "/projects/orchardhours/product-drying-rack.webp",
                alt: "The drying rack standing in the loft, a frame hung with rings of apple.",
                width: 1800,
                height: 1125,
                title: "The drying rack",
                caption:
                  "It lives in the loft because that is where the warm air collects. Twenty apples the batch, hung in rings that turn slightly out of step with each other while it works.",
              },
              {
                src: "/projects/orchardhours/product-chalkboard.webp",
                alt: "A slate chalkboard on the barn wall, with the season's figures written up on it.",
                width: 1800,
                height: 1125,
                title: "The chalkboard",
                caption: "The season, written up on the wall. Reading it opens the ledger.",
              },
              {
                src: "/projects/orchardhours/product-rack.webp",
                alt: "The tool rack on the barn wall with the picking pole, shears and lantern, the ladder leaning beside it.",
                width: 1800,
                height: 1125,
                title: "The tool rack",
                caption:
                  "All five tools are on the wall on the first morning — pole, ladder, barrow, shears, lantern. Nothing here is bought or unlocked; you just have to find out you need it, and walk back for it.",
              },
              {
                src: "/projects/orchardhours/product-roof-deck.webp",
                alt: "Standing on the barn's roof deck, looking out over the ridge to the orchard rows beyond.",
                width: 1800,
                height: 1125,
                title: "The roof deck",
                caption:
                  "The stairs do not stop at the loft. There is nothing to do up here at all — it is the one place in the game that exists only because it is a nice place to stand.",
              },
              {
                src: "/projects/orchardhours/product-silo.webp",
                alt: "The barn from outside with the old silo standing against it, a ladder up its side and a chute running through to the barn.",
                width: 1800,
                height: 1125,
                title: "The silo",
                caption:
                  "Boarded up until the extension is built, then swept out and given a chute through from the barn. It takes a further 120 of each variety — the difference between selling every evening and selling when the price suits.",
              },
            ],
          },
          {
            value: "paper",
            title: "The paper record",
            description:
              "One sheet in the barn with five tabs on it — almanac, ledger, catalogue, how to play, settings — and every figure read from the same state the world is drawn from.",
            slides: [
              {
                src: "/projects/orchardhours/product-catalogue-full.webp",
                alt: "The complete catalogue page: purse and season totals, the four varieties with their prices, jelly, cider and dried rings, the kettle, rack and press, saplings, the barn extension, and the three plots of land.",
                width: 1564,
                height: 3084,
                title: "The catalogue, end to end",
                caption:
                  "The prices are the design document. Eight apples make a 40-shilling jar of jelly, twelve an 84-shilling jug of cider, twenty a 120-shilling sack of dried rings — and each machine takes the cheapest fruit in the barrels first.",
              },
              {
                src: "/projects/orchardhours/product-almanac.webp",
                alt: "The almanac: a page each for the four apple varieties, and notes on why the rows run straight and how an apple is taken off.",
                width: 1800,
                height: 1125,
                title: "The almanac",
                caption:
                  "A page per variety, each one opening the first time you pick it, alongside a few notes on real orchard practice — why the rows run straight, and why most apple trees cannot pollinate themselves.",
              },
              {
                src: "/projects/orchardhours/product-ledger.webp",
                alt: "The ledger: picked, in the barrels, in hand, varieties, trees pruned, composted, day, shillings, vigour left, and the level in each barrel.",
                width: 1800,
                height: 1125,
                title: "The ledger",
                caption:
                  "The season so far, and the closest thing the game has to a score. Nothing here is stored separately — every figure is worked out from the same state the orchard is drawn from.",
              },
              {
                src: "/projects/orchardhours/product-howto.webp",
                alt: "The How to play page: where to start, walking about, picking, resting up, tools, the catalogue, ripeness, windfalls and the barrow.",
                width: 1800,
                height: 1125,
                title: "How to play",
                caption:
                  "Nine short panels, kept on the same sheet as the almanac and the ledger instead of in a tutorial. The game never takes the controls away from you to explain itself.",
              },
            ],
          },
          {
            value: "opening",
            title: "The loading screen",
            description:
              "Markup and styles inlined in the HTML, so the curtain is on screen before the bundle has finished downloading.",
            slides: [
              {
                src: "/projects/orchardhours/product-boot.webp",
                alt: "The loading screen part-way through: a line-art apple tree half drawn, with a stage label reading “raising the sky”.",
                width: 1800,
                height: 1125,
                title: "Drawing itself",
                caption:
                  "How much of the tree is drawn is the progress bar, and the label underneath names whichever of the eight build stages is currently blocking the thread. Each stage gets a share of the line matched to what it costs.",
              },
              {
                src: "/projects/orchardhours/product-menu.webp",
                alt: "The menu sheet: an apple mark beside the words Orchard Hours, a list of places to go, and the full key map underneath.",
                width: 1800,
                height: 1125,
                title: "The menu",
                caption:
                  "The same mark and wordmark as the curtain, over five places to go and the whole key map. Opening it blocks input to the bear, so nothing is walking off while you read.",
              },
            ],
          },
          {
            value: "dusk",
            title: "After the light goes",
            description:
              "The hour of the day is one interpolation across five phases — sky gradient, sun position, light colour and shadow length all move together.",
            slides: [
              {
                src: "/projects/orchardhours/product-dusk.webp",
                alt: "The rows at dusk, the bear carrying a lit lantern that throws a warm pool of light on the grass around it.",
                width: 1800,
                height: 1125,
                title: "The lantern",
                caption:
                  "A point light on a kerosene lamp, brightening as the sky darkens. It is the one tool that changes no number in the game — not reach, not capacity, not pace. It only lets you see what you are doing.",
              },
            ],
          },
          {
            value: "mobile",
            title: "On a phone",
            description:
              "A touch screen swaps the keyboard hints for a stick, a jump, an action button and three small ones for eating, sitting and throwing.",
            slides: [
              {
                src: "/projects/orchardhours/product-mobile-rows.webp",
                alt: "Orchard Hours on a phone: the rows in portrait with a virtual stick at bottom left and action buttons at bottom right.",
                width: 860,
                height: 1864,
                title: "The rows (mobile)",
                caption:
                  "Tapping an apple still sends the bear over to pick it, and tapping the ground still walks it there — the same tap-versus-drag test the mouse uses.",
              },
              {
                src: "/projects/orchardhours/product-mobile-catalogue.webp",
                alt: "The catalogue on a phone: the same sheet in one column.",
                width: 860,
                height: 1864,
                title: "The catalogue (mobile)",
                caption: "One column, same sheet, same numbers.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Orchard Hours shipped as a full season: four apple varieties, five tools, three machines, three fields to buy, saplings that fruit within a week, and a barn you can extend into its old silo. It runs on a phone, keeps the season in the browser, and downloads nothing but code.",
        "Where it goes next is off the single browser tab it currently lives in. Everything is kept in local storage today, so a season belongs to one device and ends when the cache is cleared. Moving that to an account would make the orchard something you come back to — the same farm on a phone at lunchtime and a laptop in the evening, with seasons that carry over properly.",
        "That opens up the things a persistent orchard can do: a proper record of what a season produced rather than a single ledger page, quiet notifications when a batch of cider is ready or the trees have set overnight, neighbouring orchards you can visit, and shared events across the map. It would also make the design measurable — which varieties people plant, where they run out of barrel space, how far into a season they get — which is exactly what the balance of the game needs next.",
      ],
      stats: [
        {
          value: "Live",
          label: "Public browser game",
          detail: "orchardhours.vercel.app. No account, no backend, nothing to install.",
        },
        {
          value: "7,958",
          label: "Lines of TypeScript",
          detail:
            "Across 39 modules in four folders — core, world, player and ui. Systems register themselves with the frame loop rather than being called from one place.",
        },
        {
          value: "1",
          label: "Runtime dependency",
          detail: "three.js 0.160. No engine, no framework, no physics library, no asset pipeline.",
        },
        {
          value: "0.62",
          label: "What the barrow costs",
          detail:
            "It carries three basketfuls and multiplies everything the legs can do by 0.62. The clearest example of the game charging for capacity.",
        },
      ],
    },
  ],
};
