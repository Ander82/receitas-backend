const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const geeks = [];

const api = require("./api");
const cors = require('cors');
const express = require("express");
var axios = require('axios');


let dadosApi;


const server = express();
server.use(cors());

server.use(express.json());
server.listen(8001)
console.log("rodando backend2");



function apiRestaurante() {
  return axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
}
dadosApi = apiRestaurante();
dadosApi.then(function (resposta) {

 
  const refeicao = resposta.data.meals
  
 
  
  //const lista = refeicao.map(prato => ({
  //  prato: prato.strMeal,
  //  id: prato.idMeal,
  //  categoria: prato.strCategory,
  //  thumb: prato.strThumb,
  //  Tags: prato.strTags,
  //  youtube: prato.strYoutube,    
  //  area: prato.strArea,
  //  instruções: prato.strInstructions,
  //  ingredientes: obtenhaIngredientesPrato(prato)
  //}))
  const lista = refeicao.map(prato => ({
    prato: prato.strMeal,
    id: prato.idMeal,
    categoria: prato.strCategory,
    imagem: prato.strMealThumb,
    Tags: prato.strTags,
    youtube: prato.strYoutube,
    area: prato.strArea,
    instrucoes: prato.strInstructions,
   ingredientes: obtenhaIngredientesPrato(prato),
   ingredient:
     prato.strIngredient1 +  + 
     prato.strIngredient2 + ","+
     prato.strIngredient3 + ","+
     prato.strIngredient4 + ","+
     prato.strIngredient5 + "," +
     prato.strIngredient6 + "," +
     prato.strIngredient7 + "," +
     prato.strIngredient8 + "," +
     prato.strIngredient9 + "," +
     prato.strIngredient10 + "," +
     prato.strIngredient11 + "," +
     prato.strIngredient12 + "," +
     prato.strIngredient13 + "," +
     prato.strIngredient14 + "," +
     prato.strIngredient15 + "," +
     prato.strIngredient16 + "," +
     prato.strIngredient17 + "," +
     prato.strIngredient18 + "," +
     prato.strIngredient19 + "," +
     prato.strIngredient20,
   medidas: 
   prato.strMeasure2 + "," +
     prato.strMeasure3 + "," +
     prato.strMeasure4 + "," +
     prato.strMeasure5 + "," +
     prato.strMeasure6 + "," +
     prato.strMeasure7 + "," +
     prato.strMeasure8 + "," +
     prato.strMeasure9 + "," +
     prato.strMeasure10 + "," +
     prato.strMeasure11 + "," +
     prato.strMeasure12 + "," +
     prato.strMeasure13 + "," +
     prato.strMeasure14 + "," +
     prato.strMeasure15 + "," +
     prato.strMeasure16 + "," +
     prato.strMeasure17 + "," +
     prato.strMeasure18 + "," +
     prato.strMeasure19 + "," +
     prato.strMeasure20 
      

  }))
  
  
  function obtenhaIngredientesPrato(prato) {
    let ingredientes = [];
    for (var indice = 1; indice <= 20; indice++) {
      if (possuiIngrediente(prato, indice))
        ingredientes = adicioneIngrediente(ingredientes, prato, indice);
    }
    return ingredientes;
  }

  function possuiIngrediente(prato, indice) {
    let nomeIngrediente = obtenhaNomeIngrediente(prato, indice);
    let possuiIngrediente = !(nomeIngrediente == null || nomeIngrediente.trim() == "");
    return possuiIngrediente;
  }

  function obtenhaNomeIngrediente(prato, indice) {
    return prato["strIngredient" + indice];
  }

  function adicioneIngrediente(ingredientes, prato, indice) {
    let ingrediente = {
      nome: obtenhaNomeIngrediente(prato, indice),
      medida: prato["strMeasure" + indice],
    }
    ingredientes.push(ingrediente);
    return ingredientes;
    
  }


  server.get("/", (req, res) => {

    return res.send({ lista});
  });
  
  server.get("/pesquisa", (req, res) => {
let text = req.query['text'];

if(text){
   res.send(text)
  
}else{
  res.send("nenhum text")
}

    
  });
  

  

})

db.defaults(
    {
      "lista": [
        {
          "prato": "Corba",
          "id": "52977",
          "categoria": "Side",
          "Tags": "Soup",
          "youtube": "https://www.youtube.com/watch?v=VVnZd8A84z4",
          "area": "Turkish",
          "instruções": "Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.",
          "ingredientes": [
            {
              "nome": "Lentils",
              "medida": "1 cup "
            },
            {
              "nome": "Onion",
              "medida": "1 large"
            },
            {
              "nome": "Carrots",
              "medida": "1 large"
            },
            {
              "nome": "Tomato Puree",
              "medida": "1 tbs"
            },
            {
              "nome": "Cumin",
              "medida": "2 tsp"
            },
            {
              "nome": "Paprika",
              "medida": "1 tsp "
            },
            {
              "nome": "Mint",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Thyme",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Black Pepper",
              "medida": "1/4 tsp"
            },
            {
              "nome": "Red Pepper Flakes",
              "medida": "1/4 tsp"
            },
            {
              "nome": "Vegetable Stock",
              "medida": "4 cups "
            },
            {
              "nome": "Water",
              "medida": "1 cup "
            },
            {
              "nome": "Sea Salt",
              "medida": "Pinch"
            }
          ]
        },
        {
          "prato": "Kumpir",
          "id": "52978",
          "categoria": "Side",
          "Tags": "SideDish",
          "youtube": "https://www.youtube.com/watch?v=IEDEtZ4UVtI",
          "area": "Turkish",
          "instruções": "If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n\r\nGrate (roughly – you can use as much as you like) 150g of cheese.\r\nFinely chop one onion and one sweet red pepper.\r\nPut these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional).",
          "ingredientes": [
            {
              "nome": "Potatoes",
              "medida": "2 large"
            },
            {
              "nome": "Butter",
              "medida": "2 tbs"
            },
            {
              "nome": "Cheese",
              "medida": "150g"
            },
            {
              "nome": "Onion",
              "medida": "1 large"
            },
            {
              "nome": "Red Pepper",
              "medida": "1 large"
            },
            {
              "nome": "Red Chile Flakes",
              "medida": "Pinch"
            }
          ]
        },
        {
          "prato": "Tamiya",
          "id": "53026",
          "categoria": "Vegetarian",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=mulqW-J3Yy4",
          "area": "Egyptian",
          "instruções": "oak the beans in water to cover overnight.Drain. If skinless beans are unavailable, rub to loosen the skins, then discard the skins. Pat the beans dry with a towel.\r\nGrind the beans in a food mill or meat grinder.If neither appliance is available, process them in a food processor but only until the beans form a paste. (If blended too smoothly, the batter tends to fall apart during cooking.) Add the scallions, garlic, cilantro, cumin, baking powder, cayenne, salt, pepper, and coriander, if using.  Refrigerate for at least 30 minutes.\r\nShape the bean mixture into 1-inch balls.Flatten slightly and coat with flour.\r\nHeat at least 1½-inches of oil over medium heat to 365 degrees.\r\nFry the patties in batches, turning once, until golden brown on all sides, about 5 minutes.Remove with a wire mesh skimmer or slotted spoon. Serve as part of a meze or in pita bread with tomato-cucumber salad and tahina sauce.",
          "ingredientes": [
            {
              "nome": "Broad Beans",
              "medida": "3 cups "
            },
            {
              "nome": "Spring Onions",
              "medida": "6"
            },
            {
              "nome": "Garlic Clove",
              "medida": "4"
            },
            {
              "nome": "Parsley",
              "medida": "1/4 cup"
            },
            {
              "nome": "Cumin",
              "medida": "2 tsp"
            },
            {
              "nome": "Baking Powder",
              "medida": "1 tsp "
            },
            {
              "nome": "Cayenne Pepper",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Flour",
              "medida": "Spinkling"
            },
            {
              "nome": "Vegetable Oil",
              "medida": "As required"
            }
          ]
        },
        {
          "prato": "Dal fry",
          "id": "52785",
          "categoria": "Vegetarian",
          "Tags": "Curry,Vegetarian,Cake",
          "youtube": "https://www.youtube.com/watch?v=J4D855Q9-jg",
          "area": "Indian",
          "instruções": "Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.",
          "ingredientes": [
            {
              "nome": "Toor dal",
              "medida": "1 cup"
            },
            {
              "nome": "Water",
              "medida": "2-1/2 cups"
            },
            {
              "nome": "Salt",
              "medida": "1 tsp"
            },
            {
              "nome": "Turmeric",
              "medida": "1/4 tsp"
            },
            {
              "nome": "Ghee",
              "medida": "3 tbs"
            },
            {
              "nome": "Chopped tomatoes",
              "medida": "1 cup"
            },
            {
              "nome": "Cumin seeds",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Mustard Seeds",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Bay Leaf",
              "medida": "2"
            },
            {
              "nome": "Green Chili",
              "medida": "1 tbs chopped"
            },
            {
              "nome": "Ginger",
              "medida": "2 tsp shredded"
            },
            {
              "nome": "Cilantro",
              "medida": "2 tbs "
            },
            {
              "nome": "Red Pepper",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Salt",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Sugar",
              "medida": "1 tsp"
            },
            {
              "nome": "Garam Masala",
              "medida": "1/4 tsp"
            }
          ]
        },
        {
          "prato": "Poutine",
          "id": "52804",
          "categoria": "Miscellaneous",
          "Tags": "UnHealthy,Speciality,HangoverFood",
          "youtube": "https://www.youtube.com/watch?v=UVAMAoA2_WU",
          "area": "Canadian",
          "instruções": "Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C).\r\nWarm gravy in saucepan or microwave.\r\nPlace the fries into the hot oil, and cook until light brown, about 5 minutes.\r\nRemove to a paper towel lined plate to drain.\r\nPlace the fries on a serving platter, and sprinkle the cheese over them.\r\nLadle gravy over the fries and cheese, and serve immediately.",
          "ingredientes": [
            {
              "nome": "Vegetable Oil",
              "medida": "Dash"
            },
            {
              "nome": "Beef Gravy",
              "medida": "1 Can"
            },
            {
              "nome": "Potatoes",
              "medida": "5 thin cut"
            },
            {
              "nome": "Cheese Curds",
              "medida": "2 cups"
            }
          ]
        },
        {
          "prato": "Lasagne",
          "id": "52844",
          "categoria": "Pasta",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=gfhfsBPt46s",
          "area": "Italian",
          "instruções": "Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\nAdd the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\nStir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\nHeat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\nPut the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like.",
          "ingredientes": [
            {
              "nome": "Olive Oil",
              "medida": "1 tblsp "
            },
            {
              "nome": "Bacon",
              "medida": "2"
            },
            {
              "nome": "Onion",
              "medida": "1 finely chopped "
            },
            {
              "nome": "Celery",
              "medida": "1 Stick"
            },
            {
              "nome": "Carrots",
              "medida": "1 medium"
            },
            {
              "nome": "Garlic",
              "medida": "2 cloves chopped"
            },
            {
              "nome": "Minced Beef",
              "medida": "500g"
            },
            {
              "nome": "Tomato Puree",
              "medida": "1 tbls"
            },
            {
              "nome": "Chopped Tomatoes",
              "medida": "800g"
            },
            {
              "nome": "Honey",
              "medida": "1 tblsp "
            },
            {
              "nome": "Lasagne Sheets",
              "medida": "500g"
            },
            {
              "nome": "Creme Fraiche",
              "medida": "400ml"
            },
            {
              "nome": "Mozzarella Balls",
              "medida": "125g"
            },
            {
              "nome": "Parmesan Cheese",
              "medida": "50g"
            },
            {
              "nome": "Basil Leaves",
              "medida": "Topping"
            }
          ]
        },
        {
          "prato": "Timbits",
          "id": "52929",
          "categoria": "Dessert",
          "Tags": "Snack,Treat",
          "youtube": "https://www.youtube.com/watch?v=fFLn1h80AGQ",
          "area": "Canadian",
          "instruções": "Sift together dry ingredients.\r\nMix together wet ingredients and incorporate into dry. Stir until smooth.\r\nDrop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides.\r\nRemove and drain.\r\nRoll in cinnamon sugar while still warm and serve.",
          "ingredientes": [
            {
              "nome": "Flour",
              "medida": "2 cups "
            },
            {
              "nome": "Sugar",
              "medida": "1/3 cup"
            },
            {
              "nome": "Baking Powder",
              "medida": "3 tsp"
            },
            {
              "nome": "Salt",
              "medida": "½ tsp"
            },
            {
              "nome": "Egg",
              "medida": "1 beaten"
            },
            {
              "nome": "Milk",
              "medida": "¾ cup"
            },
            {
              "nome": "Oil",
              "medida": "3 tbs"
            },
            {
              "nome": "Oil",
              "medida": "for frying"
            },
            {
              "nome": "Icing Sugar",
              "medida": "garnish"
            }
          ]
        },
        {
          "prato": "Wontons",
          "id": "52948",
          "categoria": "Pork",
          "Tags": "MainMeal",
          "youtube": "https://www.youtube.com/watch?v=9h9No18ZyCI",
          "area": "Chinese",
          "instruções": "Combine pork, garlic, ginger, soy sauce, sesame oil, and vegetables in a bowl.\r\nSeparate wonton skins.\r\nPlace a heaping teaspoon of filling in the center of the wonton.\r\nBrush water on 2 borders of the skin, covering 1/4 inch from the edge.\r\nFold skin over to form a triangle, sealing edges.\r\nPinch the two long outside points together.\r\nHeat oil to 450 degrees and fry 4 to 5 at a time until golden.\r\nDrain and serve with sauce.",
          "ingredientes": [
            {
              "nome": "Pork",
              "medida": "1lb"
            },
            {
              "nome": "Garlic Clove",
              "medida": "3 chopped"
            },
            {
              "nome": "Ginger",
              "medida": "1 tsp "
            },
            {
              "nome": "Soy Sauce",
              "medida": "1 tbs"
            },
            {
              "nome": "Sesame Seed Oil",
              "medida": "1 tsp "
            },
            {
              "nome": "Carrots",
              "medida": "3 finely chopped"
            },
            {
              "nome": "Celery",
              "medida": "3 finely chopped"
            },
            {
              "nome": "Spring Onions",
              "medida": "6 chopped"
            },
            {
              "nome": "Wonton Skin",
              "medida": "1 Packet"
            },
            {
              "nome": "Oil",
              "medida": "Fry"
            },
            {
              "nome": "Water",
              "medida": "Bottle"
            }
          ]
        },
        {
          "prato": "Kafteji",
          "id": "52971",
          "categoria": "Vegetarian",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=-TFf-Zu-xQU",
          "area": "Tunisian",
          "instruções": "Peel potatoes and cut into 5cm cubes.\r\nPour 1-2 cm of olive oil into a large pan and heat up very hot. Fry potatoes until golden brown for 20 minutes, turning from time to time. Place on kitchen paper to drain.\r\nCut the peppers in half and remove seeds. Rub a little olive oil on them and place the cut side down on a baking tray. Place them under the grill. Grill until the skin is dark and bubbly. While the peppers are still hot, put them into a plastic sandwich bag and seal it. Take them out after 15 minutes and remove skins.\r\nIn the meantime, heat more olive oil another pan. Peel the onions and cut into thin rings. Fry for 15 minutes until golden brown, turning them often. Add the Ras el hanout at the end.\r\nCut the pumpkin into 5cm cubes and fry in the same pan you used for the potatoes for 10-15 minutes until it is soft and slightly browned. Place on kitchen paper.\r\nPour the remaining olive oil out of the pan and put all the cooked vegetables into the pan and mix. Whisk eggs and pour them over the vegetables. Put the lid on the pan so that the eggs cook. Put the contents of the pan onto a large chopping board, add salt and pepper and chopped and mix everything with a big knife.",
          "ingredientes": [
            {
              "nome": "Potatoes",
              "medida": "5 Large"
            },
            {
              "nome": "Olive Oil",
              "medida": "2 tbs"
            },
            {
              "nome": "Green Pepper",
              "medida": "1"
            },
            {
              "nome": "Onions",
              "medida": "5"
            },
            {
              "nome": "Ras el hanout",
              "medida": "1 tbs"
            },
            {
              "nome": "Pumpkin",
              "medida": "500g"
            },
            {
              "nome": "Eggs",
              "medida": "24 Skinned"
            },
            {
              "nome": "Salt",
              "medida": "Pinch"
            },
            {
              "nome": "Pepper",
              "medida": "Pinch"
            }
          ]
        },
        {
          "prato": "Big Mac",
          "id": "53013",
          "categoria": "Beef",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=C5J39YnnPsg",
          "area": "American",
          "instruções": "For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog.",
          "ingredientes": [
            {
              "nome": "Minced Beef",
              "medida": "400g"
            },
            {
              "nome": "Olive Oil",
              "medida": "2 tbs"
            },
            {
              "nome": "Sesame Seed Burger Buns",
              "medida": "2"
            },
            {
              "nome": "Onion",
              "medida": "Chopped"
            },
            {
              "nome": "Iceberg Lettuce",
              "medida": "1/4 "
            },
            {
              "nome": "Cheese",
              "medida": "2 sliced"
            },
            {
              "nome": "Dill Pickles",
              "medida": "2 large"
            },
            {
              "nome": "Mayonnaise",
              "medida": "1 cup "
            },
            {
              "nome": "White Wine Vinegar",
              "medida": "2 tsp"
            },
            {
              "nome": "Pepper",
              "medida": "Pinch"
            },
            {
              "nome": "Mustard",
              "medida": "2 tsp"
            },
            {
              "nome": "Onion Salt",
              "medida": "1 1/2 tsp "
            },
            {
              "nome": "Garlic Powder",
              "medida": "1 1/2 tsp "
            },
            {
              "nome": "Paprika",
              "medida": "1/2 tsp"
            }
          ]
        },
        {
          "prato": "Koshari",
          "id": "53027",
          "categoria": "Vegetarian",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=y0d2ZMZBW4Y",
          "area": "Egyptian",
          "instruções": "Cook the lentils. Bring lentils and 4 cups of water to a boil in a medium pot or saucepan over high heat. Reduce the heat to low and cook until lentils are just tender (15-17 minutes). Drain from water and season with a little salt. (Note: when the lentils are ready, they should not be fully cooked. They should be only par-cooked and still have a bite to them as they need to finish cooking with the rice).\r\nNow, for the rice. Drain the rice from its soaking water. Combine the par-cooked lentils and the rice in the saucepan over medium-high heat with 1 tbsp cooking oil, salt, pepper, and coriander. Cook for 3 minutes, stirring regularly. Add warm water to cover the rice and lentil mixture by about 1 1/2 inches (you’ll probably use about 3 cups of water here). Bring to a boil; the water should reduce a bit. Now cover and cook until all the liquid has been absorbed and both the rice and lentils are well cooked through (about 20 minutes).  Keep covered and undisturbed for 5 minutes or so.\r\nNow make the pasta. While the rice and lentils are cooking, make the pasta according to package instructions by adding the elbow pasta to boiling water with a dash of salt and a little oil. Cook until the pasta is al dente. Drain.\r\nCover the chickpeas and warm in the microwave briefly before serving.\r\n\r\nMake the crispy onion topping. \r\n\r\nSprinkle the onion rings with salt, then toss them in the flour to coat. Shake off excess flour.\r\nIn a large skillet, heat the cooking oil over medium-high heat, cook the onion rings, stirring often, until they turn a nice caramelized brown. Onions must be crispy, but not burned (15-20 minutes).",
          "ingredientes": [
            {
              "nome": "Brown Lentils",
              "medida": "1 1/2 cups "
            },
            {
              "nome": "Rice",
              "medida": "1 1/2 cups "
            },
            {
              "nome": "Coriander",
              "medida": "1/2 tsp"
            },
            {
              "nome": "Macaroni",
              "medida": "2 cups "
            },
            {
              "nome": "Chickpeas",
              "medida": "Can"
            },
            {
              "nome": "Onion",
              "medida": "1 large"
            },
            {
              "nome": "Salt",
              "medida": "Sprinking"
            },
            {
              "nome": "Vegetable Oil",
              "medida": "1/2 cup "
            }
          ]
        },
        {
          "prato": "Kapsalon",
          "id": "52769",
          "categoria": "Lamb",
          "Tags": "Snack",
          "youtube": "https://www.youtube.com/watch?v=UIcuiU1kV8I",
          "area": "Dutch",
          "instruções": "Cut the meat into strips. Heat oil in a pan and fry the strips for 6 minutes until it's ready.\r\nBake the fries until golden brown in a deep fryrer. When ready transfer to a backing dish. Make sure the fries are spread over the whole dish.\r\nCover the fries with a new layer of meat and spread evenly.\r\nAdd a layer of cheese over the meat. You can also use grated cheese. When done put in the oven for a few minutes until the cheese is melted.\r\nChop the lettuce, tomato and cucumber in small pieces and mix together. for a basic salad. As extra you can add olives jalapenos and a red union.\r\nDived the salad over the dish and Serve with garlicsauce and hot sauce",
          "ingredientes": [
            {
              "nome": "Fries",
              "medida": "250 Grams"
            },
            {
              "nome": "Doner Meat",
              "medida": "500 Grams"
            },
            {
              "nome": "Garlic sauce",
              "medida": "Topping"
            },
            {
              "nome": "Hotsauce",
              "medida": "Topping"
            },
            {
              "nome": "Lettuce",
              "medida": "1 Bulb"
            },
            {
              "nome": "Tomato",
              "medida": "1"
            },
            {
              "nome": "Cucumber",
              "medida": "3rd"
            },
            {
              "nome": "Gouda cheese",
              "medida": "100 Grams"
            }
          ]
        },
        {
          "prato": "Fish pie",
          "id": "52802",
          "categoria": "Seafood",
          "Tags": "Fish,Pie,Breakfast,Baking",
          "youtube": "https://www.youtube.com/watch?v=2sX4fCgg-UI",
          "area": "British",
          "instruções": "01.Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for 30 seconds to drive off any excess water. Mash with 1 tbsp olive oil, then season.\r\n02.Meanwhile put the milk in a large sauté pan, add the fish and bring to the boil. Remove from the heat, cover and stand for 3 minutes. Remove the fish (reserving the milk) and pat dry with kitchen paper, then gently flake into an ovenproof dish, discarding the skin and any bones.\r\n03.Heat the remaining oil in a pan, stir in the flour and cook for 30 seconds. Gradually stir in 200-250ml of the reserved milk (discard the rest). Grate in nutmeg, season, then bubble until thick. Stir in the cream.\r\n04.Preheat the oven to 190°C/fan170°C/gas 5. Grate the artichokes and add to the dish with the leek, prawns and herbs. Stir the lemon zest and juice into the sauce, then pour over. Mix gently with a wooden spoon.\r\n05.Spoon the mash onto the fish mixture, then use a fork to make peaks, which will crisp and brown as it cooks. Sprinkle over the cheese, then bake for 35-40 minutes until golden and bubbling. Serve with wilted greens.",
          "ingredientes": [
            {
              "nome": "Floury Potatoes",
              "medida": "900g"
            },
            {
              "nome": "Olive Oil",
              "medida": "2 tbsp"
            },
            {
              "nome": "Semi-skimmed Milk",
              "medida": "600ml"
            },
            {
              "nome": "White Fish Fillets",
              "medida": "800g"
            },
            {
              "nome": "Plain flour",
              "medida": "1 tbsp"
            },
            {
              "nome": "Nutmeg",
              "medida": "Grating"
            },
            {
              "nome": "Double Cream",
              "medida": "3 tbsp"
            },
            {
              "nome": "Jerusalem Artichokes",
              "medida": "200g"
            },
            {
              "nome": "Leek",
              "medida": "1 finely sliced"
            },
            {
              "nome": "Prawns",
              "medida": "200g peeled raw"
            },
            {
              "nome": "Parsley",
              "medida": "Large handful"
            },
            {
              "nome": "Dill",
              "medida": "Handful"
            },
            {
              "nome": "Lemon",
              "medida": "Grated zest of 1"
            },
            {
              "nome": "Gruyère",
              "medida": "25g grated"
            },
            {
              "nome": "Lemon",
              "medida": "Juice of 1"
            }
          ]
        },
        {
          "prato": "Pancakes",
          "id": "52854",
          "categoria": "Dessert",
          "Tags": "Breakfast,Desert,Sweet,Fruity",
          "youtube": "https://www.youtube.com/watch?v=LWuuCndtJr0",
          "area": "American",
          "instruções": "Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away.\r\nSet a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.\r\nServe with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.",
          "ingredientes": [
            {
              "nome": "Flour",
              "medida": "100g "
            },
            {
              "nome": "Eggs",
              "medida": "2 large"
            },
            {
              "nome": "Milk",
              "medida": "300ml "
            },
            {
              "nome": "Sunflower Oil",
              "medida": "1 tbls"
            },
            {
              "nome": "Sugar",
              "medida": "to serve"
            },
            {
              "nome": "Raspberries",
              "medida": "to serve"
            },
            {
              "nome": "Blueberries",
              "medida": "to serve"
            }
          ]
        },
        {
          "prato": "Kedgeree",
          "id": "52887",
          "categoria": "Seafood",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=_Pw1I1-SItE",
          "area": "British",
          "instruções": "For the rice, heat the oil in a large, lidded pan, add the onion, then gently fry for 5 mins until softened but not coloured. Add the spices, season with salt, then continue to fry until the mix start to go brown and fragrant; about 3 mins.\r\nAdd the rice and stir in well. Add 600ml water, stir, then bring to the boil. Reduce to a simmer, then cover for 10 mins. Take off the heat and leave to stand, covered, for 10-15 mins more. The rice will be perfectly cooked if you do not lift the lid before the end of the cooking.\r\nMeanwhile, put the haddock and bay leaves in a frying pan, cover with the milk, then poach for 10 mins until the flesh flakes. Remove from the milk, peel away the skin, then flake the flesh into thumbsize pieces. Place the eggs in a pan, cover with water, bring to the boil, then reduce to a simmer. Leave for 4½-5 mins, plunge into cold water, then peel and cut the eggs into quarters. Gently mix the fish, eggs, parsley, coriander and rice together in the pan. Serve hot, sprinkled with a few extra herbs.",
          "ingredientes": [
            {
              "nome": "Smoked Haddock",
              "medida": "300g"
            },
            {
              "nome": "Bay Leaves",
              "medida": "2"
            },
            {
              "nome": "Milk",
              "medida": "300ml "
            },
            {
              "nome": "Eggs",
              "medida": "4"
            },
            {
              "nome": "Parsley",
              "medida": "Handful"
            },
            {
              "nome": "Coriander",
              "medida": "Handful"
            },
            {
              "nome": "Vegetable Oil",
              "medida": "2 tbs"
            },
            {
              "nome": "Onion",
              "medida": "1 chopped"
            },
            {
              "nome": "Coriander",
              "medida": "1 tsp "
            },
            {
              "nome": "Curry Powder",
              "medida": "2 tsp"
            },
            {
              "nome": "Rice",
              "medida": "300g"
            }
          ]
        },
        {
          "prato": "Flamiche",
          "id": "52906",
          "categoria": "Vegetarian",
          "Tags": "Tart",
          "youtube": "https://www.youtube.com/watch?v=vT0q5c880Rg",
          "area": "French",
          "instruções": "For the pastry, sift the flour and salt into the bowl of a food processor, add the butter and lard, then whizz together briefly until the mixture looks like fine breadcrumbs. Tip the mixture into a bowl, then stir in the cheese and enough of the water for the mixture to come together. Tip out onto a lightly floured surface and knead briefly until smooth. Roll out thinly and line a 23cm x 4cm loose-?bottomed fluted flan tin. Prick the base with a fork. Chill for 20 minutes.\r\n02.Melt the 75g butter in a saucepan over a low heat, then add the leeks and the salt. Cover and cook for ?10 minutes until soft. Uncover the pan, increase the heat and cook ?for 2 minutes, stirring occasionally, until the liquid has evaporated. Spoon onto a plate and leave to cool.\r\n03.Preheat the oven to 200°C/fan180°C/gas 6. Line the pastry case with baking paper and baking beans or rice and blind bake for 15-20 minutes until the edges are biscuit-coloured. Remove the paper and beans/rice and return the case to the oven for 7-10 minutes until the base is crisp and lightly golden. Remove and set aside. Reduce the oven temperature to 190°C/fan170°C/gas 5.\r\n04.Put the crème fraîche into a bowl with the whole egg, egg yolks and nutmeg. Lightly beat together, then season. Stir in the leeks. Spoon ?the mixture into the tart case and bake for 35-40 minutes until set ?and lightly golden. Remove from ?the oven and leave for 10 minutes. Take out of the tin and serve.",
          "ingredientes": [
            {
              "nome": "Butter",
              "medida": "75g"
            },
            {
              "nome": "Leek",
              "medida": "1kg"
            },
            {
              "nome": "Salt",
              "medida": "½ tsp"
            },
            {
              "nome": "Creme Fraiche",
              "medida": "300ml "
            },
            {
              "nome": "Egg",
              "medida": "1"
            },
            {
              "nome": "Egg Yolks",
              "medida": "3"
            },
            {
              "nome": "Nutmeg",
              "medida": "¼ teaspoon"
            },
            {
              "nome": "Plain Flour",
              "medida": "225g"
            },
            {
              "nome": "Salt",
              "medida": "½ tsp"
            },
            {
              "nome": "Butter",
              "medida": "60g"
            },
            {
              "nome": "Lard",
              "medida": "60g"
            },
            {
              "nome": "Cheddar Cheese",
              "medida": "50g"
            },
            {
              "nome": "Water",
              "medida": "2 tbs"
            }
          ]
        },
        {
          "prato": "Stamppot",
          "id": "52980",
          "categoria": "Pork",
          "Tags": "Savory,Breakfast",
          "youtube": "https://www.youtube.com/watch?v=hTrSXryX31A",
          "area": "Dutch",
          "instruções": "\r\nWash and peel the potatoes and cut into similarly sized pieces for even cooking.\r\n\r\nIn a large soup pot, boil the potatoes and the bay leaves in salted water for 20 minutes. Discard the bay leaves.\r\n\r\nIf you're not using a bag of ready-cut curly kale, wash the bunches thoroughly under cool running water to get rid of all soil—you wouldn't want that gritty texture in your finished dish. Trim any coarse stems and discard any brown leaves. With a sharp knife, cut the curly kale into thin strips.\r\n\r\nPeel and chop the shallots.\r\n\r\nIn a frying pan or skillet, melt 1 tbsp. of butter and saute the shallots for a few minutes before adding the curly kale and 2 tbsp. of water. Season and cook for about 10 minutes, or until tender.\r\n\r\nWarm the milk on the stove or in the microwave.\r\n\r\nDrain, shake and dry the potatoes with kitchen towels before mashing with a potato masher or ricer. Working quickly, add the warm milk and the remaining butter. Season to taste with nutmeg, salt, and pepper. \r\n\r\nMix the cooked curly kale through the cooked mashed potato mixture.\r\n\r\nTop with slices of the smoked sausage and serve hot with your favorite mustard or gravy.\r\n\r\nServe and enjoy!",
          "ingredientes": [
            {
              "nome": "Potatoes",
              "medida": "1.5kg"
            },
            {
              "nome": "Bay Leaf",
              "medida": "2 leaves"
            },
            {
              "nome": "Shallots",
              "medida": "2"
            },
            {
              "nome": "Butter",
              "medida": "3 tbs"
            },
            {
              "nome": "Kale",
              "medida": "750g"
            },
            {
              "nome": "Sausages",
              "medida": "2"
            },
            {
              "nome": "Milk",
              "medida": "500ml"
            },
            {
              "nome": "Nutmeg",
              "medida": "Grated"
            },
            {
              "nome": "Salt",
              "medida": "Pinch"
            },
            {
              "nome": "Pepper",
              "medida": "Pinch"
            }
          ]
        },
        {
          "prato": "Moussaka",
          "id": "53006",
          "categoria": "Beef",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=8U_29i9Qp5U",
          "area": "Greek",
          "instruções": "Heat the grill to high. Brown the beef in a deep ovenproof frying pan over a high heat for 5 mins. Meanwhile, prick the aubergine with a fork, then microwave on High for 3-5 mins until soft. Mix the yogurt, egg and parmesan together, then add a little seasoning.\r\n\r\nStir the tomatoes, purée and potatoes in with the beef with some seasoning and heat through. Smooth the surface of the beef mixture with the back of a spoon, then slice the cooked aubergine and arrange on top. Pour the yogurt mixture over the aubergines, smooth out evenly, then grill until the topping has set and turned golden.",
          "ingredientes": [
            {
              "nome": "Beef",
              "medida": "500g"
            },
            {
              "nome": "Aubergine",
              "medida": "1 large"
            },
            {
              "nome": "Greek Yogurt",
              "medida": "150g"
            },
            {
              "nome": "Egg",
              "medida": "1 beaten"
            },
            {
              "nome": "Parmesan",
              "medida": "3 tbs"
            },
            {
              "nome": "Tomato",
              "medida": "400g"
            },
            {
              "nome": "Tomato Puree",
              "medida": "4 tbs"
            },
            {
              "nome": "Potatoes",
              "medida": "350g"
            }
          ]
        },
        {
          "prato": "Shawarma",
          "id": "53028",
          "categoria": "Chicken",
          "Tags": null,
          "youtube": "https://www.youtube.com/watch?v=3lxUIeKDgic",
          "area": "Egyptian",
          "instruções": "Combine the marinade ingredients in a large ziplock bag (or bowl).\r\nAdd the chicken and use your hands to make sure each piece is coated. If using a ziplock bag, I find it convenient to close the bag then massage the bag to disperse the rub all over each chicken piece.\r\nMarinate overnight or up to 24 hours.\r\nCombine the Yoghurt Sauce ingredients in a bowl and mix. Cover and put in the fridge until required (it will last for 3 days in the fridge).\r\nHeat grill/BBQ (or large heavy based pan on stove) on medium high. You should not need to oil it because the marinade has oil in it and also thigh fillets have fat. But if you are worried then oil your hotplate/grill. (See notes for baking)\r\nPlace chicken on the grill and cook the first side for 4 to 5 minutes until nicely charred, then turn and cook the other side for 3 to 4 minutes (the 2nd side takes less time).\r\nRemove chicken from the grill and cover loosely with foil. Set aside to rest for 5 minutes.\r\nTO SERVE\r\nSlice chicken and pile onto platter alongside flatbreads, Salad and the Yoghurt Sauce.\r\nTo make a wrap, get a piece of flatbread and smear with Yoghurt Sauce. Top with a bit of lettuce and tomato and Chicken Shawarma. Roll up and enjoy!",
          "ingredientes": [
            {
              "nome": "Chicken Thighs",
              "medida": "1 kg"
            },
            {
              "nome": "Coriander",
              "medida": "1 tbs"
            },
            {
              "nome": "Cumin",
              "medida": "1 tbs"
            },
            {
              "nome": "Cardamom",
              "medida": "1 tbs"
            },
            {
              "nome": "Cayenne Pepper",
              "medida": "1 tsp "
            },
            {
              "nome": "Paprika",
              "medida": "2 tsp"
            },
            {
              "nome": "Lemon Juice",
              "medida": "2 tbs"
            },
            {
              "nome": "Olive Oil",
              "medida": "3 tbs"
            },
            {
              "nome": "Greek Yogurt",
              "medida": "1 cup "
            },
            {
              "nome": "Garlic Clove",
              "medida": "1"
            },
            {
              "nome": "Cumin",
              "medida": "1 tsp "
            },
            {
              "nome": "Lemon Juice",
              "medida": "Splash"
            },
            {
              "nome": "Lettuce",
              "medida": "Sliced"
            },
            {
              "nome": "Tomato",
              "medida": "Sliced"
            },
            {
              "nome": "Pita Bread",
              "medida": "6"
            }
          ]
        },
        {
          "prato": "Eton Mess",
          "id": "52791",
          "categoria": "Dessert",
          "Tags": "Dairy,Fruity,Desert,Treat,Speciality",
          "youtube": "https://www.youtube.com/watch?v=43WgiNq54L8",
          "area": "British",
          "instruções": "Purée half the strawberries in a blender. Chop the remaining strawberries, reserving four for decoration.\r\nWhip the double cream until stiff peaks form, then fold in the strawberry purée and crushed meringue. Fold in the chopped strawberries and ginger cordial, if using.\r\nSpoon equal amounts of the mixture into four cold wine glasses. Serve garnished with the remaining strawberries and a sprig of mint.",
          "ingredientes": [
            {
              "nome": "strawberries",
              "medida": "500g"
            },
            {
              "nome": "double cream",
              "medida": "400ml"
            },
            {
              "nome": "meringue nests",
              "medida": "3 x 7.5cm"
            },
            {
              "nome": "ginger cordial",
              "medida": "1 tbsp"
            },
            {
              "nome": "Mint",
              "medida": "sprigs of fresh"
            }
          ]
        },
        {
          "prato": "Ribollita",
          "id": "52811",
          "categoria": "Vegetarian",
          "Tags": "Vegetarian",
          "youtube": "https://www.youtube.com/watch?v=BiQUYTBb6eQ",
          "area": "Italian",
          "instruções": "Put 2 tablespoons of the oil in a large pot over medium heat. When it’s hot, add onion, carrot, celery and garlic; sprinkle with salt and pepper and cook, stirring occasionally, until vegetables are soft, 5 to 10 minutes.\r\nHeat the oven to 500 degrees. Drain the beans; if they’re canned, rinse them as well. Add them to the pot along with tomatoes and their juices and stock, rosemary and thyme. Bring to a boil, then reduce heat so the soup bubbles steadily; cover and cook, stirring once or twice to break up the tomatoes, until the flavors meld, 15 to 20 minutes.\r\nFish out and discard rosemary and thyme stems, if you like, and stir in kale. Taste and adjust seasoning. Lay bread slices on top of the stew so they cover the top and overlap as little as possible. Scatter red onion slices over the top, drizzle with the remaining 3 tablespoons oil and sprinkle with Parmesan.\r\nPut the pot in the oven and bake until the bread, onions and cheese are browned and crisp, 10 to 15 minutes. (If your pot fits under the broiler, you can also brown the top there.) Divide the soup and bread among 4 bowls and serve.",
          "ingredientes": [
            {
              "nome": "Olive Oil",
              "medida": "5 tablespoons"
            },
            {
              "nome": "Onion",
              "medida": "1 chopped"
            },
            {
              "nome": "Carrot",
              "medida": "1 chopped"
            },
            {
              "nome": "Celery",
              "medida": "1 stalk chopped"
            },
            {
              "nome": "Garlic",
              "medida": "1 tablespoon minced"
            },
            {
              "nome": "Cannellini Beans",
              "medida": "2 cups"
            },
            {
              "nome": "Canned tomatoes",
              "medida": "1"
            },
            {
              "nome": "Water",
              "medida": "4 cups"
            },
            {
              "nome": "Rosemary",
              "medida": "1 fresh sprig"
            },
            {
              "nome": "Thyme",
              "medida": "1 fresh sprig"
            },
            {
              "nome": "Kale",
              "medida": "1 pound chopped"
            },
            {
              "nome": "Wholegrain Bread",
              "medida": "4 thick slices"
            },
            {
              "nome": "Red Onion",
              "medida": "1 thinly sliced"
            },
            {
              "nome": "Parmesan",
              "medida": "½ cup freshly grated"
            }
          ]
        },
        {
          "prato": "Yaki Udon",
          "id": "52871",
          "categoria": "Vegetarian",
          "Tags": "LowCalorie",
          "youtube": "https://www.youtube.com/watch?v=5Iy0MCowSvA",
          "area": "Japanese",
          "instruções": "Boil some water in a large saucepan. Add 250ml cold water and the udon noodles. (As they are so thick, adding cold water helps them to cook a little bit slower so the middle cooks through). If using frozen or fresh noodles, cook for 2 mins or until al dente; dried will take longer, about 5-6 mins. Drain and leave in the colander.\r\nHeat 1 tbsp of the oil, add the onion and cabbage and sauté for 5 mins until softened. Add the mushrooms and some spring onions, and sauté for 1 more min. Pour in the remaining sesame oil and the noodles. If using cold noodles, let them heat through before adding the ingredients for the sauce – otherwise tip in straight away and keep stir-frying until sticky and piping hot. Sprinkle with the remaining spring onions.",
          "ingredientes": [
            {
              "nome": "Udon Noodles",
              "medida": "250g"
            },
            {
              "nome": "Sesame Seed Oil",
              "medida": "2 tbs"
            },
            {
              "nome": "Onion",
              "medida": "1 sliced"
            },
            {
              "nome": "Cabbage",
              "medida": "0.25"
            },
            {
              "nome": "Shiitake Mushrooms",
              "medida": "10"
            },
            {
              "nome": "Spring Onions",
              "medida": "4"
            },
            {
              "nome": "Mirin",
              "medida": "4 tbsp"
            },
            {
              "nome": "Soy Sauce",
              "medida": "2 tbs"
            },
            {
              "nome": "Caster Sugar",
              "medida": "1 tblsp "
            },
            {
              "nome": "Worcestershire Sauce",
              "medida": "1 tblsp "
            }
          ]
        },
        {
          "prato": "Tourtiere",
          "id": "52926",
          "categoria": "Pork",
          "Tags": "Pie,MainMeal,BBQ,Cake",
          "youtube": "https://www.youtube.com/watch?v=A96hbwobKKs",
          "area": "Canadian",
          "instruções": "Heat oven to 200C/180C fan/gas 6. Boil the potato until tender, drain and mash, then leave to cool. Heat the oil in a non-stick pan, add the mince and onion and quickly fry until browned. Add the garlic, spices, stock, plenty of pepper and a little salt and mix well. Remove from the heat, stir into the potato and leave to cool.\r\nRoll out half the pastry and line the base of a 20-23cm pie plate or flan tin. Fill with the pork mixture and brush the edges of the pastry with water. Roll out the remaining dough and cover the pie. Press the edges of the pastry to seal, trimming off the excess. Prick the top of the pastry case to allow steam to escape and glaze the top with the beaten egg.\r\nBake for 30 mins until the pastry is crisp and golden. Serve cut into wedges with a crisp green salad. Leftovers are good cold for lunch the next day, served with a selection of pickles.",
          "ingredientes": [
            {
              "nome": "Potatoes",
              "medida": "1 medium"
            },
            {
              "nome": "Sunflower Oil",
              "medida": "1 tsp "
            },
            {
              "nome": "Minced Pork",
              "medida": "500g"
            },
            {
              "nome": "Onion",
              "medida": "1 finely chopped "
            },
            {
              "nome": "Garlic Clove",
              "medida": "1 finely chopped "
            },
            {
              "nome": "Cinnamon",
              "medida": "¼ tsp"
            },
            {
              "nome": "Allspice",
              "medida": "¼ tsp"
            },
            {
              "nome": "Nutmeg",
              "medida": "¼ tsp"
            },
            {
              "nome": "Vegetable Stock",
              "medida": "100ml"
            },
            {
              "nome": "Shortcrust Pastry",
              "medida": "400g"
            },
            {
              "nome": "Egg",
              "medida": "To Glaze"
            }
          ]
        },
        {
          "prato": "Sugar Pie",
          "id": "52931",
          "categoria": "Dessert",
          "Tags": "Pie,Desert",
          "youtube": "https://www.youtube.com/watch?v=uVQ66jiL-Dc",
          "area": "Canadian",
          "instruções": "Preheat oven to 350 degrees F (175 degrees C). Grease a 9-inch pie dish.\r\nPlace the brown sugar and butter in a mixing bowl, and beat them together with an electric mixer until creamy and very well combined, without lumps. Beat in eggs, one at a time, incorporating the first egg before adding the next one. Add the vanilla extract and salt; beat the flour in, a little at a time, and then the milk, making a creamy batter. Pour the batter into the prepared pie dish.\r\nBake in the preheated oven for 35 minutes; remove pie, and cover the rim with aluminum foil to prevent burning. Return to oven, and bake until the middle sets and the top forms a crusty layer, about 15 more minutes. Let the pie cool to room temperature, then refrigerate for at least 1 hour before serving.",
          "ingredientes": [
            {
              "nome": "Brown Sugar",
              "medida": "2 cups "
            },
            {
              "nome": "Butter",
              "medida": "¼ cup"
            },
            {
              "nome": "Eggs",
              "medida": "2"
            },
            {
              "nome": "Vanilla Extract",
              "medida": "1 tsp "
            },
            {
              "nome": "Salt",
              "medida": "1 tsp "
            },
            {
              "nome": "Plain Flour",
              "medida": "½ cup "
            },
            {
              "nome": "Milk",
              "medida": "1 1/2 cups "
            }
          ]
        },
        {
          "prato": "Shakshuka",
          "id": "52963",
          "categoria": "Vegetarian",
          "Tags": "Egg,Brunch,Breakfast",
          "youtube": "https://www.youtube.com/watch?v=C-3_jYrfdBU",
          "area": "Egyptian",
          "instruções": "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft. Stir in the tomatoes and sugar, then bubble for 8-10 mins until thick. Can be frozen for 1 month.\r\n\r\nUsing the back of a large spoon, make 4 dips in the sauce, then crack an egg into each one. Put a lid on the pan, then cook over a low heat for 6-8 mins, until the eggs are done to your liking. Scatter with the coriander leaves and serve with crusty bread.",
          "ingredientes": [
            {
              "nome": "Olive Oil",
              "medida": "1 tbs"
            },
            {
              "nome": "Red Onions",
              "medida": "2 chopped"
            },
            {
              "nome": "Red Chilli",
              "medida": "1 finely chopped "
            },
            {
              "nome": "Garlic",
              "medida": "1 clove"
            },
            {
              "nome": "Coriander",
              "medida": "Chopped"
            },
            {
              "nome": "Cherry Tomatoes",
              "medida": "800g"
            },
            {
              "nome": "Caster Sugar",
              "medida": "1 tbs"
            },
            {
              "nome": "Eggs",
              "medida": "4"
            },
            {
              "nome": "Feta",
              "medida": "Spinkling"
            }
          ]
        }
      ]
    })
  .write()

//let limpaArrayRefeicao = refeicao
  //const nomeRefeicoes = refeicao.map(prato => prato.strMeal)
  //const filtrarPorVegetariana = refeicao.filter((value) => { if (value.strCategory === 'Vegetarian') return value })
  //const listaCategoria = refeicao.map(categoria => categoria.strCategory)
//const listaInstrucoes = refeicao.map(instrucoes => instrucoes.strInstructions)
 // const listaThumb = refeicao.map(thumb => thumb.strMealThumb)
//  console.log(filtrarPorVegetariana)

//server.get("/meals", async (req, res) =>{
//    try{
//        const {data} = await api.get("meals");
//        return res.send({meals: data.meals})
//    }catch(error){
//        res.send({error: error.menssage});
//    }
//});

//axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=').then(function(resposta){
//  console.log(resposta.data);
//}).catch(function(error){
//if(error){
//    console.log(error);
//  }
//})
  //const limpaArrayRefeicao = refeicao.filter(i =>i);
  // limpaArrayRefeicao = [... new Set(limpaArrayRefeicao)]
  //const limpaArrayRefeicao = refeicao.filter((value) => {if (value.refeicao !=="") return value})
//let listRefeicoes = refeicao.filter(refeicoes => refeicoes.strMeal === "Corba")
  //refeicao.forEach(strMeal =>console.log(strMeal) );
  //console.log(Object.values(refeicao));