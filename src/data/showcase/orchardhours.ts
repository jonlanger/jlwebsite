import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "orchardhours",
  category: "experiments",
  title: "Orchard Hours",
  description:
    "A quiet season in the apple rows, built out of arithmetic: twenty trees, one bear, and an economy whose only currency is how far a pair of arms will reach in a day.",
  image: "/projects/orchardhours/orchardhours_card.webp",
  alt: "An alley between two rows of apple trees at golden hour, a small bear in a straw hat standing in the mown grass.",
  width: 1024,
  height: 576,
  liveUrl: "https://orchardhours.vercel.app/",
  overview: {
    title: "Overview",
    paragraphs: [
      "Orchard Hours is a small, slow game about picking apples in a planted orchard and putting them away properly. Walk a bear called Pom down the rows, take what is at its best, tip the basket into the barrels in the barn, and sell it — or press it, boil it, dry it — out of a merchant's catalogue kept on a writing desk. There is nothing to lose and nothing to beat.",
      "There is also nothing to download. Every tree, apple, barrel and beam is generated in code at start-up: no models, no textures, not one image file in the build. The interesting design work was not the look of it but the arithmetic underneath — a set of capacities and costs tuned so that the whole economy is bounded by one thing, which is how much a pair of arms can reach in a day.",
    ],
    role: "Solo build — simulation design, economy, character animation, procedural geometry, interaction and UI",
    scope:
      "Browser game — three.js and TypeScript over Vite, 7,958 lines across 39 modules, one runtime dependency, and a season kept in the browser's own storage",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "The pitch was a farming game with no clock on it and no fail state — but a game with nothing to lose still has to have something to decide, or it is a screensaver. What is there to decide in an orchard is which fruit to take, and that only becomes a question if the answer changes while you are standing there.",
        "So the design problem is a scarcity problem with no antagonist in it. Everything that makes the game a game had to come from the orchard's own facts: fruit ripens and then falls, arms only reach so high, and a barn only holds so much.",
      ],
      topicGroups: [
        {
          title: "What makes this hard",
          items: [
            {
              title: "A cosy game still needs a constraint",
              body: "Without one, picking is a button you press until you stop enjoying it. The constraint here is the bear's own legs — and it had to be one the player would forgive, which rules out anything that takes progress away.",
            },
            {
              title: "Nothing to hide behind",
              body: "No assets means no art to carry a weak moment. If a reach reads wrong, or a barn is the wrong shape, the only thing to fix it with is geometry written by hand.",
            },
            {
              title: "Every number leans on every other",
              body: "A basket of 24 is only meaningful against a barrel of 60, a day of 420 seconds, and a ripening window of three minutes. Change one and the shape of an afternoon changes.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "20 / 471",
          label: "Trees, and apples on them",
          detail:
            "Four rows of five on nine-metre centres. Fruit is placed on low limbs, on the scaffolds, under the canopy skirt and up in the crown — roughly where a real crop hangs.",
        },
        {
          value: "0",
          label: "Asset files in the build",
          detail:
            "No models, no textures, no sprites. The bear, the barn, the trees and the tools are all built from primitives at start-up.",
        },
        {
          value: "55 KB",
          label: "The whole orchard, gzipped",
          detail:
            "Across 30 code-split chunks. three.js is the other 171 KB, and it is the only runtime dependency.",
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The economy is a loop with one inlet. Fruit enters it in the rows and leaves it at a desk, and money is only ever created by selling — so every price in the catalogue, from a 90-shilling sapling to the 1,200 the East Paddock costs, is really denominated in reaching. That is what lets the difficulty curve be made entirely of capacities: nothing in the game is locked, things are just too small until they are not.",
        "The scarcity is in the ripening. Every apple that is set runs one schedule and only one — it colours up, comes to its best for two or three minutes, hangs on a little past that, and then the stem gives and it is a windfall. The wait before that window is anywhere from 45 seconds to 25 minutes against a 420-second day, which means about a tenth of a tree is worth picking at any moment. The ripe ones wear a mark, and the orchard plan is a map of where the fruit is rather than where the trees are.",
        "And the price of everything is the reach itself. Picking is animated the way it is actually done — the apple is cupped, rolled upwards until the calyx points at the top of the tree, and twisted off stem and all, because a yank takes the fruiting spur with it and costs next year's crop. Overhead, on the end of a pole, it costs more: 0.026 of the bear's vigour against 0.016. That difference is the entire reason a ladder and a barrow are worth walking back to the barn for.",
      ],
      figures: [
        {
          afterParagraphIndex: 0,
          src: "/projects/orchardhours/diagram-day.png",
          alt: "Diagram of a day in the orchard as five steps — the rows, the basket, the barrels, the desk, and overnight — each with its capacity and its prices, plus the windfall loop that feeds the compost heap.",
          width: 1200,
          height: 1222,
        },
        {
          afterParagraphIndex: 1,
          src: "/projects/orchardhours/diagram-ripening.png",
          alt: "Diagram of one apple's single ripening cycle: set, coming on for 45 to 1500 seconds, at its best for 140 to 205, past it for 25 to 65, then a windfall — with notes on why the wait is spread so wide and why the schedule is re-rolled overnight.",
          width: 1200,
          height: 672,
        },
        {
          afterParagraphIndex: 2,
          src: "/projects/orchardhours/diagram-reach.png",
          alt: "Diagram of the reach: a height scale from the bear's feet showing 2.5 metres by paw and 4.2 more on the pole, the four-phase and five-phase pick animations with their durations, and the ledger of what each action costs in vigour.",
          width: 1200,
          height: 1082,
        },
      ],
      topicGroups: [
        {
          title: "Decisions worth the argument",
          items: [
            {
              title: "Tiredness slows, it never stops",
              body: "Below 0.36 the bear stoops and loses a third of its pace; below 0.13 it will not run. It never refuses to work. A cosy game can afford to make you slower — it cannot afford to take the afternoon off you.",
            },
            {
              title: "Sold out of the barrels, never the basket",
              body: "Carrying fruit and storing it are different states with different capacities, so the walk back to the barn is a real step in the loop rather than a formality — and the store filling up is what makes the extension worth buying.",
            },
            {
              title: "Everything arrives in the morning",
              body: "Orders, batches, deliveries and the trees setting again all resolve on one day rollover. One place to reason about, and it gives the day a shape: the day you spend picking is the day your order is on the road.",
            },
            {
              title: "The reach is measured from where you will stand",
              body: "The rows roll, so whether an apple is in reach is computed from the ground at its own approach point rather than from wherever the bear happens to be. A tap should not fail because you are in a dip.",
            },
            {
              title: "Land is sold in full-width strips",
              body: "The three plots each push one fence out to a new line, so the farm stays a rectangle. The walkable clamp, the drawn plan and the planting checks all read one set of bounds rather than a polygon.",
            },
            {
              title: "A tap is eight pixels and 300 milliseconds",
              body: "The canvas is an orbit control and a field of targets at once. Past eight pixels of travel it was a drag aimed at the camera; inside that, and inside a third of a second, it was a tap aimed at the world.",
            },
          ],
        },
      ],
      stats: [
        {
          value: "1/60",
          label: "Fixed gameplay step",
          detail:
            "Movement and animation run on a fixed step and everything cosmetic runs once a frame. After a tab-out it catches up five steps and drops the rest rather than teleporting the bear.",
        },
        {
          value: "8",
          label: "Boot stages, weighted by cost",
          detail:
            "The world is built module by module behind a line-art tree that draws itself; each stage takes its share of the line, and the rows cost the most by far.",
        },
        {
          value: "5",
          label: "Save generations, read forward",
          detail:
            "An older season is found under its own key and carried forward, and every catalogue field the world builds geometry from is re-validated on load — a half-written key must not cost you the farm.",
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "Screens below are from the live build. The HUD is four small panels and a tool belt; everything else — the almanac, the ledger, the catalogue and the orchard plan — lives on one sheet of paper in the barn, and every figure on it is read out of the same state the world is drawn from.",
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
            src: "/projects/orchardhours/product-rows.webp",
            alt: "Looking down an alley between two rows of apple trees, the bear standing in the mown grass with its basket.",
            width: 1800,
            height: 1125,
            title: "The rows",
            caption:
              "Four rows of five, thirteen metres apart. Every tree is grown from a trunk, four scaffolds and a recursive limb routine, and every one is planted at a random turn of its own.",
          },
          {
            src: "/projects/orchardhours/product-pick-hand.webp",
            alt: "The bear holding a green apple at its paw, mid-twist, under the low limbs of a tree.",
            width: 1800,
            height: 1125,
            title: "The twist",
            caption:
              "Held at the third of four phases. The limb has been drawn down along the line of the reach, the apple rolled until its calyx points at the top of the tree, and it is being turned off the spur — never pulled down off it.",
          },
          {
            src: "/projects/orchardhours/product-pick-pole.webp",
            alt: "The bear on the ground with a telescoping picking pole raised into the canopy of a tree.",
            width: 1800,
            height: 1125,
            title: "And overhead",
            caption:
              "Everything above 2.5 metres from the bear's feet is the pole's job: the hoop goes under the fruit, pushes up, turns, and the apple settles into the bag to be lowered and tipped into the basket.",
          },
          {
            src: "/projects/orchardhours/product-barrow.webp",
            alt: "The bear pushing a wooden wheelbarrow down the grass alley between two rows.",
            width: 1800,
            height: 1125,
            title: "The overflow",
            caption:
              "Three basketfuls, so a good tree does not send you back halfway through. Loaded, it costs 38% of the pace, and its tray and wheel probe for trunks in front of the bear — it will not fit where you will.",
          },
          {
            src: "/projects/orchardhours/product-barrels.webp",
            alt: "Inside the barn: a row of wooden barrels along the wall, the bear at a bench with a crate of apples.",
            width: 1800,
            height: 1125,
            title: "The barrels",
            caption:
              "Sixty to the variety, one barrel each, and the level in each is drawn from the count. This is the only fruit the merchant will buy.",
          },
          {
            src: "/projects/orchardhours/product-desk.webp",
            alt: "A writing desk in the corner of the barn with an open catalogue, an ink pot and a weighted stack of papers.",
            width: 1800,
            height: 1125,
            title: "The desk",
            caption:
              "Back-left corner, under the loft. Selling and ordering both happen standing at it, so the catalogue is somewhere you go rather than a key you press.",
          },
          {
            src: "/projects/orchardhours/product-catalogue.webp",
            alt: "The merchant's catalogue: shillings in the purse, fruit sold out of the barrels, goods the barn has made, and equipment to order.",
            width: 1800,
            height: 1125,
            title: "The catalogue",
            caption:
              "Fruit, made goods, three machines, saplings, the barn extension and the deeds to three fields. Anything you cannot afford says how far short you are rather than greying itself out.",
          },
          {
            src: "/projects/orchardhours/product-almanac.webp",
            alt: "The almanac: a page each for the four apple varieties, and notes on why the rows run straight and how an apple is taken off.",
            width: 1800,
            height: 1125,
            title: "The almanac",
            caption:
              "Varieties open as you pick them, and the longer pages open as the season does. Honeycrisp's cells are unusually large and rupture when bitten; most orchard apples cannot pollinate themselves.",
          },
          {
            src: "/projects/orchardhours/product-ledger.webp",
            alt: "The ledger: picked, in the barrels, in hand, varieties, trees pruned, composted, day, shillings, vigour left, and the level in each barrel.",
            width: 1800,
            height: 1125,
            title: "The ledger",
            caption:
              "The season to date, and the closest thing the game has to a score. Nothing here is stored separately — every figure is derived from the state the orchard is drawn from.",
          },
          {
            src: "/projects/orchardhours/product-plan.webp",
            alt: "The orchard plan: the barn and twenty trees drawn to scale, each tree marked with what is ripe on it, and the bear's position and heading.",
            width: 1800,
            height: 1125,
            title: "The orchard plan",
            caption:
              "Drawn from the same tree list the renderer walks, with a count on every tree that still has fruit at its best on it. It is a map of where the picking is, not of where the trees are.",
          },
          {
            src: "/projects/orchardhours/product-rack.webp",
            alt: "The tool rack on the barn wall with the picking pole, shears and lantern, the ladder leaning beside it.",
            width: 1800,
            height: 1125,
            title: "The rack",
            caption:
              "Five tools, none of them bought: the pole, the ladder, the barrow, the shears and the lantern are all on the wall on the first morning. What gates them is the orchard, not a shop.",
          },
          {
            src: "/projects/orchardhours/product-extension.webp",
            alt: "The barn from above with its extension built and the old silo opened up beside it, and the morning's post announced in a toast.",
            width: 1800,
            height: 1125,
            title: "The morning post",
            caption:
              "“The barn extension is up, The Long Meadow is yours, the cider press is in the barn, 3 saplings are by the door.” Everything ordered yesterday, resolved in one rollover.",
          },
          {
            src: "/projects/orchardhours/product-sit.webp",
            alt: "The bear sitting down in the grass with its legs out in front of it, basket beside it.",
            width: 1800,
            height: 1012,
            title: "A sit in the grass",
            caption:
              "One of the three things that put vigour back, along with eating an apple out of the basket and a night's sleep. The stoop and the slower reach are the game's only punishment, and both wear off.",
          },
          {
            src: "/projects/orchardhours/product-boot.webp",
            alt: "The boot curtain: a line-art apple tree drawing itself on cream paper under the words Orchard Hours and a stage label reading “raising the sky”.",
            width: 1800,
            height: 1125,
            title: "The curtain",
            caption:
              "Markup and styles inlined in the HTML so it paints before the bundle has downloaded. The drawn length of the tree is the progress bar, and the label underneath is whichever stage is blocking the thread.",
          },
        ],
        accordion: [
          {
            value: "paper",
            title: "The whole catalogue",
            description:
              "The sheet end to end: what fruit fetches, what the barn has made, the three machines, the nursery stock, the building work and the land.",
            slides: [
              {
                src: "/projects/orchardhours/product-catalogue-full.webp",
                alt: "The complete catalogue page: purse and season totals, the four varieties with their prices, jelly, cider and dried rings, the kettle, rack and press, saplings, the barn extension, and the three plots of land.",
                width: 1564,
                height: 3084,
                title: "Ordered by post, settled at the desk",
                caption:
                  "Prices are the design document: 8 apples make a 40-shilling jar of jelly, 12 an 84-shilling jug of cider, 20 a 120-shilling sack of rings. The press has the best return on the page and costs the most to get.",
              },
              {
                src: "/projects/orchardhours/product-howto.webp",
                alt: "The How to play page: where to start, walking about, picking, resting up, tools, the catalogue, ripeness, windfalls and the barrow.",
                width: 1800,
                height: 1125,
                title: "How to play",
                caption:
                  "Nine short panels, kept on the same sheet as the almanac and the ledger rather than behind a tutorial. The game never takes the controls away from you to explain itself.",
              },
            ],
          },
          {
            value: "dusk",
            title: "After the light goes",
            description:
              "The hour is one interpolation across five phases of a 420-second day — sky gradient, sun bearing, key-light colour and shadow length together.",
            slides: [
              {
                src: "/projects/orchardhours/product-dusk.webp",
                alt: "The rows at dusk, the bear carrying a lit lantern that throws a warm pool of light on the grass around it.",
                width: 1800,
                height: 1125,
                title: "The lantern, earning its keep",
                caption:
                  "A point light on a kerosene lamp, brightening as the sky goes. It is the one tool with no mechanical effect at all — it only lets you keep working, which is the point of it.",
              },
            ],
          },
          {
            value: "mobile",
            title: "On a phone",
            description:
              "A coarse pointer swaps the keyboard hints for a stick, a jump, an action button and three small ones for eating, sitting and throwing.",
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
        "Orchard Hours closes as a browser game with a full season in it: four varieties, five tools, three machines, three plots of land to buy, saplings that bear within the week, and a barn that can be extended into its own silo. It runs on a phone, keeps its season in local storage across five generations of save format, and downloads nothing but code.",
        "The thing I would keep is the decision to make tiredness slow the bear rather than stop it. Everything else in the design followed from it: because the punishment is soft, the constraint could be tight, and because the constraint is tight, every capacity on the farm — a basket of 24, a barrel of 60, a barrow that costs 38% of your pace — turns into a real decision about how to spend an afternoon. The one number I would still be tuning is the ripening wait, which at 45 to 1500 seconds is generous enough that a patient player can out-wait the design.",
      ],
      stats: [
        {
          value: "Live",
          label: "Public browser game",
          detail: "Shipped at orchardhours.vercel.app. No account, no backend, no download.",
        },
        {
          value: "7,958",
          label: "Lines of TypeScript, 39 modules",
          detail:
            "Split into core, world, player and ui; systems register themselves with the loop rather than being called from one place.",
        },
        {
          value: "1",
          label: "Runtime dependency",
          detail: "three.js 0.160. No engine, no framework, no physics library, no asset pipeline.",
        },
        {
          value: "0.62",
          label: "The barrow's price, as a multiplier",
          detail:
            "Everything the legs can do while it is being pushed. The clearest single example of how the game charges for capacity.",
        },
      ],
    },
  ],
};
