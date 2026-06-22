export const MOCK_RECIPES = [
  {
    id: 1,
    name: "Herb-Crusted Chicken Piccata",
    description:
      "Tender pan-seared chicken in a bright lemon-caper butter sauce, finished with fresh parsley and a generous zap of citrus zest.",
    cookTime: "25 min",
    cuisine: "Italian",
    dietTags: ["Gluten-Free"],
    portions: 2,
    nutrition: { calories: 420, protein: 38, carbs: 6, fat: 27 },
    ingredients: [
      "300g chicken breast, butterflied thin",
      "2 tbsp capers, drained",
      "1 lemon, juiced and zested",
      "3 tbsp cold unsalted butter, cubed",
      "2 cloves garlic, minced",
      "Small handful flat-leaf parsley, roughly chopped",
      "1 tbsp olive oil",
      "Salt and black pepper",
    ],
    instructions: [
      "Season chicken generously with salt and pepper on both sides.",
      "Heat olive oil in a heavy skillet over medium-high heat until shimmering.",
      "Sear chicken 4–5 minutes per side until deep golden and cooked through (74°C internal). Transfer to a plate to rest.",
      "In the same pan over medium heat, sauté garlic for 30 seconds until fragrant. Add capers and lemon juice.",
      "Remove from heat and swirl in cold butter piece by piece until emulsified into a glossy sauce.",
      "Return chicken to the pan and spoon sauce over each piece. Scatter lemon zest and parsley.",
      "Serve immediately — this dish waits for no one.",
    ],
  },
  {
    id: 2,
    name: "Mediterranean Spiced Chicken Bowl",
    description:
      "Cumin-and-turmeric-kissed chicken over fire-roasted vegetables, drizzled with a sharp, nutty tahini-lemon sauce.",
    cookTime: "30 min",
    cuisine: "Mediterranean",
    dietTags: ["Gluten-Free", "Dairy-Free"],
    portions: 2,
    nutrition: { calories: 480, protein: 40, carbs: 18, fat: 28 },
    ingredients: [
      "300g chicken breast, cut into 3cm cubes",
      "1 tsp ground cumin",
      "1 tsp smoked paprika",
      "½ tsp ground turmeric",
      "2 tbsp olive oil, divided",
      "1 zucchini, cut into half-moons",
      "1 red bell pepper, roughly sliced",
      "2 tbsp tahini",
      "Juice of ½ lemon",
      "Fresh coriander or parsley to serve",
    ],
    instructions: [
      "Toss chicken cubes with cumin, paprika, turmeric, salt, and 1 tbsp olive oil. Marinate 10 minutes.",
      "Preheat oven to 220°C. Toss zucchini and bell pepper with remaining olive oil and a pinch of salt.",
      "Spread vegetables on a baking sheet and roast 15 minutes until edges are charred.",
      "Meanwhile, sear chicken in a hot dry skillet 6–8 minutes, turning once, until caramelised and cooked through.",
      "Whisk tahini with lemon juice and 2–3 tbsp water to make a pourable sauce. Season with salt.",
      "Divide roasted vegetables between bowls, lay chicken on top, drizzle generously with tahini sauce.",
      "Scatter fresh herbs and finish with an extra squeeze of lemon.",
    ],
  },
  {
    id: 3,
    name: "Tuscan Skillet Chicken",
    description:
      "One pan, minimal fuss — sun-dried tomato cream sauce with wilted baby spinach, finished with shaved parmesan right at the table.",
    cookTime: "35 min",
    cuisine: "Italian",
    dietTags: ["Gluten-Free"],
    portions: 2,
    nutrition: { calories: 510, protein: 36, carbs: 10, fat: 36 },
    ingredients: [
      "300g chicken breast, sliced 1cm thick",
      "100ml double cream",
      "50g sun-dried tomatoes in oil, roughly chopped",
      "2 large handfuls baby spinach",
      "3 cloves garlic, thinly sliced",
      "½ tsp chilli flakes",
      "1 tbsp olive oil",
      "Parmesan shavings to finish",
      "Salt and black pepper",
    ],
    instructions: [
      "Season chicken slices well on both sides. Heat olive oil in a wide skillet over high heat.",
      "Sear chicken in a single layer without moving for 2–3 minutes per side until golden. Work in batches to avoid steaming. Set aside.",
      "Reduce heat to medium. Add garlic and chilli flakes, fry 1 minute until fragrant.",
      "Add sun-dried tomatoes and stir 30 seconds to warm through.",
      "Pour in cream, season with salt and pepper, and let bubble 2 minutes until slightly thickened.",
      "Add spinach and stir until just wilted — about 90 seconds.",
      "Return chicken to the sauce, heat through 1 minute, then take off heat. Shave parmesan over the pan and bring it straight to the table.",
    ],
  },
];

// TODO: replace with real n8n webhook URL
const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/code-a-cuisine";

export async function generateRecipes(payload) {
  // Uncomment when n8n is ready:
  // const res = await fetch(WEBHOOK_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();

  // Mock response for development:
  await new Promise((r) => setTimeout(r, 3000));
  return { recipes: MOCK_RECIPES };
}
